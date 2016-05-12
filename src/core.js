import Notify from './Notify.js'; 
import Panel  from './Panel.js'; 
import Ajax   from './Ajax.js';

import Attr   from './helpers/jquery-attributes.js';
import LocalStore   from './helpers/LocalStore.js';
import Event   from './helpers/event.js';


var moment = {};
global.$$ = Dom7;

class F7ReactCompositeApp {

    constructor( methods ){
        for( var method in methods){
            this[ method ] = methods[ method ];
        }

        this.pages = {};
    }

    initialize( ){
        window.LocalStore = LocalStore;
        //Atache event methods to App
        Event( this );
        this.notify     = new Notify( this.configs.notify || {});
        this.panel      = new Panel( this.configs.panel || {});
        this.ajax       = new Ajax( this.configs.ajax || {});
        this.stores     = this.configs.stores;
        this.actions    = this.configs.actions;
        //this.pages      = this.configs.pages;
        this.components = this.configs.components;


        window.Stores = this.configs.stores;
        window.Actions = this.configs.actions;

        this.F7 = new Framework7({
            modalTitle: 'Moving Chat',
            template7Pages: true,
            precompileTemplates: true,
            router: true,
            externalLinks: 'a.js-external-link',
            cache: false,
            materialRipple: Framework7.prototype.device.android,
            fastClicks: true,
            pushState: false,
            material: !(Framework7.prototype.device.ios)
        });


        this.container = this.F7.addView('.view-main', {
            dynamicNavbar: true,
            domCache: true
        });

        window.App = this;
        this.initEvents();
    }   



    getConfig( name ){
        return this.configs[ name ];
    }

    set( props ){
        this.setConfig( props );
    }

    setPage( page ){

        this.pages[ page.name ] = page;
    }

    setConfig( props ){
        this.configs = $.extend( {}, this.defaults, props );
    }

    setMiddleware( middlewares ){
        this.middlewares = $.extend( {}, this.middlewares, middlewares );
    }



    pageShow( props ) {
        let eventResult = true;

        //Do not do double call page
        if (this.container.activePage) {
            if (this.container.activePage.name == props.name) return;
        }

        //Defined page callback launch

        if ( this.pages[ props.name ] && this.pages[ props.name ].beforePageInit ){
            eventResult = this.pages[ props.name ].beforePageInit( props );
            if ( eventResult === false ) return;
        }

        //Middleware launch
        let middlewareResult = this.middlewares.beforePageInit( props );
        if ( middlewareResult === false ) return;


        //If no false in events and middleware load pages
        
        
        this.container.router.load({
            template:   Template7.templates[ props.name ],
            context:    props.context || {},
            animatePages: props.animate || true,
            reload:     props.reload || false
        });
    }



    renderReact( container ){

        for(var index in App.components ){
            if ( !App.components.hasOwnProperty(index)) continue;

            $( index, container ).each(function(){

                ReactDOM.render(
                    React.createElement( App.components[ index ], $(this).getAttr(), $(this).html() ),
                    $(this)[0]
                );
            });
        }
    }


    unmountReact( container ){
        for(var index in App.components ){
            if ( !App.components.hasOwnProperty(index)) continue;
            $( index, container ).each(function(){
                React.unmountComponentAtNode( $(this)[0] );
            });
        }
    }


    initEvents(){
        var _this = this ;
        $('.panel-left,.panel-right').on('open', function ( props ) {
           _this.renderReact( $(this)[0] );
        });

        $('.panel-left,.panel-right').on('closed', function ( props ) {
           _this.unmountReact( $(this)[0] );
        });


        this.F7.onPageInit('*', ( page ) => {
            this.renderReact( $(page.container) );
        });

        this.F7.onPageInit('pageBeforeRemove', ( page ) => {
            this.unmountReact( $(page.container) );
        });


    

        $( document ).on('click','.app-link',function( e ){
            e.preventDefault();
            App.pageShow({
                name: $(this).data('page'),
                context: $(this).data('context') ? JSON.parse( $(this).data('context') ) : {} ,
                animated: $(this).data('animated') || true,
                reload: $(this).data('reload') || false
            });
            return false;
        });


        $(document).on('click', '.app-back', function(e){
            e.preventDefault();
            App.container.router.back( {
                pageName: 'index',
                force: true
            });
            return false;
        });

    }
}


F7ReactCompositeApp.prototype.defaults = {
    pages: {},
    stores: {},
    components: {},
    ajax: {
        baseURL: 'http://localhost:8000/',
        timeout: 4000,
    },
    notify:{
        timeout: 3000
    },
}


F7ReactCompositeApp.prototype.middlewares = {
    beforePageInit: function(){},
    afterPageInit: function(){},
    afterPageUnmount: function(){},
    beforePageUnmount: function(){}
}


export default F7ReactCompositeApp;