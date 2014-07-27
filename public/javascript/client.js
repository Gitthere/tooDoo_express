//allows clickbox to highlight and line-through task
$( document ).ready(function() {

  $('.checkbox').click(function() {
    $(this).parent().submit()
  });
  var incompleteTask = $('.incomplete');
  $('#taskCounter').html(incompleteTask.length + ' tasks remaining');
});


