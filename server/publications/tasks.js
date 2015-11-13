Meteor.publish('myTasks', function() {
    //TODO: filter tasks by user whe authentication is implemented.
    return Tasks.find();
});

Meteor.publish('aTask', function(id) {
    //TODO: filter tasks by user whe authentication is implemented.
    return Tasks.findOne({_id: id});
});