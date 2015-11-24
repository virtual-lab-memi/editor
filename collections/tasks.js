const TaskSchema = new SimpleSchema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    initialFileContent: {
        type: String
    },
    projects: {
        type: [String],
        optional: true
    }
});

Tasks = new Mongo.Collection('tasks');
Tasks.attachSchema(TaskSchema);