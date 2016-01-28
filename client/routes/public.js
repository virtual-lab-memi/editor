const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route( '/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Login' } );
    }
});

publicRoutes.route( '/signup', {
    name: 'signup',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Signup' } );
    }
});

publicRoutes.route( '/invite/:token', {
    name: 'inviteRegistration',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'InviteRegistration' } );
    }
});