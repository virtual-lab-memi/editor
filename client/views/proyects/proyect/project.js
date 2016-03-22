Template.Project.onCreated(function() {
    var instance = this;
    var projectID = FlowRouter.getParam('id');
    instance.subscribe('aProject', projectID);
    var settingsSub = instance.subscribe('settings');

    instance.autorun(function() {
        console.log('asdasdasdasdasdasd==============');

        if (settingsSub.ready()) {
            console.log('asdasdasdasdasdasd=============*********=');
            var settings = Settings.findOne();
            instance.keystrokesCount = 0;
            instance.defaultKeystrokesCount = settings.keystrokes;

            Meteor.setInterval(function () {
                console.log('timeout saving!');
                saveFiles();
            }, settings.saveTimeout * 60000);
        }
    });
});

Template.Project.helpers({
    project: function() {
        return Projects.findOne();
    },
    taskExecution: function() {
        var project = Projects.findOne();
        return TaskExecutions.findOne({_id: project.lastRun});
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
    },
    editorOptions: function () {
        return {
            lineNumbers: true,
            fixedGutter: true,
            mode: "text/x-c++src",
            lineWrapping: true,
            cursorHeight: 1.5
        }
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
        var project = Projects.findOne();
        var fileId = event.target.dataset.fileId;

        if ($.inArray(fileId, project.openedFiles) < 0) {
            Projects.update(project._id, {$push: {openedFiles: fileId}});
        }

        Projects.update(project._id, {$set: {currentFile: fileId}});
    },

    'keydown .tab-pane': function(event, template) {
        template.keystrokesCount = template.keystrokesCount + 1;
        if (template.keystrokesCount === template.defaultKeystrokesCount) {
            template.keystrokesCount = 0;
            saveFiles();
        }
    },

    'click #compile': function (event, template) {
        event.preventDefault();
        saveFiles(template);
        var project = Projects.findOne();
        Meteor.call('compile', project._id, project.parent, function() {
            console.log(arguments);
        });
    },

    'click #run': function (event, template) {
        event.preventDefault();
        saveFiles(template);
        var project = Projects.findOne();
        Meteor.call('run', project._id, project.parent, function() {
            console.log(arguments);
        });
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

function saveFiles() {
    console.log('saving!');
    var project = Projects.findOne();
    var files = project.files;

    files.forEach(function(fileId) {
        var originalFile = Files.findOne({_id: fileId});
        var content = $('#' + fileId).val();
        var levenstainDiff = getEditDistance(originalFile.source, content);

        if (levenstainDiff) {
            DiffTracker.insert({date: new Date(), source: originalFile.source || '', levenstain: levenstainDiff, parent: fileId});
            Files.update(fileId, {$set: {source: content}});
        }
    });
}

function getEditDistance(a, b) {
    if(!a || a.length == 0) return b.length;
    if(!b || b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                  Math.min(matrix[i][j-1] + 1, // insertion
                    matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}