/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description: UI Module
 */
var UI  = (function (module) {
  // Private members
  var _init = function(){
    console.log("UIModule inited;");
    _attachEventListenrs();
  };

  // Attach event listeners
  var _attachEventListenrs = function(){
    // Show the create task form
    $("#showCreationForm").on("click", function(){
      $("#taskCreationForm" ).show();
    });
    // Hide the create task form
    $("#hideCreationForm" ).on("click", function(){
      $("#taskCreationForm" ).hide();
    });

    // Submit the createTaskForm
    var _form = $("#taskCreationForm" ).first("form");
    $(_form ).on("submit", function(){
      var _this = this;
      // Collect the form data and perform validation
      var formData = {
        name: $("#taskName" ).val(),
        hh: $("#taskHours" ).val(),
        mm: $("#taskMinutes" ).val(),
        ss: $("#taskSeconds" ).val(),
        description: $("#taskNote" ).val()
      };
      if(performTaskValidation(formData)){
        // Create task
        createTask(formData);
      } else {
       // Show error message
       alert("Please complete all the fields with valid information");
       return false; // Return false to prevent form
      }
      // Prevent default event
      return false;
    });

    // Remove a task from the page
    $( document ).on("click", ".deleteTask", function(){
      var _taskId = $(this ).data('id');
      $.ajax({
        url: '/tasks/ ' + _taskId,
        type: "DELETE",
        success: function(data){
          // Remove the element from the page
          if(data.status == "success"){
            $( ".taskEntry[data-id='" +_taskId+ "']" ).remove();
          } else {
            // Alert what's wrong
            alert(data.message);
          }
        },
        error: function(){
          alert("Server error. Please try again");
        }
      });
    });

    $( document ).on("click", "a.startCounter", function(){
      var _id = $( this ).data('id');
      var _duration = parseInt($( this ).attr('data-duration'));
      // Start counting for this one
      TaskModule.startCounter(_id, _duration);
    });

    $( document ).on("click", "a.stopCounter", function(){
      var _id = $( this ).data('id');
      // Stop counting for this one
      TaskModule.stopCounter(_id);
    });
  };

  var createTask = function(formData){
    $.ajax({
      type: "POST",
      url: '/tasks',
      data: formData,
      success: function(data){
        if(data.status == "success"){
          // Append the task to the template
          appendTask(data.task, data.formatted_duration);
        } else {
          alert("There were errors creating your task. Please try again");
          console.log(data.errors);
        }
      },
      error: function(){
        alert("Server error. Please try again");
      }
    });
  };

  var appendTask = function(task, formatted_duration){
    task.formatted_duration = formatted_duration; // Append the formatted duration to the task item
    // Append it to the task list
    RenderModule.appendHTML("#tasksList", "task", task);
  };

  var performTaskValidation = function(formData){
    // Start an empty object for errors
    var valid = true;
    // Perform validations
    if(formData.name == "") valid = false;
    if(formData.description == "") valid = false;
    if(formData.hh < 0 || formData.hh == "") valid = false;
    if(formData.mm < 0 || formData.mm > 60 || formData.mm == "") valid = false;
    if(formData.ss < 0 || formData.ss > 60 || formData.ss == "") valid = false;
    // Return true or false
    return valid;
  };

  var _updateTaskCount = function(id, duration, formatted){
    $("span.taskCountdown[data-id='" + id +  "']").html(formatted);
    $("a.startCounter[data-id='" + id + "']").attr("data-duration", duration);
  }

  // Popups UI
  var _popups = {
    showPopup: function(wrapper, title, message, actions){
      // Show a popup in a wrapper with a title, message and optional actions buttons
    },

    hidePopups: function(){
      $(".popup" ).hide();
    }
  };


  // Public members
  module.init = function(){
    _init();
  };

  module.updateTaskCount = function(id, duration){
    _updateTaskCountInterface(id, duration);
  };

  module.performTaskvalidation = function(formData){
    return performTaskValidation(formData);
  };

  module.updateTaskCount = function(id, duration, formatted){
    _updateTaskCount(id, duration, formatted);
  }

  // Popup UI object
  module.popup = _popups;

  return module;
})(UI || {});