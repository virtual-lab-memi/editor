Template.ProjectsSidebar.onCreated(function() {
    Template.instance().subscribe('myProjects');
});

Template.ProjectsSidebar.helpers({
    projects: function() {
        return Projects.find();
    }
});