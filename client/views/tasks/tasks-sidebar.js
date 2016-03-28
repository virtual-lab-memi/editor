Template.TasksSidebar.onCreated(function() {
    Template.instance().subscribe('myTasks');
});

Template.TasksSidebar.helpers({
    tasks: function() {
        return Tasks.find({owner: Meteor.userId()});
    }
});