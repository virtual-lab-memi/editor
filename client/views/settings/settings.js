Template.Settings.onRendered(function() {
  $( '#settings-form' ).validate({
      rules: {
          keystrokes: {
              required: true,
              min: 5
          },
          saveTimeout: {
              required: true,
              min: 1
          }
      },
      messages: {
          keystrokes: {
              required: 'Por favor, ingrese un numero mayor a 5'
          },
          saveTimeout: {
              required: 'Por favor, ingrese un numero mayor a 1'
          }
      },
      submitHandler: function() {
          var keystrokes    = $( '[name="keystrokes"]' ).val(),
            saveTimeout = $('[name="saveTimeout"]').val();

          Meteor.call('updateSettings', {
              keystrokes: keystrokes,
              saveTimeout: saveTimeout
          }, function(error) {
              if(error) {
                  console.log(error);
                  Bert.alert('Las configuraciones no han podido ser actualizadas, intente otra vez.', 'warning');
                  return;
              }

              Bert.alert('La configuraciones han sido actualizadas exitosamente!', 'success');
          })
      }
  });
});

Template.Settings.onCreated(function() {
  Template.instance().subscribe('settings');
  Template.instance().subscribe('recentCriteria');
});

Template.Settings.helpers({
  settings: function() {
    var settings = Settings.findOne();

    return settings;
  },
  recentCriteria: function() {
    return Criteria.find();
  }
});

Template.Settings.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});

