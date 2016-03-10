Template.ProjectChanges.onCreated(function() {
  var self = this;
  self.fileId = new ReactiveVar('');
  self.autorun(function(){
    self.subscribe('fileDiffTracks', self.fileId.get());
  });

  var projectID = FlowRouter.getParam('id');
  Template.instance().subscribe('aProjectFiles', projectID);
});

Template.ProjectChanges.helpers({
  files: function() {
    return Files.find();
  },
  diffTracks: function() {
    console.log('asdasdasd', Template.instance().fileId.get());

    return DiffTracker.find({parent: Template.instance().fileId.get()});
  }
});

Template.ProjectChanges.events({
  'change #filePicker': function(e, instance){
    var fileId =  $('#filePicker').val();
    instance.fileId.set(fileId);
  }
});