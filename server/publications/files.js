Meteor.publish('fileDiffTracks', function(id) {
  //TODO: filter tasks by user whe authentication is implemented.

  return DiffTracker.find({parent: id});
});
Meteor.publish('filesByProject', function(id) {
  //TODO: filter tasks by user whe authentication is implemented.

  return Files.find({parent: id});
});
