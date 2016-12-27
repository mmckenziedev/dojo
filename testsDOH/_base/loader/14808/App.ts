define("test/App", ["dijit","dojo","dojox","dojo/require!test/Module"], function(dijit,dojo,dojox)
{
	console.log('APP loaded');

	dojo.provide('test.App');

	dojo.require('test.Module');

	dojo.dojoDeclare('test.App', [ ], { foo : null });
});
