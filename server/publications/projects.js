Meteor.publish('projects', function() {
    //TODO: filter tasks by user whe authentication is implemented.
    return Projects.find({}, {fields: {title: 1}});
});

Meteor.publish('aProject', function(id) {
    //TODO: filter tasks by user whe authentication is implemented.
    return [
        Projects.find({_id: id}),
        Files.find({parent: id}),
        TaskExecutions.find({project: id})
    ]
});
