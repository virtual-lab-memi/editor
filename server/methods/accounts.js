Meteor.methods({
    parseUpload: function (data) {
        check(data, Array);
        for (var i = 0; i < data.length; i++) {
            var user = data[i];
            var flagEmail = false;
            var exists = Meteor.users.findOne({'profile.codId': user.codId});

            if (!exists) {
                var firstname = data[i].firstname;
                var lastname = data[i].lastname;
                var codId = data[i].codId;
                var email = data[i].email;
                var username = data[i].username;
                var password = Random.hexString(16);

                if (email === "null" || email === null || email === " " || typeof email === "undefined" || typeof email === undefined || email === ' ') {
                    flagEmail = true;
                    if (username != "null" || username != null || username != "" || typeof username != "undefined" || typeof username != undefined) {
                        username = firstname + lastname;
                    }
                    email = username + '@admin.com';


                }
                else {
                    flagEmail = true;
                    if (username === "null" || username === null || username === " " || typeof username === "undefined" || typeof username === undefined || username === ' ') {
                        var lenghtUsername = email.indexOf("@");
                        username = email.substring(0, lenghtUsername);
                    } else {
                        username = firstname + lastname;
                    }

                }

                var userExist = Meteor.users.findOne({'emails.address': email});

                if (!userExist) {

                    var disabled;

                    if (flagEmail == true) {
                        disabled = Meteor.settings.private.availableStateUser;
                    } else {
                        disabled = Meteor.settings.public.availableStateUser;
                    }

                    var userId = Accounts.createUser({
                        email: email,
                        username: username,
                        password: password,
                        profile: {
                            name: {
                                first: firstname,
                                last: lastname
                            },
                            disabled: disabled,
                            codId: codId,
                            date: (new Date() ).toISOString(),
                        },

                    });


                    Roles.setUserRoles(userId, 'student');

                    try {
                        if (flagEmail == true) {
                            TMModules.server.sendInvitationCSV({
                                email: email,
                                password: password,
                                firstname: firstname,
                                lastname: lastname,
                            });
                        }
                        flagEmail = false;

                    } catch (exception) {
                        console.log('ex:', exception);
                        return {error: exception};
                    }
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