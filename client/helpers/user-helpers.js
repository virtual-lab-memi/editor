UI.registerHelper("isStudent", function(){
  var loggedInUser = Meteor.user();
  return Roles.userIsInRole(loggedInUser, 'student');
});

UI.registerHelper("isAdmin", function(){
  var loggedInUser = Meteor.user();
  return Roles.userIsInRole(loggedInUser, 'admin');
});

UI.registerHelper("isTeacher", function(){
  var loggedInUser = Meteor.user();
  return Roles.userIsInRole(loggedInUser, 'teacher');
});

UI.registerHelper('userFullname', function(userId) {
  var user = null;

  if (userId) {
    user = Meteor.users.findOne({_id: userId});
  } else {
    user = Meteor.user();
  }

  return user ? user.profile.name.first + ' ' + user.profile.name.last : 'NA';
});


Template.registerHelper( 'isCurrentUser', function( currentUser ) {
  return currentUser === Meteor.userId() ? true : false;
});

Template.registerHelper( 'disableIfAdmin', function( userId ) {
  if ( Meteor.userId() === userId ) {
    return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
  }
});

Template.registerHelper( 'selected', function( v1, v2 ) {
  return v1 === v2 ? true : false;
});