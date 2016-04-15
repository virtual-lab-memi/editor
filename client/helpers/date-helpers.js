Template.registerHelper( 'humanDate', function( timestamp ) {
  if ( timestamp ) {
    return moment( timestamp ).format( "MMMM Do, YYYY" );
  }
});

Template.registerHelper("humanDateTime", function(date) {
  return moment(date).format('DD-MM-YY HH:mm:ss');
});