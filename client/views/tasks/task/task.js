Template.Task.helpers({
    task: function() {
        var taskID = FlowRouter.getParam('_id');
        Template.instance().subscribe('aTask', taskID);
        return Tasks.findOne();
    },

    hasProyect: function() {
        return false;
    }
});

