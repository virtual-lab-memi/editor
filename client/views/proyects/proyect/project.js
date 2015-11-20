Template.Project.onCreated(function() {
    var projectID = FlowRouter.getParam('id');
    Template.instance().subscribe('aProject', projectID);
});

Template.Project.helpers({
    project: function() {
        return Projects.findOne();
    },
    projectFiles: function() {
        return Files.find();
    }
});