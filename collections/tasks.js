const TestCasesSchema = new SimpleSchema({
    id: {
        type: String,
        autoValue: function() {
            return Meteor.uuid();
        }
    },
    input: {
        type: String
    },
    output: {
        type: String
    },
    feedback: {
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
        type: String,
        optional: true
    },
    projects: {
        type: [String],
        optional: true
    }
});

Tasks = new Mongo.Collection('tasks');
Tasks.attachSchema(TaskSchema);

TaskIndex = new EasySearch.Index({
  collection: Tasks,
  fields: ['title'],
  engine: new EasySearch.MongoDB()
});
