var accept = function( options ) {
    var invite = _getInvitation( options.token );
    var user   = _createUser( options );

    _addUserToRole( user, invite.role );
    _deleteInvite( invite._id );

    return user;
};

var _createUser = function( options ) {
    var userId = Accounts.createUser({
        email: options.email,
        password: options.password,
        username: options.username,
        profile: {
            name: {
                first: options.firstname,
                last: options.lastname
            },
            disabled: Meteor.settings.private.availableStateUser,
            date:  (new Date() ).toISOString(),
        }
    });

    if ( userId ) {
        return userId;
    }
};

var _getInvitation = function( token ) {
    var invitation = Invitations.findOne( { "token": token } );

    if ( invitation ) {
        return invitation;
    }
};

var _deleteInvite = function( invite ) {
    Invitations.remove( { "_id": invite } );
};

var _addUserToRole = function( user, role ) {
    Roles.setUserRoles( user, role );
};

var invitation = function( options ) {
    _insertInvitation( options );
    var email = _prepareEmail( options.token );
    _sendInvitation( options.email, email );
};

var _insertInvitation = function( invite ) {
    Invitations.insert( invite );
};

var _prepareEmail = function( token ) {
    var domain = Meteor.settings.private.domain;
    var url    = 'http://' + domain + '/invite/' + token;

    SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/invitation.html' ) );
    var html = SSR.render( 'invitation', { url: url } );

    return html;
};

var _sendInvitation = function( email, content ) {
    Email.send({
        to: email,
        from: "Login <admin@admin.com>",
        subject: "Login",
        html: content
    });
};

var invitationCSV = function( options ) {
    _insertInvitation( options );
    var email = _prepareEmailCSV(options.password);
    _sendInvitation( options.email, email );
};


var _prepareEmailCSV = function(password) {
    var domain = Meteor.settings.private.domain;
    var url    = 'http://' + domain + '/login';

    SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/invitationCSV.html' ) );
    var html = SSR.render( 'invitation', { url: url, password: password } );

    return html;
};

TMModules.server.sendInvitation = invitation;

TMModules.server.acceptInvitation = accept;


TMModules.server.sendInvitationCSV = invitationCSV;