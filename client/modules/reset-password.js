var resetPassword = function( options ){
  _validate( options.form, options.template );
};

var _validate = function( form, template ){
  $( form ).validate( validation( template ) );
};

var validation = function( template ){
  return {
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: "Enter a new password, please.",
        minlength: "Use at least six characters, please."
      },
      repeatNewPassword: {
        required: "Repeat your new password, please.",
        equalTo: "Hmm, your passwords don't match. Try again?"
      }
    },
    submitHandler: function() { _handleReset( template ); }
  };
};

var _handleReset = function( template ) {
  var token    = FlowRouter.current().params.token,
      password = template.find( '[name="newPassword"]' ).value;

  Accounts.resetPassword( token, password, function( error ){
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Password reset!', 'success' );
    }
  });
};

TMModules.client.resetPassword = resetPassword;
