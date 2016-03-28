const TestCasesSchema = new SimpleSchema({
    input: {
        type: String
    },
    output: {
        type: String
    },
    feedback: {
        type: String
    },
    tag: {
        type: String
    }
});

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
    testCases: {
        type: [TestCasesSchema],
        optional: true
    },
    type: {
        type: String
    },
    projects: {
        type: [String],
        optional: true
    },
    owner:{
        type: String
    }
});

Tasks = new Mongo.Collection('tasks');
Tasks.attachSchema(TaskSchema);