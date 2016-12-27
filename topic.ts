import Evented = require("./Evented");

// module:
//		dojo/topic

var hub = new Evented;
export = {
	// summary:
	//		Pubsub hub.
	// example:
	//		| 	topic.subscribe("some/topic", function(event){
	//		|	... do something with event
	//		|	});
	//		|	topic.publish("some/topic", {name:"some event", ...});

	publish: function (topic: string, ...event: any[]) {
		// summary:
		//		Publishes a message to a topic on the pub/sub hub. All arguments after
		//		the first will be passed to the subscribers, so any number of arguments
		//		can be provided (not just event).
		// topic: String
		//		The name of the topic to publish to
		// event: Object
		//		An event to distribute to the topic listeners
		return hub.emit.apply(hub, arguments);
	},

	subscribe: function (topic: string, listener: Function) {
		// summary:
		//		Subscribes to a topic on the pub/sub hub
		// topic: String
		//		The topic to subscribe to
		// listener: Function
		//		A function to call when a message is published to the given topic
		return hub.on.apply(hub, arguments);
	}
};
