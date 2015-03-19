/**
 * @author: Lamba Alexandru
 * @contact: contact@alexandrulamba.com
 * @version: 1.0
 * @description:  Render module based on mustache
 */
var RenderModule = (function (module) {
  //
  // Private methods
  //

  var _renderTemplate = function(wrapper, template, data){
    // Get the HTML template
    $.ajax({
      url: "/mustache/template/{0}".format(template),
      type: "GET",
      success: function(_serverResponse){
        var _template = _serverResponse;
        // Prepare the rendered HTML
        var _renderedHTML = Mustache.render(_template, data);
        // Attach the HTML to the wrapper
        $(wrapper).html(_renderedHTML);
      }
    });
  };

  var _appendTemplate = function(wrapper, template, data){
    console.log(data);
    // Get the HTML template
    $.ajax({
      url: "/mustache/template/{0}".format(template),
      type: "GET",
      success: function(_serverResponse){
        var _template = _serverResponse;
        console.log(_template);
        console.log(data);
        // Prepare the rendered HTML
        var _renderedHTML = Mustache.render(_template, data);
        // Append HTML
        $(wrapper ).append(_renderedHTML);
      }
    });
  };


  //
  // Public methods
  //
  module.render = function(wrapper, template, data){
    _renderTemplate(wrapper, template, data);
  }

  module.appendHTML = function(wrapper, template, data){
    return _appendTemplate(wrapper, template, data);
  }

  //
  // Return module
  //
  return module;
})(RenderModule || {});