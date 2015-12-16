var validateForm = function(options) {
  $('#' + options.form).validate(_validation(options));
};

var _validation = function(options) {
  return {
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },

    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },

    errorElement: 'span',

    errorClass: 'help-block',

    errorPlacement: function(error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },

    rules: options.rules,
    messages: options.messages,
    submitHandler: function() {
      console.log('test');
      options.callback(options.template);
    }
  };
};

TMModules.client.validate = validateForm;
