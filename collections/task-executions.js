const TaskExecutionSchema = new SimpleSchema({
  language: {
    type: String,
    defaultValue: 'C++'
  },
  isCompilation: {
    type: Boolean
  },
  date: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  project: {
    //ProjectID
    type: String
  },
  task: {
    //ProjectID
    type: String
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
    defaultValue: 0
  },
  memory: {
    type: Number,
    defaultValue: 0
  },
  time: {
    type: Number,
    defaultValue: 0
  },
  status: {
    type: String,
    optional: true
  },
  error: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  owner: {
    type: String,
    autoValue: function (doc) {
      return this.userId;
    }
  }
});

TaskExecutions = new Meteor.Collection('taskExecutions');
TaskExecutions.attachSchema(TaskExecutionSchema);
