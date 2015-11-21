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
    },
    openedProjectFiles: function() {
        var project = Projects.findOne();
        return Files.find({ _id : {$in: project.openedFiles}});
    },
    isCurrentFile: function(fileId) {
        var project = Projects.findOne();
        return project.currentFile === fileId;
    }
});

Template.Project.events({
    'click .close-tab': function(event, template) {
        var project = Projects.findOne();
        var fileId = event.target.dataset.fileId;
        Projects.update(project._id, {$pull: {openedFiles: fileId}});

        if(project.files.length){
            Projects.update(project._id, {$set: {currentFile: project.files[0]}});
        }
    },

    'click .open-tab': function(event, template) {
        console.log('asdasd');
        var project = Projects.findOne();
        var fileId = event.target.dataset.fileId;

        if ($.inArray(fileId, project.openedFiles) < 0) {
            Projects.update(project._id, {$push: {openedFiles: fileId}});
        }

        Projects.update(project._id, {$set: {currentFile: fileId}});
    }
});

Template.CreateFile.events({

    'click #create': function(event, template) {
        event.preventDefault();
        var fileName = event.target.form.fileName.value;
        var projectId = template.data.projectID;
        Meteor.call('createFile', projectId, fileName, function(error) {
            $('#create-file').modal('hide');

            if (error) {
                console.error(error);
                Bert.alert('El archivo no se pudo crear correctamente. Intente otra vez.', 'danger');
                return;
            }

            Bert.alert('El archivo se creo correctamente!', 'success');
        });
    }
});