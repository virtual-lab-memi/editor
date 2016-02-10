const ProjectSchema = new SimpleSchema({
    title: {
        type: String
    },
    files: {
        type: [String]
    },
    currentFile: {
        type: String,
        optional: true
    },
    openedFiles: {
        type: [String]
    },
    lastRun: {
        //Task Execution ID
        type: String,
        optional: true
    },
    parent: {
        //Task ID
        type: String
    }
});

Projects = new Mongo.Collection('projects');
Projects.attachSchema(ProjectSchema);