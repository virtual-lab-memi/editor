const publicRedirect = function()  {
    if ( Meteor.userId() ) {
        FlowRouter.go( 'IndexView' );
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Login' } );
    }
});

publicRoutes.route( '/invite/:token', {
    name: 'inviteRegistration',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'InviteRegistration' } );
    }
});