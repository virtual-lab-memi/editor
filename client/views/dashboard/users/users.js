Template.UserDashboard.onCreated(function() {
  var instance = this;
  var userToReviewId = FlowRouter.getParam('id');
  instance.subscribe('aUser', userToReviewId);
  instance.subscribe('projectsByOwner', userToReviewId);
});

Template.UserDashboard.helpers({
  projectsByUserIndex: function() {
    return ProjectsByUserIndex;
  },
  inputAttribs: function() {
    return {
      class: "form-control",
      placeholder: "Buscar tareas..."
    }
  },
  userToReview: function() {
    var userToReviewId = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: userToReviewId})
  }
});