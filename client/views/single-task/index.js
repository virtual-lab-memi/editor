Template.Index.onCreated(function () {
    var self = this;
    var document = {
        code: '',
        language: "cpp"
    };

    self.documentId = new ReactiveVar('');
    self.taskExecutionId = new ReactiveVar('');

    Documents.insert(document, function (error, documentId) {
        if (error) {
            $("#error").val('');
            $("#error").append(error);
            console.log(error);
            return;
        }

        self.documentId.set(documentId);
    });
});

Template.Index.helpers({
    editorOptions: function () {
        return {
            lineNumbers: true,
            fixedGutter: true,
            mode: "text/x-c++src",
            lineWrapping: true,
            cursorHeight: 1.5,
            theme: "lesser-dark"
        }
    },
    outputContent: function () {
        if (Template.instance().taskExecutionId.get() !== '') {
            var task = TaskExecutions.findOne({_id: Template.instance().taskExecutionId.get()});
            return task.output;
        } else {
            return 'Nothing here';
        }
    }
});


Template.Index.events({
    // This button click got property of editor and verify. if not empty after
    // insert database then call method to server por send to request
    'click #compile': function (event, template) {
        event.preventDefault();

        var text = template.find("#idCodemirror").value;
        var documentId = template.documentId.get();

        if (text !== '') {
            Documents.update({
                _id: documentId
            }, {
                $set: {
                    code: text
                }
            }, function (error, documentChanged) {
                if (error) {
                    $("#error").val('');
                    $("#error").append(error);
                    return;
                }

                if (documentChanged) {
                    var task = {
                        type: 'compile',
                        sourceCode: documentId
                    };
                    TaskExecutions.insert(task, function (error, taskId) {
                        if (error) {
                            $("#error").val('');
                            $("#error").append(error);
                            return;
                        }

                        template.taskExecutionId.set(taskId);

                        Meteor.call('compile', documentId, taskId, function (error, response) {
                            if (error) {
                                $("#error").val('');
                                $("#error").append(error);
                                return;
                            }
                        });
                    });
                }
            });
        }
    },

    'click #run': function (event, template) {
        event.preventDefault();

        var text = template.find("#idCodemirror").value;
        var documentId = template.documentId.get();

        if (text !== '') {
            var textInput = template.find("#input").value;

            if(textInput !== ''){
                Documents.update(
                    {
                        _id: documentId
                    },{
                        $set:{
                            code: text
                        }
                    }, function(error, documentChanged){
                        if (error) {
                            $("#error").val('');
                            $("#error").append(error);
                            return;
                        }

                        if(documentChanged){

                            var task = {
                                type: 'run',
                                sourceCode: documentId,
                                input: textInput
                            };

                            TaskExecutions.insert(task, function(error, taskExecutionId) {
                                if (error) {
                                    $("#error").val('');
                                    $("#error").append(error);
                                    return;
                                }

                                template.taskExecutionId.set(taskExecutionId);

                                Meteor.call('run', documentId, taskExecutionId, function(error, response) {
                                    if (error) {
                                        $("#error").val('');
                                        $("#error").append(error);
                                        return;
                                    }
                                });
                            });
                        }
                    });

            }
            }
    }

});
