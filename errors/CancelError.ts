import create = require("./create");
// module:
//		dojo/errors/CancelError

/*=====
return function(){
	// summary:
	//		Default error if a promise is canceled without a reason.
};
=====*/

export = create("CancelError", null, null, {
    dojoType: "cancel",
    log: false
});
