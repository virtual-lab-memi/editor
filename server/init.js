Meteor.startup(function () {
  var settings = Settings.findOne();

  if (!settings) {
    Settings.insert({
      keystrokes: 20,
      saveTimeout: 5
    });
  }

  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      return formData.type + '-' + formData.id;
    },
    getFileName: function(fileInfo, formData) {
      var name = '';
      switch (formData.type) {
        case 'TASK':
          if (formData.isInput) {
            name = 'test-case-input-' + formData.uploadId;
          } else {
            name = 'test-case-output-' + formData.uploadId;
          }
          break;
        default: name = fileInfo.name;
      }

      return name;
    },
    finished: function(fileInfo, formData) {
      Uploads.update(formData.uploadId, {$set: fileInfo}, function(error, updated) {
        if (error) {
          console.log(error);
          return;
        }
        console.log('Upload file successfully!!');
      });
    }
  });
  TMModules.server.startup()
});