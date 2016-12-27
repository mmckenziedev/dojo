import create from './create';
import RequestError from './RequestError';
// module:
//		dojo/errors/RequestTimeoutError

/*=====
 return function(){
	 // summary:
	 //		TODOC
 };
 =====*/

export = create("RequestTimeoutError", null, RequestError, {
    dojoType: "timeout"
});
