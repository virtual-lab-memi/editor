const publicRoutes = FlowRouter.group({
    name: 'public'
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

publicRoutes.route( '/', {
    name: 'index',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Welcome' } );
    }
});

