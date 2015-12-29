var createInvitationsInBulk = function (users) {
    _createUsers(users);
};

var _checkIfUserExists = function (email) {
    return Meteor.users.findOne({'emails.address': email});
};

var _checkIfUsernameExists = function (username) {
    return Meteor.users.findOne({'username': username});
};

var _createUser = function (user) {
    var userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        username: user.username,
        profile: {
            name: user.name,
            disabled: true
        }
    });

    return userId;
};

var _createUsers = function (users) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        user.email = user.username + Meteor.settings.private.subDomain;
        user.name = {first: user.username, last: user.username};

        var userExists = _checkIfUserExists(user.email);
        var usernameExists = _checkIfUsernameExists(user.email);

        if (!userExists && !usernameExists) {
            var userId = _createUser(user);
            Roles.setUserRoles(userId, 'student');
        }
    }
};

var updateUserInfoFile = function (userData) {
    var user = Meteor.user();
    Accounts.addEmail(Meteor.userId(), userData.email);
    Accounts.removeEmail(Meteor.userId(), user.username + Meteor.settings.private.subDomain);
    Accounts.setUsername(Meteor.userId(), userData.username);
    Meteor.users.update({_id: Meteor.userId()}, {
        $set: {
            'profile.disabled': false
        }
    });
    console.log(Meteor.users.findOne({_id: Meteor.userId()}));
    Accounts.setPassword(Meteor.userId(), userData.password);
};


TMModules.server.createInvitationsInBulk = createInvitationsInBulk;
TMModules.server.updateUserInfoFile = updateUserInfoFile;
