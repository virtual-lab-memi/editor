Meteor.methods({

    createFile: function(projectId, fileName) {
        var fileId = Files.insert({
            name: fileName,
            source: '',
            parent: projectId
        });

        if (!fileId) {
            throw new Meteor.Error("Create file", 'Error creating the file.');
        } else {
            //TODO: Validate changes and rollback if there is a problems
            Projects.update({_id: projectId}, {$set: {currentFile: fileId}});
            Projects.update({_id: projectId}, {$push: {openedFiles: fileId}});
            Projects.update({_id: projectId}, {$push: {files: fileId}});
        }
    }

});
