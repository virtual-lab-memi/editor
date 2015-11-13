FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('Default', {yield: 'NotFound'});
    }
};