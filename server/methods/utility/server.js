if (Meteor.isServer) {

    Meteor.methods({
        compile: function (documentId) {
            var request = Meteor.npmRequire('request');

            var r = request.post('http://localhost:8888/api/compile', Meteor.bindEnvironment(function (err, httpResponse, body) {

                var taskExecution = {
                    type: 'compile',
                    sourceCode: documentId
                };

                if (err || httpResponse.statusCode !== 200) {

                    taskExecution.status = 1; // success

                    TaskExecutions.insert(taskExecution, function (error, taskExecutionId) {
                        if (error) {
                            $("#error").val('');
                            $("#error").append(error);
                        }
                    });

                    console.error('error:', err || httpResponse.body);

                } else {

                    taskExecution.status = 0; //fail

                    TaskExecutions.insert(taskExecution, function(error, taskExecutionId){
                        if (error) {
                            $("#error").val('');
                            $("#error").append(error);
                        }
                    });
                }

            }));

            var form = r.form();
            form.append('taskExecution', taskExecutionId);

            return taskExecutionId;
        },

    });
}