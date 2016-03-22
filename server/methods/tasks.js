Meteor.methods({
    addTestCase: function(taskId, testCase) {
        Tasks.update(taskId, {$push: {testCases: testCase}});
    }
});
