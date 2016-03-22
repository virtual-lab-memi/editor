Template.CreateCriteria.onRendered(function() {
  $( '#create-criteria-form' ).validate({
    rules: {
      title: {
        required: true
      },
      tag: {
        required: true
      },
      regex: {
        required: true
      },
      tutorial: {
        required: true
      },
      syntaxFeed: {
        required: true
      },
      semanticFeed: {
        required: true
      }
    },
    messages: {
      title: {
        required: 'Por favor, ingrese un nombre'
      },
      tag: {
        required: 'Por favor, ingrese una descripcion'
      }
    },
    submitHandler: function() {
      var title    = $( '[name="title"]' ).val(),
        tag = $('[name="tag"]').val(),
        regex = $('[name="regex"]').val(),
        tutorial = $('[name="tutorial"]').val(),
        syntaxFeed = $('[name="syntaxFeed"]').val(),
        semanticFeed = $('[name="semanticFeed"]').val();

      Criteria.insert({
        title: title,
        tag: tag,
        regex: regex,
        tutorial: tutorial,
        syntaxFeed: syntaxFeed,
        semanticFeed: semanticFeed
      }, function(error, taskId) {
        if(error) {
          Bert.alert('El criterio no pudo ser creado, por favor intente otra vez.', 'warning');
          return;
        }

        Bert.alert('El criterio se creo exitosamente!', 'success');
        FlowRouter.go('settings');
      })
    }
  });
});

Template.CreateTask.events({
  'submit form': function(event) {
    event.preventDefault();
  }
});

