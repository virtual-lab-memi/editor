Template.ProjectChanges.onCreated(function() {
  var self = this;
  var fileId = FlowRouter.getParam('fileId');
  self.subscribe('fileDiffTracks', fileId);
  self.subscribe('aFile', fileId);
});

Template.ProjectChanges.onRendered(function() {
  /*var limit = 2;
  $('input.diff-check').on('click', function(evt) {
    console.log('asdadsasdasd');
    if($('input.diff-check:checked').length >= limit) {
      this.checked = false;
    }
  });*/
});

Template.ProjectChanges.helpers({
  file: function() {
    var fileId = FlowRouter.getParam('fileId');
    return Files.findOne({_id: fileId});
  },
  diffTracks: function() {
    var fileId = FlowRouter.getParam('fileId');

    return DiffTracker.find({parent: fileId});
  }
});

Template.ProjectChanges.events({
  'click #diff-gen': function(event, template) {
    var inputs = $('input.diff-check:checked');
    var firstDiff = inputs[0].value;
    var secondDiff = inputs[1].value;

    FlowRouter.go('diffGen', {diff1: firstDiff, diff2: secondDiff});
  }
});