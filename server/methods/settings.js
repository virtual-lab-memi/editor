Meteor.methods({
    updateSettings: function(newSettings) {
        var settings = Settings.findOne();

        if(!settings) {
            Settings.insert(newSettings);
        } else {
            Settings.update(settings._id, {$set: newSettings});
        }
    }
});
