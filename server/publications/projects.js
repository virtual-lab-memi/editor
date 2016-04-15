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

Meteor.publish('aProjectFiles', function(id) {
    //TODO: filter tasks by user whe authentication is implemented.
    return Files.find({parent: id});
});

Meteor.publish('projectsByOwner', function(owner) {
    return Projects.find({owner: owner});
});

Meteor.publish('aProjectByUser', function(owner, project) {
    return [
        Meteor.users.find({_id: owner}),
        Projects.find({_id: project, owner: owner})
    ];
});

Meteor.publish('executionsByProject', function(project) {
    return TaskExecutions.find({project: project}, {sort: {date: -1}});
});
