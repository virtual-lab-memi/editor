Template.Task.helpers({
    task: function() {
        var taskId = FlowRouter.getParam('id');
        Template.instance().subscribe('aTask', taskId);
        return Tasks.findOne(taskId);
    },

    project: function() {
        var taskId = FlowRouter.getParam('id');
        return Projects.findOne({parent: taskId});
    },

    isValidTask: function() {
        var taskId = FlowRouter.getParam('id');
        var task = Tasks.findOne(taskId);

        if (task.testCases && task.testCases.length) {
            return true;
        }

        return false;
    }
});
Template.Task.events({
    'click #startProject': function(event, template) {
        document.getElementById('startProject').disabled = true;
        var taskId = FlowRouter.getParam('id');

        Meteor.call('createProject', taskId, function(error, newProjectId) {
            if (error) {
                //TODO: Add bert alert
                console.log(error);
                return;
            }
            //TODO: Add bert alert
            console.log('success!');
            FlowRouter.go('project', {id: newProjectId});
        });
    }
});
