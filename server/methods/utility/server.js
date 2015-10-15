if (Meteor.isServer) {

    Meteor.methods({
        compile: function (documentId) {
            var request = Meteor.npmRequire('request');

            var idTaskExecution;

            var taskExecution = {
                type: 'compile',
                sourceCode: documentId
            };

            TaskExecutions.insert(taskExecution, function (error, taskExecutionId) {
                idTaskExecution = taskExecutionId;
                var r = request.post('http://localhost:8888/api/compile', Meteor.bindEnvironment(function (err, httpResponse, body) {
                    if (err || httpResponse.statusCode !== 200) {
                        console.error('error:', err || httpResponse.body);
                    }
                }));
                var form = r.form();
                form.append('taskExecution', taskExecutionId);
            });

            return idTaskExecution;
        }

    });
}