Meteor.publish('fileDiffTracks', function(id) {
  //TODO: filter tasks by user whe authentication is implemented.
  console.log(id);
  console.log(DiffTracker.find({parent: id}).count());
  return DiffTracker.find({parent: id});
});
