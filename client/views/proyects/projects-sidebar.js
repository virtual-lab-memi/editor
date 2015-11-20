Template.ProjectsSidebar.onCreated(function() {
    Template.instance().subscribe('projects');
});

Template.ProjectsSidebar.helpers({
    projects: function() {
        return Projects.find();
    }
});