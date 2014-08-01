//allows clickbox to highlight and line-through task
$( document ).ready(function() {

  $('.checkbox').click(function() {
    $(this).parent().submit()
  });
  var incompleteTask = $('.incomplete');
  $('#taskCounter').html(incompleteTask.length + ' tasks remaining');


  //allows changing order of tasks
  $( '.sortable' ).sortable();
  $( '.sortable' ).disableSelection();

  // //remove task when dragged outside of div
  // $( '.draggable').draggable();
  // $( '.droppable').droppable({
  //   drop: function(event,ui) {
  //     $( this )
  //       .remove( 'draggable');
  //   }
  // })
});


