Template.EditTestCase.onCreated(function() {
    var taskId = FlowRouter.getParam('taskId');
    Template.instance().subscribe('aTask', taskId);
    this.inputID = Uploads.insert({type: 'TASK'});
    this.outputID = Uploads.insert({type: 'TASK'});
});

Template.EditTestCase.onRendered(function() {
    var me = this;
    me.saveNow = false;

    $( '#test-case-form' ).validate({
        rules: {
            feedback: {
                required: true
            }
        },
        messages: {
            feedback: {
                required: 'Por favor, ingrese un mensaje de retroalimentacion para el caso de prueba'
            }
        },
        submitHandler: function() {
            var taskId = FlowRouter.getParam('taskId');
            var testID = FlowRouter.getParam('index');
            var feedback    = $( '[name="feedback"]' ).val(),
                input = me.inputID,
                output = me.outputID;
            var testID = FlowRouter.getParam('index');
            var task = Tasks.findOne();
            var test = task.testCases.find(function (testCase) {
                return testCase.id === testID;
            });
            console.log(test);
            var fileLabels = $('.progress-label');
            var inputLabel = fileLabels[0];
            var outputLabel = fileLabels[1];

            if (inputLabel.innerText !== '') {
                test.input = me.inputID;
            }
            if (outputLabel.innerText !== '') {
                test.output = me.outputID;
            }
            test.feedback = feedback;

            console.log(test);
            Meteor.call('updateTestCase', taskId, testID, test, function(error) {
                if(error) {
                    Bert.alert('El caso de prueba no pudo ser actualizado, intente otra vez.', 'warning');
                    return;
                }

                Bert.alert('El caso de prueba se actualizo exitosamente!', 'success');
                FlowRouter.go('task', {id: taskId});
            });
        }
    });
});

Template.EditTestCase.helpers({
    selectedTestCase: function() {
        var testID = FlowRouter.getParam('index');
        var task = Tasks.findOne();
        if (task) {
            return task.testCases.find(function (testCase) {
                return testCase.id === testID;
            });
        } else {
            return null;
        }
    },
    taskInput: function() {
        var taskId = FlowRouter.getParam('taskId');
        return {
            type: 'TASK',
            id: taskId,
            isInput: true,
            uploadId: Template.instance().inputID
        }
    },
    taskOutput: function() {
        var taskId = FlowRouter.getParam('taskId');
        return {
            type: 'TASK',
            id: taskId,
            isInput: false,
            uploadId: Template.instance().outputID
        }
    },
    taskID: function() {
        return FlowRouter.getParam('taskId');
    }
});

Template.EditTestCase.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});



