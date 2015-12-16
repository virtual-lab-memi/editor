Template.Invites.helpers({
    hasInvitations: function() {
        var invitations = Invitations.find().count();
        return invitations < 1 ? false : true;
    },
    invitations: function() {
        var invitations = Invitations.find();

        if ( invitations ) {
            return invitations;
        }
    }
});
