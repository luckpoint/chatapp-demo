Meteor.methods({
  newMessage: function (message) {
  	message.timestamp = Date.now();
    Messages.insert(message);
  }
})

Meteor.publish('messages', function () {
	return Messages.find({}, {sort:{timestamp: -1}, limit:4});
});
