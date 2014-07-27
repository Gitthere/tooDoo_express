//allows clickbox to highlight and line-through task
$( document ).ready(function() {

  $('.checkbox').click(function() {
    $(this).parent().submit()
  });
  var l = $('li');
  console.log(l.length);
  $('#taskCounter').append(l.length);
});


