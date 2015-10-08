Template.Editor.helpers({

    "editorOptions": function() {
        return {
            lineNumbers: true,
            fixedGutter: true,
            mode: "text/x-c++src",
            lineWrapping: true,
            cursorHeight: 1.5,
            theme: "lesser-dark",
        }
    },

});

Template.Editor.events({
    // This button click got property of editor and verify. if not empty after
    // insert database then call method to server por send to request
    'click #compile':function(event, template){
        event.preventDefault();
        var text = template.find("#idCodemirror").value;
        if( text !== ""){
            var document = {
                code: text,
                language: "cpp"
            };
            Documents.insert(document, function(error, documentId){
                if(error){
                    $("#error").append(error);
                }else{
                    Meteor.call("compile", documentId, document.language, function(error, reply){
                        if(error){
                            $("#error").append(error.reason);
                        }else{
                            var textAreaOutput = $('#output');
                            textAreaOutput.val(reply);
                            console.info(reply);
                        }
                    });
                }
            });

        }

    },
    'click #run':function(event, template){
        event.preventDefault();
        console.log("run");
    }
});