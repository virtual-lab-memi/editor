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