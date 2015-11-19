Template.Project.onCreated(function() {
    var projectID = FlowRouter.getParam('_id');
    Template.instance().subscribe('aProject', projectID);
});

Template.Project.helpers({
    project: function() {
        return Projects.find();
    },
    projectFiles: function() {
        return Files.find();
    }
});