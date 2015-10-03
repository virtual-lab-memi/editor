Router.route('/', {
    name: 'index',
    controller: 'ApplicationController',
    template: 'Index'
});

ApplicationController = RouteController.extend({
    layoutTemplate: 'DefaultLayout',
    loadingTemplate: 'Loading'
});