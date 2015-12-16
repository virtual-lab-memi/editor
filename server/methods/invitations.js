Meteor.methods({
  sendInvite:function( invitation ) {
    check( invitation, {
      email: String,
      firstname: String,
      lastname: String,
      role: String
    });

    try {
      TMModules.server.sendInvitation({
        email: invitation.email,
        token: Random.hexString( 16 ),
        firstname: invitation.firstname,
        lastname: invitation.lastname,
        role: invitation.role,
        date: ( new Date() ).toISOString()
      });
    } catch( exception ) {
      console.log('ex:', exception);
      return {error: exception};
    }
  },
  acceptInvite: function(user) {
    check(user, {
      email: String,
      firstname: String,
      lastname: String,
      username: String,
      password: Object,
      token: String
    });

    try {
      var userId = TMModules.server.acceptInvitation(user);
      return userId;
    } catch (exception) {
      throw new Meteor.Error('Problem registering new user', exception);
    }
  }
});
