Template.ResetPassword.onRendered( function() {
  TMModules.client.resetPassword({
    form: "#reset-password",
    template: Template.instance()
  });
});

Template.ResetPassword.events({
  'submit form': function( event ) {event.preventDefault(); }
});
