//allows clickbox to highlight and line-through task
$( document ).ready(function() {

  $('.checkbox').click(function() {
    $(this).parent().submit()
  });
  function updateCounter() {
    var incompleteTask = $('.incomplete');
    $('#taskCounter').html(incompleteTask.length + ' tasks remaining'); 
    // console.log('update counter'); to see if counting
  };
  updateCounter();
  //allows changing order of tasks
  $( '.sortable' ).sortable();
  $( '.sortable' ).disableSelection();

  $('#newTaskForm').submit(function(event) {
    event.preventDefault();
    // console.log('submit?');
    // console.log('newTaskForm; ', $('#newTaskForm').serialize());
    $.ajax("/tasks", {
      method: "POST", 
      data: $('#newTaskForm').serialize(),
      success: function(task) {
        console.log(task);
        var newLi = $('<li/>').addClass('li incomplete');
        var newForm = $('<form/>').addClass('submitForm id');
        var newInputCheckbox = $('<input type="checkbox"/>').addClass('checkbox');
        var newAForTitle = $('<a/>');
        var newSpan = $('<span/>').addClass('title');
        var newSpanNotes = $('<span/>').addClass('notes');
        var newAForEdit = $('<a/>');
        var newEditButton = $('<button/>').attr('id', 'edit');
        var newDeleteForm = $('<form>', {
          action: '/tasks/' + task._id + '?_method=DELETE',
          class: 'deleteForm',
          enctype: 'application/x-www-form-urlencoded'
        });
          
        var newDeleteButton = $('<button>', {
          type: 'submit',
          class: 'delete'
        })
        //create list element
        $('.sortable').append(newLi);
        //create form element and append to li
        newLi.append(newForm);
        //create input.checkbox and append to form
        newForm.append(newInputCheckbox);
        //create a append to li
        newLi.append(newAForTitle);
        //create span append to a
        newAForTitle.append(newSpan.text(task.title));
        //create br append to li
        newLi.append('<br />');
        //create span.notes append to li
        newLi.append(newSpanNotes.text(task.notes));
        //create br append to li
        newLi.append('<br />');
        //create a append to li
        newLi.append(newAForEdit);
        //create edit button append to a
        newAForEdit.append(newEditButton.text('Edit'));
        //create form append to li
        newLi.append(newDeleteForm);
        //create delete button append to form
        newDeleteForm.append(newDeleteButton.text('Delete'));
        console.log(newLi);

        updateCounter();
        //clears input box after adding new task
        $('#newTaskForm')[0].reset();
      },
      failure: function(error) {
      }
    });
  });

  $('.sortable').on('submit', '.deleteForm', function(event) {
    var url = $(this).attr('action');
    var thisForm = $(this);
    event.preventDefault();
    $.ajax(url, {
      method: 'POST',
      success: function(data) {
        thisForm.closest('li').remove();
        updateCounter();
      },
      failure: function(error) {

      }
    });
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
