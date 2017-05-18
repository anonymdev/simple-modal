// function that loads scripts by appending to the <head>
// (I use it for modularity and because this can dynamically load js)
function loadScript(src, f) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  var done = false;

  script.src = src;
  script.onload = script.onreadystatechange = function() {
    // attach to both events for cross browser finish detection:
    if ( !done && (!this.readyState ||
      this.readyState == "loaded" || this.readyState == "complete")) {

      done = true;

      if (typeof f == 'function') f();
      // cleans up a little memory:
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function() {
  // dynamically load dependent scripts
  loadScript('../js/toggle-modal.js', function() {
    loadScript('../js/modules.js', function() {
      loadScript('../js/switch-tabs.js');
      loadScript('../js/validate-fields.js');
    });
  });
});
