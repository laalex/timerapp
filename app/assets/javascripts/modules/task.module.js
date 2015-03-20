/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description: Task Module
 */
var TaskModule = (function (module) {

  // Private members
  var _countersQueue = [];

  var _startCounter = function(id, duration){
    var _task = _.where(_countersQueue, {id: id});
    if(_task.length > 0) return false;
    var _counterObject = {
      id: id,
      duration: duration,
      interval: window.setInterval(function(){
        // Decrease duration with 1 each second
        --_counterObject.duration;
        // Check if duration is eq to 0 or below
        if(_counterObject.duration <= 0){
          // Remove this interval
          window.clearInterval(_counterObject.interval);
        }
        // Update interface and update database
        _pushDuration(id, _counterObject.duration);
        UI.updateTaskCount(id, _counterObject.duration, _getFormattedDuration(_counterObject.duration));
      },1000)
    };
    _countersQueue.push(_counterObject);
  };

  var _stopCounter = function(id){
    var _task = _.where(_countersQueue, {id: id});
    // Check if task exists
    if(!_task || undefined === _task){
      console.log("Error: task with id " + id + "was not found in the queue");
      return false;
    }
    // Clear the interval
    window.clearInterval(_task[0].interval);
    // remove the task from queue
    _countersQueue = _.filter(_countersQueue, _task);

  };


  var _pushDuration = function(id, duration){
    $.ajax({
      type: "PUT",
      url: "/tasks/duration/" + id,
      data: {duration: duration},
      success: function(data) {if(data.status == "failed") console.log(data.message); }
    });
  };

  var _getFormattedDuration = function(totalSeconds){
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    var result = (hours < 10 ? "0" + hours : hours);
    result += " hr " + (minutes < 10 ? "0" + minutes : minutes);
    result += " min " + (seconds  < 10 ? "0" + seconds : seconds);
    result += " sec";
    return result;
  }

  var _init = function(){
    console.log("Tasks module loaded");
  };

  // Public members
  module.init = function(){_init();};

  module.startCounter = function(id, duration){
  _startCounter(id, duration);
  }

  module.stopCounter = function(id){
    _stopCounter(id);
  }


  return module;
})(TaskModule || {});