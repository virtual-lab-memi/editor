Template.Login.onRendered( function() {
  login( { form: "#login", template: Template.instance() } );
});

Template.Login.events({
  'submit form': function( event ){event.preventDefault();}
});

var login = function( options ) {
  _validate( options.form, options.template );
};

var _validate = function( form, template ) {
  $( form ).validate( validation( template ) );
};

var validation = function( template ) {
  return {
    rules: {
      emailAddress: {
        required: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.'
      }
    },
    submitHandler: function() { _handleLogin( template ); }
  };
};

_handleLogin = function( template ) {
  var email    = template.find( '[name="emailAddress"]' ).value,
      password = template.find( '[name="password"]' ).value;

  Meteor.loginWithPassword( email, password, function( error ) {
    if ( error ) {
      console.log('Error', error);
    } else {
      console.log('Successful login!!');
    }
  });
};
