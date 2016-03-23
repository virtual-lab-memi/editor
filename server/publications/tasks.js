Meteor.publish('aTask', function(id) {
    //TODO: filter tasks by user whe authentication is implemented.
    console.log(this.userId);
    return [
        Tasks.find({_id: id}),
        Projects.find({parent: id, owner: this.userId})
    ];
});
