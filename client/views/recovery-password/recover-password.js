Template.RecoverPassword.onRendered( function() {
  TMModules.client.recoverPassword({
    form: "#recover-password",
    template: Template.instance()
  }) ;
});

Template.RecoverPassword.events({
  'submit form': function( event ) {event.preventDefault();}
});
