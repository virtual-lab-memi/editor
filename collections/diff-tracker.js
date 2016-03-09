const DiffTrackerSchema = new SimpleSchema({
    levenstain: {
        type: Number
    },
    source: {
        type: String
    },
    diff: {
        type: String,
        optional: true
    },
    parent: {
        //File
        type: String
    }
});

DiffTracker = new Mongo.Collection('diffTracker');
DiffTracker.attachSchema(DiffTrackerSchema);