import aspect = require("./aspect");
import on = require("./on");
// module:
//		dojo/Evented


var after = aspect.after;

function Evented() {
    // summary:
    //		A class that can be used as a mixin or base class,
    //		to add on() and emit() methods to a class
    //		for listening for events and emitting events:
    // example:
    //		|	define(["dojo/Evented", "dojo/_base/declare", "dojo/Stateful"
    //		|	], function(Evented, declare, Stateful){
    //		|		var EventedStateful = dojoDeclare([Evented, Stateful], {...});
    //		|		var instance = new EventedStateful();
    //		|		instance.on("open", function(event){
    //		|		... do something with event
    //		|	 });
    //		|
    //		|	instance.emit("open", {name:"some event", ...});
}
Evented.prototype = {
    on: function(type, listener) {
        return on.parse(this, type, listener, function(target, type) {
            return after(target, 'on' + type, listener, true);
        });
    },
    emit: function(type, event) {
        var args = [this];
        args.push.apply(args, arguments);
        return on.emit.apply(on, args);
    }
};
export = Evented;
