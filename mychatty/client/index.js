Template.inputBox.events({
  'keypress input': function(e) {
    return newMessage(e);
  },
  'click button': function(e) {
    return newMessage(e, true);
  }
});

function newMessage(e, isButtonClick) {
    var inputVal = $('#input-box-text').val();
    if(!!inputVal) {
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        if (charCode == 13 || isButtonClick) {
            e.stopPropagation();
            Meteor.call('newMessage', {user: $('#caller-id').val(), text: $('#input-box-text').val()});
            $('#input-box-text').val("");
            return false;
        }    
    }
}

Template.textChat.helpers({
  messages: Messages.find({}, {sort:{timestamp: 1}})
});

Template.registerHelper("timestampToTime", function (timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.registerHelper("username", function (user) {
	if (user == null || user == "" || typeof user === "undefined") {
		return "Anonymous";
	}
	return user;
});

Meteor.subscribe('messages');
