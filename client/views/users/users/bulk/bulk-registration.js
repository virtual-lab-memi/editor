Template.BulkRegistration.onRendered(function() {
  TMModules.client.validate({
    form: 'bulk-registration',
    rules: _rules,
    messages: _messages,
    callback: _handleRegistration,
    template: Template.instance()
  });
});

var _rules = {
  firstname: 'required',
  lastname: 'required',
  newEmailAddress: {
    required: true,
    email: true
  },
  newUsername: {
    required: true,
  },
  newPassword: {
    required: true,
    minlength: 6
  },
  newPasswordConfirm: {
    minlength: 6,
    equalTo: '#new-password'
  }
};

var _messages = {
  firstname: 'Ingrese su nombre',
  lastname: 'Ingrese su apellido',
  newEmailAddress: {
    required: 'Ingrese su correo electronico',
    email: 'Correo electronico no valido'
  },
  newUsername:{
    requiref: 'Ingrese su nombre usuario'
  },
  newPassword: {
    required: 'Ingrese su nueva contraseña',
    minlength: 'La nueva contraseña debe ser mayor a 6 caracteres'
  },
  newPasswordConfirm: 'La contraseñas no son iguales'
};

var _handleRegistration = function(template) {
  var route = Router.current(),
    user = Meteor.user(),
    email = template.find('[name="newEmailAddress"]').value,
    username = template.find('[name="newUsername"]').value,
    password = template.find('[name="newPassword"]').value,
    user = {
      email: email,
      username: username,
      password: Accounts._hashPassword(password),
    };

  Meteor.call('finishRegistration', user);
  Router.go('/login');
};

Template.BulkRegistration.helpers({
  user: function() {
    return Meteor.user();
  }
});

Template.BulkRegistration.events({
  'submit form': function(event, template) {
    event.preventDefault();
  }
});
