export default {

	set: function( name, value ){
		switch( true ){
			case (typeof value === 'object'):
				localStorage.setItem( name, JSON.stringify( value ) );
			break;

			default: 
				localStorage.setItem( name, value );
			break;
		}
	},

	get: function( name ){
		try{
		   return JSON.parse( localStorage.getItem( name ) );
		}catch(e){
		   return localStorage.getItem( name );
		}
	},

	remove: function( name ){
		localStorage.removeItem( name );
	}
}


