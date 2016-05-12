class Panel{

	constructor ( props ){
		this.option = $.extend({}, this.defaults, props || {});
	}
  

	open( props ) {
		let side = props.side || 'right';
		$( '.panel-' + side ).html( props.content );
		App.F7.openPanel( side );
	}
	
	closes() {
		App.F7.closePanel();
	}
}

Panel.prototype.defaults = {

}

export default Panel;




