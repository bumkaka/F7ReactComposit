class Notify{

	constructor( props ){
		this.settings = $.extend({}, this.defaults, props || {});
	}

	show(msg, callback = ()=>{} ) {
		if(typeof msg === 'string') {
			if(!callback) {
				callback = function() {};
			}
			var el = App.F7.addNotification({
				title: msg,
				onClose: callback
			});
			this.closeOnDelay(el);
			return;
		}


		var el = App.F7.addNotification(msg);
		this.closeOnDelay(el);
		return;
	}



	success(msg, callback) {
		msg = '<span class="color-green"><i class="fa fa-circle" ></i> '+msg+'</span>';
		this.show(msg, callback);
	} 



	error(msg, callback) {
		msg = '<span class="color-red"><i class="fa fa-exclamation-circle" ></i> '+msg+'</span>';
		this.show(msg, callback);
	}



	closeOnDelay(el) {
		var _this = this;
		var $el = $(el);
		setTimeout(function() {
			$el.css('opacity', 0);
			setTimeout(function() {
				App.F7.closeNotification( $el );
			}, 450);
		}, _this.settings.timeout );
	}




}

Notify.prototype.defaults = {
	timeout: 5000
}

export default Notify;