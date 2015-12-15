const RevisionsSchema = new SimpleSchema({
    linesModified: {
        type: Number
    },
    changesByLine: {
        type: Number
    },
    timestamp: {
        type: Number
    },
    weight: {
        type: Number
    },
    diff: {
        type: Number
    },
    parent: {
        //file
        type: String
    }
});

Revisions = new Mongo.Collection('Revisions');
Revisions.attachSchema(RevisionsSchema);
