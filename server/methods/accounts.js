Meteor.methods({
    parseUpload: function (data) {
        check(data, Array);
        for (var i = 0; i < data.length; i++) {
            var user = data[i];

            var exists = Meteor.users.findOne({'profile.sisId': user.sisId});

            if (!exists) {
                var nombres = data[i].Nombres.trim();
                var apellidos = data[i].Apellidos.trim();
                var username = (nombres + apellidos).toLowerCase();
                var sisId = data[i].sisId.trim();

                var userExist = Meteor.users.findOne({username: username});

                if (!userExist) {

                    var userId = Accounts.createUser({
                        email: username + Meteor.settings.private.subDomain,
                        username: username,
                        password: Meteor.settings.private.defaultPassword,
                        profile: {
                            name: {
                                first: nombres,
                                last: apellidos
                            },
                            disabled: true,
                            sisId: sisId,
                        },

                    });
                    Roles.setUserRoles(userId, 'student');
                } else {
                    console.warn('username already exist');
                }
            } else {
                console.warn('Reject. This item already exists.');
            }

        }
    },
    finishRegistration: function (user) {
        TMModules.server.updateUserInfoFile(user);
    }
});