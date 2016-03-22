Meteor.publish('settings', function() {
  return Settings.find();
});

Meteor.publish('recentCriteria', function() {
  return Criteria.find({}, {sort: {createdDate: -1}, limit: 10, fields: {title: 1, tag: 1}});
});