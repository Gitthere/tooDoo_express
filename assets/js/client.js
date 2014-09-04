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

        //***** add vars for small 5 and 6 divs then new var to parent .row to append all 3
        var newDivForTaskInfo = $('<div/>').addClass('row');
        var divForCheckbox = $('<div/>').addClass('small-1 columns');
        var newFormForCheckbox = $('<form/>', {
          class: 'submitForm id',
          //find out why action not able to get actual id
          action: '/tasks/completed/' + task._id,
          method: 'POST',
          enctype: 'application/x-www-form-urlencoded'
        });
        var newInputCheckbox = $('<input/>', {
          name: 'task',
          id: task._id,
          type: 'checkbox',
          class: 'checkbox' 
        });
        var newLabel = $('<label/>').addClass('label');
        var newLabelForICheckbox = $('<i/>').addClass('fa fa-2x fa-check-square-o');
        var newDivForTitle = $('<div/>').addClass('small-5 columns titleToShowTask');
        var newAForTitle = $('<a/>', {
          // why /tasks/task._id not able to work?
          href: task._id
        });
        var newSpan = $('<span/>').addClass('title');

        //hidden row for note
        var newHiddenNote = $('<div/>', {
          class: 'row hiddenNote',
          style: 'display: none'
        });
        var newHiddenNoteColumn = $('<div/>').addClass('small-5 columns small-offset-1');
        var newSpanNotes = $('<span/>').addClass('notes');
        
        var newDivForEditDelete = $('<div/>').addClass('small-6 columns');
        //add edit button to div
        var aElement = $('<a>', {
          // why /tasks/#{task._id}/edit not able to work?
          href: '/tasks/' + task._id + '/edit'
        });
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
          class: 'deleteForm',
          action: '/tasks/' + task._id + '?_method=DELETE',
          method: 'POST',
          enctype: 'application/x-www-form-urlencoded'
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
        newFormForCheckbox.append(newLabel);
        newLabel.append(newLabelForICheckbox);
        //create a append to li
        newFormForCheckbox.append(newInputCheckbox);
        newDivForTaskInfo.append(divForCheckbox).append(newDivForTitle).append(newDivForEditDelete);
        newLi.append(newDivForTaskInfo);
        divForCheckbox.append(newFormForCheckbox);
        newDivForTitle.append(newAForTitle);
        //create span append to a
        newAForTitle.append(newSpan.text(task.title));
        newHiddenNoteColumn.append(newSpanNotes.text(task.notes));
        newHiddenNote.append(newHiddenNoteColumn);
        newLi.append(newHiddenNote);
        //create span.notes append to li
        // newLi.append(newSpanNotes.text(task.notes));
        //append edit and delete buttons to div
        // newDivForEditDelete.append(aElement);
        // newDivForEditDelete.append(deleteform);
        // //create a append to li
        newDivForTaskInfo.append(aElement);
        //create form append to li
        newDivForTaskInfo.append(deleteform);

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

  $('.sortable').on('click', '.titleToShowTask', function(event) {
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
