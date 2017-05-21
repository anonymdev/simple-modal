// This file is for common functions between js files.
// Note: could have used classList instead of className but it's still not
// compatible with IE < 10, and for 10+ it only offers basic support
// (https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility)

// check if an element has a specific class
function checkForClass(element, cName) {
  return element.className.split(" ").indexOf(cName) >= 0;
}

// adds a class to an element if it doesn't exist
function addClass(element, cName) {
  !checkForClass(element, cName) && (element.className += " " + cName);
}

// removes a class from an element if it exists
function removeClass(element, cName) {
  if (checkForClass(element, cName)) {
    var currentClassNames = element.className.split(" ");

    currentClassNames.splice(currentClassNames.indexOf(cName), 1);
    element.className = currentClassNames.join(" ");
  }
}

// function that adds error classes to specific elements
// elements[0] is the .label class,
// elements[1] is the .value class,
// elements[2..n] are the .error-message class elements
// if there are multiple error-message spans, errorMessageIndex
// will represent the index of the message to be displayed
// (defaults to 0, the 'required' message)
function addContainerErrors(elements, errorMessageIndex) {
  var asterix = elements[0].querySelectorAll(".star")[0];

  asterix && addClass(asterix, 'is-required');
  addClass(elements[1], 'has-error');

  for (var i = 2; i < elements.length; i++) {
    var index = errorMessageIndex || 0;

    index += 2;
    (i === index) ? addClass(elements[i], 'is-required') : removeClass(elements[i], 'is-required');
  }
}

// function that removes error classes from specific elements
function removeContainerErrors(elements) {
  var asterix = elements[0].querySelectorAll(".star")[0];

  asterix && removeClass(asterix, 'is-required');
  removeClass(elements[1], 'has-error');

  for (var i = 2; i < elements.length; i++) {
    removeClass(elements[i], 'is-required');
  }
}

// function that removes errors and resets modal (on cancel and save)
function clearModal(tabs, isSaving) {
  for (var tab = 0; tab < tabs.length; tab++) {
    var childElements = tabs[tab].children[0].children;

    for (var i = 0 ; i < childElements.length; i ++) {
      var brand = document.getElementById("brand");
      var logo = document.getElementById("brandLogo");
      var details = document.getElementById('details');

      removeContainerErrors(childElements[i].children);
      childElements[i].children[1].value = "";
      // remove the color box
      removeClass(document.getElementById("colorBox"), "show");
      // make src of brand logo a 1x1 gif
      logo.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
      // reposition the brand label and input
      removeClass(brand, 'mt-5');
      removeClass(brand.parentElement.children[0].children[0], 'alignWithPicture');
      // clear the details field and hide it's container
      details.value = "";
      addClass(details.parentElement, "hide");

      // initialize again the fields for validation when they are empty and never blured
      addClass(childElements[i].children[1], "is-initial");
    }
  }
  document.getElementById('tab-link#1').click();
  addClass(document.getElementById('modal'), 'hide');
  isSaving ? alert("The data has been saved!") : alert("The modal has been reset")
}
