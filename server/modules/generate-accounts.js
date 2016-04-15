var administrators = [
  {
    name: { first: 'Admin', last: 'McAdmin' },
    email: 'admin' + Meteor.settings.private.subDomain,
    username: 'boss',
    password: Meteor.settings.private.defaultPassword
  }
];

var generateAccounts = function() {
  var fakeUserCount = 20,
      usersExist    = _checkIfAccountsExist( administrators.length + fakeUserCount );

  if ( !usersExist ) {
    _createUsers( administrators );
    _createUsers( _generateFakeUsers( fakeUserCount ) );
  }
};

var _checkIfAccountsExist = function( count ) {
  var userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

var _createUsers = function( users ) {
  for ( var i = 0; i < users.length; i++ ) {
    var user       = users[ i ],
        userExists = _checkIfUserExists( user.email),
        usernameExists = _checkIfUsernameExists( user.email);

    if ( !userExists && !usernameExists) {
      var userId  = _createUser( user ),
          isAdmin = _checkIfAdmin( user.email );

      if ( isAdmin ) {
        Roles.setUserRoles( userId, 'admin' );
      } else {
          Roles.setUserRoles( userId, 'student' );
      }
    }
  }
};

var _checkIfUserExists = function( email ) {
  return Meteor.users.findOne( { 'emails.address': email } );
};

var _checkIfUsernameExists = function( username ) {
  return Meteor.users.findOne( { 'username': username } );
};

var _createUser = function( user ) {
  var userId = Accounts.createUser({
    email: user.email,
    password: user.password,
    username: user.username,
    profile: {
      name: user.name
    }
  });

  return userId;
};

var _checkIfAdmin = function( email ) {
  return _.find( administrators, function( admin ) {
    return admin.email === email;
  });
};

var _generateFakeUsers = function( count ) {
  var users = [];

  for ( var i = 0; i < count; i++ ) {
    users.push({
      name: { first: faker.name.firstName(), last: faker.name.lastName() },
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: Meteor.settings.private.defaultPassword
    });
  }

  return users;
};

TMModules.server.generateAccounts = generateAccounts;
