Meteor.publish('fileDiffTracks', function(id) {
  //TODO: filter tasks by user whe authentication is implemented.

  return DiffTracker.find({parent: id}, {sort: {date: -1}});
});

Meteor.publish('twoDiffs', function(id1, id2) {
  //TODO: filter tasks by user whe authentication is implemented.
  return DiffTracker.find({_id: {$in: [id1, id2]}});
});

Meteor.publish('filesByProject', function(id) {
  //TODO: filter tasks by user whe authentication is implemented.

  return Files.find({parent: id});
});

Meteor.publish('aFile', function(id) {
  //TODO: filter tasks by user whe authentication is implemented.

  return Files.find({_id: id});
});
