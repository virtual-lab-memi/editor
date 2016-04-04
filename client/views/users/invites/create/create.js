Template.SendInvite.onRendered(function() {
  sendInvite('#send-invite-form', Template.instance());
});

var sendInvite = function(form, template) {
  $( form ).validate( validation( template ) );
};

var validation = function( template ) {
  return {
    rules: {
      emailAddress: {
        required: true
      },
      firstname: {
        required: true
      },
      lastname:{
        required: true
      },
      roles: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Inserte su correo electronico.'
      },
      firstname: {
        required: 'Insert su nombres'
      },
      lastname: {
        required: 'Inserter su apellidos'
      },
      roles: {
        required: 'Seleccione un rol por defecto.'
      }
    },

    submitHandler: function() {
      _handleInvite( template );
    }
  };
};

var _handleInvite = function(template) {
  var email = template.find( '[name="emailAddress"]' ).value,
      firstname = template.find('[name="firstname"]').value,
      lastname = template.find('[name="lastname"]').value,
      role  = template.find( '[name="roles"] option:selected' ).value;

  if ( email && firstname && lastname && role !== '' ) {
    Meteor.call( 'sendInvite', {
      email: email,
      firstname: firstname,
      lastname: lastname,
      role: role
    }, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "warning" );
      } else {
        Bert.alert( "Invitation sent!", "success" );
      }
    });
  } else {
    console.log('Please set an email and at least one user type!');
  }
};

Template.SendInvite.events({
  'submit form': function( event ) {
    event.preventDefault();
  }
});
