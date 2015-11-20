Meteor.methods({
    createProject: function(taskId) {
        var task = Tasks.findOne(taskId);

        var projectId = Projects.insert({
            title: task.title,
            files: [],
            parent: taskId
        });

        if (!projectId) {
            throw new Meteor.Error("Create project", 'Error creating the project');
        }

        var fileId = Files.insert({
            name: 'main.cpp',
            source: task.initialFileContent,
            parent: projectId
        });

        if (!fileId) {
            Projects.remove(projectId);
            throw new Meteor.Error("Create project", 'Error creating the main file.');
        } else {
            Projects.update(projectId, {$set: {files: [fileId]}});
        }

        return projectId;
    }
});
