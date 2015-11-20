const FileSchema = new SimpleSchema({
    name: {
        type: String
    },
    source: {
        type: String,
        optional: true
    },
    parent: {
        //Project ID
        type: String
    }
});

Files = new Mongo.Collection('files');
Files.attachSchema(FileSchema);