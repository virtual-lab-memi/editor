UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username', 'emails', 'profile.name.first', 'profile.name.last'],
  selectorPerField: function (field, searchString) {
    if ('emails' === field) {
      // return this selector if the email field is being searched
      return {
        emails: {
          $elemMatch: {
            address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
          }
        }
      };
    }

    if ('profile.name.first') {
      return {
        'profile.name.first': {
          $elemMatch: {
            address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
          }
        }
      };
    }

    if ('profile.name.last') {
      return {
        'profile.name.last': {
          $elemMatch: {
            address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
          }
        }
      };
    }

    return this.defaultConfiguration().selectorPerField(field, searchString);
  },
  engine: new EasySearch.MongoDB()
});