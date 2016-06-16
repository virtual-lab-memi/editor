Meteor.methods({
    addTestCase: function(taskId, testCase) {
        Tasks.update(taskId, {$push: {testCases: testCase}});
    },

    updateTestCase: function(taskId, testId, updatedData) {
        console.log(updatedData, testId, taskId);
        Tasks.update({_id: taskId, 'testCases.id': testId}, {$set: {'testCases.$': updatedData}});
    }
});
