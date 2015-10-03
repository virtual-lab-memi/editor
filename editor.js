if(Meteor.isClient){
	Template.EditorPage.helpers({

	    "editorOptions": function() {
	    	console.log('jjhjhjhjh');
	        return {
	            lineNumbers: true,
	            fixedGutter: true,
	            mode: "text/x-c++src",
	            lineWrapping: true,
	            cursorHeight: 1.5,
	        }
	    },

	    "editorCode": function() {
	        return "Code to show in editor";
	    },

	    "getEditorText": function() {
        	return Session.get("varName"); // "varName" is variable name you provided to reactiveVar 
    	}

	});


}