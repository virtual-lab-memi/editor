Template.CreateTestCase.onRendered(function() {
    var me = this;
    me.saveNow = false;

    $( '#test-case-form' ).validate({
        rules: {
            feedback: {
                required: true
            },
            tag: {
                required: true
            }
        },
        messages: {
            feedback: {
                required: 'Por favor, ingrese un mensaje de retroalimentacion para el caso de prueba'
            },
            tag: {
                required: 'Por favor, ingrese una tag'
            }
        },
        submitHandler: function() {
            var taskId = FlowRouter.getParam('taskId');
            var feedback    = $( '[name="feedback"]' ).val(),
                tag = $('[name="tag"]').val(),
                input = me.inputID,
                output = me.outputID;

            var fileLabels = $('.progress-label');
            var inputLabel = fileLabels[0];
            var outputLabel = fileLabels[1];

            if (inputLabel.innerText === '' || outputLabel.innerText === '') {
                Bert.alert('Necesita subir sus archivos de prueba.', 'warning');
                return;
            }

            Meteor.call('addTestCase', taskId, {
                feedback: feedback,
                tag: tag,
                input: input,
                output:output
            }, function(error) {
                if(error) {
                    Bert.alert('El caso de prueba no pudo ser añadido, intente otra vez.', 'warning');
                    return;
                }

                Bert.alert('El caso de prueba se añadio exitosamente!', 'success');
                FlowRouter.go('task', {id: taskId});
            });
        }
    });
});

Template.CreateTestCase.onCreated(function() {
    this.inputID = Uploads.insert({type: 'TASK'});
    this.outputID = Uploads.insert({type: 'TASK'});
});

Template.CreateTestCase.helpers({
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
    }
});

Template.CreateTestCase.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});



