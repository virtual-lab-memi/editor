if (Meteor.isServer) {

    Meteor.methods({
        compile: function (documentId, taskExecutionId) {
            var request = Meteor.npmRequire('request');

            var r = request.post('http://localhost:8888/api/compile', Meteor.bindEnvironment(function (err, httpResponse, body) {
                if (err || httpResponse.statusCode !== 200) {
                    console.error('error:', err || httpResponse.body);
                    TaskExecutions.update({_id: taskExecutionId}, { $set: {
                        status: 1,
                        output: err.toString()
                    }});
                }
            }));
            var form = r.form();
            form.append('taskExecution', taskExecutionId);
        },
        run: function(documentId, taskExecutionId){
            var request = Meteor.npmRequire('request');

            var r = request.post('http://localhost:8888/api/run', Meteor.bindEnvironment( function(err, httpResponse, body) {
                if (err || httpResponse.statusCode !== 200) {
                    console.error('error:', err || httpResponse.body);

                    TaskExecutions.update({_id: taskExecutionId}, { $set: {
                        status: 1,
                        output: err? err.toString() : httpResponse.body
                    }});
                }
            }));

            var form = r.form();
            form.append('taskExecution', taskExecutionId);
        }
    });
}