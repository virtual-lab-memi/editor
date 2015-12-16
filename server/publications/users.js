Meteor.publish("directory", function () {
  return Meteor.users.find({}, {
    fields: {
      emails: 1,
      profile: 1
    }
  });
});

Meteor.publish( 'Users.users', function() {
  var isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1} } );
  } else {
    return [];
  }
});

Meteor.publish( 'Users.invites', function() {
  var isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return Invitations.find( {}, { fields: { "username": 1,"email": 1, "role": 1, "date": 1, "profile": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish('invite', function(token) {
  check(token, String);
  return Invitations.find({ "token": token });
});

