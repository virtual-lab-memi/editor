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
                input = me.input.get(),
                output = me.input.get();

            if (!input || !output) {
                var fileLabels = $('.progress-label');
                var input = fileLabels[0];
                var output = fileLabels[1];

                if (input.innerText !== '' && output.innerText !== '') {
                    me.saveNow = true;
                    $('.start').trigger('click');
                } else {
                    console.log('check your testing files');
                }
                return;
            }
            console.log('success');
            Meteor.call('addTestCase', taskId, {
                feedback: feedback,
                tag: tag
            }, input, output, function(error) {
                console.log(arguments);
                if(error) {
                    Bert.alert('El caso de prueba no pudo ser añadido, intente otra vez.', 'warning');
                    return;
                }

                Bert.alert('El caso de prueba se añadio exitosamente!', 'success');
                FlowRouter.go('task', {id: taskId});
            })
        }
    });
});

Template.CreateTestCase.onCreated(function() {
    this.input = new ReactiveVar(null);
    this.output = new ReactiveVar(null);
});

Template.CreateTestCase.helpers({
    input: function() {
        return Template.instance().input.get();
    },
    output: function() {
        return Template.instance().output.get();
    },
    inputCallback: function() {
        var parentTemplate = Template.instance();
        var taskId = FlowRouter.getParam('taskId');

        return {
            finished: function(index, fileInfo, context) {
                fileInfo.parent = taskId;
                parentTemplate.input.set(fileInfo);

                if (parentTemplate.saveNow && parentTemplate.output.get()) {
                    console.log('ajajaja');
                    $('form').trigger('submit');
                }
            }
        }
    },
    outputCallback: function() {
        var parentTemplate = Template.instance();
        var taskId = FlowRouter.getParam('taskId');

        return {
            finished: function(index, fileInfo, context) {
                fileInfo.parent = taskId;
                parentTemplate.output.set(fileInfo);

                if (parentTemplate.saveNow && parentTemplate.input.get()) {
                    console.log('ajajajax2222');
                    $('form').trigger('submit');
                }
            }
        }
    }
});

Template.CreateTestCase.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});



