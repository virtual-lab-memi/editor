Template.Task.helpers({
    task: function() {
        var taskId = FlowRouter.getParam('id');
        Template.instance().subscribe('aTask', taskId);
        return Tasks.findOne(taskId);
    },

    project: function() {
        var taskId = FlowRouter.getParam('id');
        return Projects.findOne({parent: taskId});
    }
});
Template.Task.events({
    'click #startProject': function(event, template) {
        var taskId = FlowRouter.getParam('id');
        var task = Tasks.findOne(taskId);
        Projects.insert({
            title: task.title,
            files: [],
            parent: taskId
        }, function(error, id) {
            if (error) {
                //TODO: Add bert alert
                console.log(error);
                return;
            }
            //TODO: Add bert alert
            console.log('success!');
            FlowRouter.go('project', {id: id});
        });
    }
});

