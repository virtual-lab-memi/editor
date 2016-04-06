var recoverPassword = function( options ) {
  _validate( options.form, options.template );
};

var _validate = function( form, template ){
  $( form ).validate( validation( template ) );
};

var validation = function( template ){
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      }
    },
    submitHandler: function() { _handleRecovery( template ); }
  };
};

var _handleRecovery = function( template ){
  var email = template.find( '[name="emailAddress"]' ).value;

  Accounts.forgotPassword( { email: email }, function( error ){
    if ( error ) {
      Bert.alert( error.reason, 'warning' );
    } else {
      Bert.alert( 'Check your inbox for a reset link!', 'success' );
    }
  });
};

TMModules.client.recoverPassword = recoverPassword;
