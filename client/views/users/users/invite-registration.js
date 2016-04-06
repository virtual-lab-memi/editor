Template.InviteRegistration.onCreated(function() {
  Template.instance().subscribe('invite', FlowRouter.current().params.token)
});


Template.InviteRegistration.helpers({
  invitation: function() {
    var invite = Invitations.findOne();

    if ( invite ) {
      return invite;
    }
  }
});

Template.InviteRegistration.events({
  'submit form': function( event, template ) {
    var route = FlowRouter.current(),
      token = route.params.token;

    event.preventDefault();

    var email = template.find( '[name="emailAddress"]' ).value;
    var password = template.find( '[name="password"]' ).value;
    var username = template.find( '[name="username"]' ).value;
    var firstname = template.find( '[name="firstname"]' ).value;
    var lastname = template.find( '[name="lastname"]' ).value;

    var user = {
      email: email,
      password: Accounts._hashPassword( password ),
      token: token,
      username: username,
      firstname: firstname,
      lastname: lastname
    };

    Meteor.call( 'acceptInvite', user, function( error, response ) {
      if ( error ) {
        console.log(error);
        Bert.alert( error.reason, 'warning' );
      } else {
        Meteor.loginWithPassword( user.email, password );
        FlowRouter.go('/');
      }
    });
  }
});