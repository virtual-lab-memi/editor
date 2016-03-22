const SettingsSchema = new SimpleSchema({
    keystrokes: {
        type: Number,
        defaultValue: 20
    },
    saveTimeout: {
        type: Number,
        defaultValue: 5
    }
});

Settings = new Mongo.Collection('settings');
Settings.attachSchema(SettingsSchema);