import create from './create';
// module:
//		dojo/errors/RequestError

/*=====
 return function(){
	 // summary:
	 //		TODOC
 };
 =====*/

export default create("RequestError", function(message, response) {
    this.response = response;
});
