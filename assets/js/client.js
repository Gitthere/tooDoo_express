//allows clickbox to highlight and line-through task
$( document ).ready(function() {

  $('.sortable').on('click', '.checkbox', function() {
    $(this).parent().submit();
    
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
        var newLi = $('<li>').addClass('taskList incomplete ui-sortable-handle');
        var newForm = $('<form/>').addClass('submitForm id');
        var newInputCheckbox = $('<input/>', {
          name: 'task',
          type: 'checkbox',
          class: 'checkbox' 
        })
        var newLabel = $('<label/>');
        var newLabelForI = $('<i/>');
        //***** add vars for small 5 and 6 divs then new var to parent .row to append all 3
        var divForCheckbox = $('<div/>').addClass('small-1 columns');
        var newDivForTaskInfo = $('<div/>').addClass('row');
        var newDivForTitle = $('<div/>').addClass('small-5 columns titleToShowTask');
        var newAForTitle = $('<a/>');
        var newSpan = $('<span/>').addClass('title');
        var newSpanNotes = $('<span/>').addClass('notes');

        //add edit button
        var aElement = $('<a>');
        var iElement = $('<i>',{
          class: 'fa fa-2x fa-pencil-square'
        });
        var button = $('<button>', {
          class: 'edit',
          text: 'Edit'  
        });
        button.append(iElement);
        aElement.append(button);

        //add delete button
        var deleteform = $('<form>', {
          class: 'deleteForm'
        });
        var ifordeleteform = $('<i>', {
          class: 'fa fa-2x fa-bomb'
        });
        var deleteButton = $('<button>', {
          class: 'delete',
          text: 'Delete',
          type: 'submit'
        });
        deleteButton.append(ifordeleteform);
        deleteform.append(deleteButton);

        //create list element
        $('.sortable').append(newLi);
        //create form element and append to li
        // newLi.append(newForm);
        //create input.checkbox and append to form
        newForm.append(newInputCheckbox);
        newForm.append(newLabel);
        newLabel.append(newLabelForI);
        //create a append to li
        newLi.append(newDivForTaskInfo);
        newDivForTitle.append(newAForTitle);
        //create span append to a
        newAForTitle.append(newSpan.text(task.title));
        //create span.notes append to li
        newLi.append(newSpanNotes.text(task.notes));
        //create a append to li
        newLi.append(aElement);
        //create form append to li
        newLi.append(deleteform);

        console.log(newLi);

        updateCounter();
      },
      failure: function(error) {
      }
    });
    //clears input box after adding new task
    $('#newTaskForm')[0].reset();
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

  $('.titleToShowTask').on('click', function(event) {
    event.preventDefault();
    $(this).parent('.row').siblings('.hiddenNote').slideToggle();
  });

});

  //******** TO BE ADDED LATER ***********
  // //remove task when dragged outside of div
  // $( '.draggable').draggable();
  // $( '.droppable').droppable({
  //   drop: function(event,ui) {
  //     $( this )
  //       .remove( 'draggable');
  //   }
  // })
