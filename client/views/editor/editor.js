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
    'click #compile':function(event, template){
        event.preventDefault();
        // get property of editor
        var text = template.find("#id_codemirror").value;
        // verify text is no empty
        if( text !== ""){
            // initialize object document
            var document = {
                code: text,
                language: "cpp"
            };
            // insert row in database
            Documents.insert(document, function(error, documentId){
                // verify any error
                if(error){
                    console.log('Document insert error', error);
                    return;
                }else{
                    console.log('Document insert success');
                    // call method
                    Meteor.call("compile", documentId, document.language, function(error, reply){
                        //
                        if(error){
                            console.log(error.reason);
                        }else{
                            var box_output = $('#output');
                            box_output.val(reply);
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