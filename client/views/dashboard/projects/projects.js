Template.ProjectDashboard.onCreated(function() {
  var instance = this;
  var userToReviewId = FlowRouter.getParam('id');
  var projectId = FlowRouter.getParam('projectId');
  instance.subscribe('aProjectByUser', userToReviewId, projectId);
  instance.subscribe('executionsByProject', projectId);
  instance.subscribe('filesByProject', projectId);
});

Template.ProjectDashboard.helpers({
  project: function() {
    var project = FlowRouter.getParam('projectId');
    return Projects.findOne({_id: project})
  },
  userToReview: function() {
    var user = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: user})
  },
  files: function() {
    var project = FlowRouter.getParam('projectId');
    return Files.find({parent: project})
  },
  executions: function() {
    var project = FlowRouter.getParam('projectId');
    return TaskExecutions.find({project: project})
  },
  successStatus: function() {
    if (!this.status || this.status === 'SUCCESS') {
      return true;
    }

    return false;
  }
});