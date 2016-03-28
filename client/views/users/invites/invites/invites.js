Template.Invites.helpers({
    hasInvitations: function() {
        var invitations = Invitations.find().count();
        console.log(invitations);
        return invitations < 1 ? false : true;
    },
    invitations: function() {
        var invitations = Invitations.find();

        if ( invitations ) {
            console.log(invitations);
            return invitations;
        }
    }
});
