Template.Task.onCreated(function() {
    Template.instance().subscribe('aTask', FlowRouter.current().params.id);
});

Template.Task.helpers({
    task: function() {
        return Tasks.findOne();
    },

    hasProyect: function() {
        return false;
    }
});

