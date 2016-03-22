CriteriaSchema = new SimpleSchema({
  title: {
    type: String
  },
  tag: {
    type: String
  },
  regex: {
    type: String
  },
  tutorial: {
    type: String
  },
  syntaxFeed: {
    type: String
  },
  semanticFeed: {
    type: String
  },
  createdDate: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Criteria = new Mongo.Collection('criteria');
Criteria.attachSchema(CriteriaSchema);

CriteriaIndex = new EasySearch.Index({
  collection: Criteria,
  fields: ['title', 'tag'],
  engine: new EasySearch.MongoDB()
});
