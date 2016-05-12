Event = function( object ){
	object.listeners = [];

    object.on = function( name , callback ){
	    this.listeners.push( {name: name, callback: callback} );
	}

	object.trigger = function( name , scope ){
	    var result = false;
	    this.listeners.forEach(function(event) {
	        if ( event.name == name ) {
	            result = event.callback.call(scope, scope);
	        }
	    });
	    return result;
	}
}


export default Event;