Template.CreateUserFile.onCreated( function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.CreateUserFile.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  }
});

Template.CreateUserFile.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUpload', results.data, function( error, response ) {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      },
      skipEmptyLines: true
    });
  }
});
