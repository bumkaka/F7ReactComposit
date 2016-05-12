'use strict';

class Ajax{
	constructor( props ){
		this.settings = $.extend({}, this.defaults, props || {});
	}

	call( props ){
		let option = $.extend({}, this.settings, props || {});
		option.headers.token = App.getToken();
		option.url = option.url || '';
		if ( option.url.indexOf('://') == -1 ) option.url = option.baseURL + option.url.replace(/^\//,'')
		return $.ajax( option );
	}
}




Ajax.prototype.defaults = {
	type: 'post',
	baseURL: '/api/',
	//contentType: false,
	//processData: false,
	crossDomain: true,
	dataType: 'json',
	timeout: 5000,
	headers: {},
	beforeSend: function() {
		App.F7.showIndicator();
	},
	complete: function(xhr, status) {
		App.F7.hideIndicator();
	},
	statusCode: {
		404: function (xhr) {
			App.notify.error('Ops. Something went wrong :( ');
		},
		504: function (xhr) {
			App.notify.error('Please check your internet connection.');
		},
		500: function (xhr) {
			App.notify.error('Please try again later.');
		},
		error: function(xhr, status) {
			App.F7.hideIndicator();
			App.notify.show('<span class="color-red"><i class="fa fa-exclamation-circle" ></i> Error</span>');
		}
	},
}


export default Ajax;

