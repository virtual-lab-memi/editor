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

publicRoutes.route( '/', {
    name: 'index',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Welcome' } );
    }
});

publicRoutes.route( '/recover-password', {
    name: 'recover-password',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'RecoverPassword' } );
    }
});

publicRoutes.route( '/reset-password/:token', {
    name: 'reset-password',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'ResetPassword' } );
    }
});
