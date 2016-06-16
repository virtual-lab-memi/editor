Accounts.onLogin(function() {
    var redirect = Session.get('redirectAfterLogin');
    if (redirect && redirect !== 'login') {
        FlowRouter.go(redirect);
    } else {
        /*FlowRouter.go('tasks');

        if(Roles.userIsInRole( Meteor.userId(), 'teacher' )){
            FlowRouter.go('tasks');
        }else{
            FlowRouter.go("/");
        }
*/
    }
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

authenticatedRoutes.route('/create-criteria', {
    name: 'createCriteria',
    action: function() {
        BlazeLayout.render('Default', {yield: 'CreateCriteria'});
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

authenticatedRoutes.route('/edit-test-case/:taskId/:index', {
    name: 'editTestCase',
    action: function() {
        BlazeLayout.render('Default', {yield: 'EditTestCase'});
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

authenticatedRoutes.route('/dashboard', {
    name: 'dashboard',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Dashboard'});
    }
});

authenticatedRoutes.route('/dashboard/:id', {
    name: 'userDashboard',
    action: function() {
        BlazeLayout.render('Default', {yield: 'UserDashboard'});
    }
});

authenticatedRoutes.route('/dashboard/:id/project/:projectId', {
    name: 'projectDashboard',
    action: function() {
        BlazeLayout.render('Default', {yield: 'ProjectDashboard'});
    }
});

authenticatedRoutes.route('/dashboard/:id/project/:projectId/changes/:fileId', {
    name: 'projectChanges',
    action: function() {
        BlazeLayout.render('Default', {yield: 'ProjectChanges'});
    }
});

authenticatedRoutes.route('/diff/:diff1/and/:diff2', {
    name: 'diffGen',
    action: function() {
        BlazeLayout.render('Default', {yield: 'DiffGen'});
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
