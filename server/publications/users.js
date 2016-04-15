Meteor.publish("directory", function () {
  return Meteor.users.find({}, {
    fields: {
      emails: 1,
      profile: 1
    }
  });
});

Meteor.publish("aUser", function (userToReview) {
  return Meteor.users.find({_id: userToReview});
});

Meteor.publish( 'Users.users', function() {
  var isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1, "profile.date": 1, "profile.disabled" : 1, "username": 1 } } );
  } else {
    return [];
  }
});

Meteor.publish( 'invites', function() {
  var isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return Invitations.find( {}, { fields: { "firstname": 1, "lastname": 1, "email": 1, "role": 1, "date": 1, "profile": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish('invite', function(token) {
  check(token, String);
  return Invitations.find({ "token": token });
});