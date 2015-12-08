const authenticatedRedirect = function() {
    //TODO: Uncomment when auth ready
    /*if (!Meteor.loggingIn() && !Meteor.userId()) {
      FlowRouter.go('login');
    }*/
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

authenticatedRoutes.route('/project/:id/:currentFile?', {
    name: 'project',
    action: function() {
        BlazeLayout.render('Default', {yield: 'Project'});
    }
});