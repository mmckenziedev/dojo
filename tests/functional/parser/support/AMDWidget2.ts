define(["dojo/_base/declare"], function(declare){

	return dojoDeclare(null, {
		constructor: function(args, node){
			this.params = args;
		},

		method1: function(value){
			value++;
			return value;
		}
	});

});
