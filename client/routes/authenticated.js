Accounts.onLogin(function() {
    var redirect = Session.get('redirectAfterLogin');
    if (redirect && redirect !== 'login') {
        FlowRouter.go(redirect);
    } /*else {
        FlowRouter.go('tasks');
    }*/
});

const authenticatedRedirect = function() {

    if (!Meteor.loggingIn() && !Meteor.userId()) {
        var route = FlowRouter.current();

        if (route.route.name !== 'login') {
            Session.set('redirectAfterLogin', route.path);
        }

        FlowRouter.go('login');
    }
};

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [authenticatedRedirect]
});

authenticatedRoutes.route('/settings', {
    name: 'settings',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Settings'});
    }
});

authenticatedRoutes.route('/tasks', {
    name: 'tasks',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Tasks'});
    }
});

authenticatedRoutes.route('/create-task', {
    name: 'createTask',
    action: function() {
        BlazeLayout.render('Default', {yield: 'CreateTask'});
    }
});

authenticatedRoutes.route('/tasks/:id', {
    name: 'task',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Task'});
    }
});

authenticatedRoutes.route('/create-test-case/:taskId', {
    name: 'createTestCase',
    action: function() {
        BlazeLayout.render('Default', {yield: 'CreateTestCase'});
    }
});

authenticatedRoutes.route('/projects', {
    name: 'projects',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Projects'});
    }
});

authenticatedRoutes.route('/project/:id', {
    name: 'project',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Project'});
    }
});

authenticatedRoutes.route('/project/:id/changes', {
    name: 'projectChanges',
    action: function() {
        BlazeLayout.render('Default', {yield: 'ProjectChanges'});
    }
});

authenticatedRoutes.route( '/users', {
    name: 'users',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Users' } );
    }
});

authenticatedRoutes.route( '/invites', {
    name: 'invites',
    action: function() {
        BlazeLayout.render( 'Default', { yield: 'Invites' } );
    }
});
