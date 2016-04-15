Template.DiffGen.onCreated(function() {
  var fileDiffId = FlowRouter.getParam('diff1');
  var fileDiffId2 = FlowRouter.getParam('diff2');
  this.subscribe('twoDiffs', fileDiffId, fileDiffId2);
});

Template.DiffGen.onRendered(function() {

});

Template.DiffGen.helpers({
  diff1: function() {
    var fileDiffId = FlowRouter.getParam('diff1');
    return DiffTracker.findOne({_id: fileDiffId}).source;
  },
  diff2: function() {
    var fileDiffId2 = FlowRouter.getParam('diff2');
    return DiffTracker.findOne({_id: fileDiffId2}).source;
  }
});

Template.DiffGen.events({
  'click #diffGen': function() {
    var fileDiffId = FlowRouter.getParam('diff1');
    var fileDiffId2 = FlowRouter.getParam('diff2');
    var diff1 = DiffTracker.findOne({_id: fileDiffId});
    var diff2 = DiffTracker.findOne({_id: fileDiffId2});
    console.log(diff1.source, diff2.source);
    diffUsingJS(diff1.source, diff2.source);
  }
});

function diffUsingJS(diff1, diff2) {
  // get the baseText and newText values from the two textboxes, and split them into lines
  var base = difflib.stringAsLines(diff1);
  var newtxt = difflib.stringAsLines(diff2);

  // create a SequenceMatcher instance that diffs the two sets of lines
  var sm = new difflib.SequenceMatcher(base, newtxt);

  // get the opcodes from the SequenceMatcher instance
  // opcodes is a list of 3-tuples describing what changes should be made to the base text
  // in order to yield the new text
  var opcodes = sm.get_opcodes();
  var diffoutputdiv = document.getElementById("diffoutput");
  while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
  var contextSize = $("contextSize").value;
  contextSize = contextSize ? contextSize : null;

  // build the diff view and add it to the current DOM
  diffoutputdiv.appendChild(diffview.buildView({
    baseTextLines: base,
    newTextLines: newtxt,
    opcodes: opcodes,
    // set the display titles for each resource
    baseTextName: "Base Text",
    newTextName: "New Text",
    contextSize: contextSize,
    viewType: $("inline").checked ? 1 : 0
  }));

  // scroll down to the diff view window.
  location = url + "#diff";
}