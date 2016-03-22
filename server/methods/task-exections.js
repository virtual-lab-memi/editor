if (Meteor.isServer) {

    Meteor.methods({
        compile: function (projectId, taskId) {
            var request = Meteor.npmRequire('request');
            console.log(projectId, taskId);
            var taskExecutionId = TaskExecutions.insert({project: projectId, task: taskId, isCompilation: true});
            Projects.update({_id: projectId}, {$set: {lastRun: taskExecutionId}});

            var r = request.post('http://localhost:8888/api/compile', Meteor.bindEnvironment(function (err, httpResponse, body) {
                if (err || httpResponse.statusCode !== 200) {
                    console.error('error:', err || httpResponse.body);
                    TaskExecutions.update({_id: taskExecutionId}, { $set: {
                        status: 1,
                        error: err.toString() + '\nContacte con el administrador del sitio.'
                    }});
                }
            }));
            var form = r.form();
            form.append('taskExecution', taskExecutionId);
            return taskExecutionId;
        },
        run: function(projectId, taskId){
            var request = Meteor.npmRequire('request');
            console.log(projectId, taskId);
            var taskExecutionId = TaskExecutions.insert({project: projectId, task: taskId, isCompilation: false});
            Projects.update({_id: projectId}, {$set: {lastRun: taskExecutionId}});

            var r = request.post('http://localhost:8888/api/run', Meteor.bindEnvironment(function (err, httpResponse, body) {
                if (err || httpResponse.statusCode !== 200) {
                    console.error('error:', err || httpResponse.body);
                    TaskExecutions.update({_id: taskExecutionId}, { $set: {
                        status: 1,
                        error: err.toString() + '\nContacte con el administrador del sitio.'
                    }});
                }
            }));
            var form = r.form();
            form.append('taskExecution', taskExecutionId);
            return taskExecutionId;
        }
    });
}