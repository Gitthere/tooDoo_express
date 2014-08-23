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

  $('#newTaskForm').submit(function(event) {
    event.preventDefault();
    console.log('submit?');
    console.log('newTaskForm; ', $('#newTaskForm').serialize());
    $.ajax("/tasks", {
      method: "POST", 
      data: $('#newTaskForm').serialize(),
      success: function(task) {
        console.log(task);
        var newTaskTitle = task.title;
        var newTaskNotes = task.notes;
        var newTask = newTaskTitle + newTaskNotes;
        $('.sortable').append(newTask);
      },
      failure: function(error) {
      }
    });
  });

  // //remove task when dragged outside of div
  // $( '.draggable').draggable();
  // $( '.droppable').droppable({
  //   drop: function(event,ui) {
  //     $( this )
  //       .remove( 'draggable');
  //   }
  // })
});


