Meteor.methods({
    addTestCase: function(taskId, testCase, input, output) {
        var task = Tasks.findOne(taskId);
        Uploads.insert(input, function(error, inputID) {
            Uploads.insert(output, function(error, outputID) {
                testCase.input = inputID;
                testCase.output = outputID;

                Task.update(taskId, {$push: {testCases: testCase}});
            });
        });
    }
});
