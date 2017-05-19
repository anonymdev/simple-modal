// This file is for common functions between js files.
// Note: could have used classList instead of className but it's still not
// compatible with IE < 10, and for 10+ it only offers basic support
// (https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility)

// check if an element has a specific class
function checkForClass(element, cName) {
  return element.className.split(" ").indexOf(cName) >= 0;
}

// adds a class to an element and shows it's content, hiding the active one
function addClass(element, cName) {
  !checkForClass(element, cName) && (element.className += " " + cName);
}

// removes a class from an element
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

  addClass(asterix, 'is-required');
  addClass(elements[1], 'has-error');

  for (let i = 2; i < elements.length; i++) {
    var index = errorMessageIndex || 0;

    index += 2;
    (i === index) ? addClass(elements[i], 'is-required') : removeClass(elements[i], 'is-required');
  }
}

// function that removes error classes from specific elements
function removeContainerErrors(elements) {
  var asterix = elements[0].querySelectorAll(".star")[0];

  removeClass(asterix, 'is-required');
  removeClass(elements[1], 'has-error');

  for (let i = 2; i < elements.length; i++) {
    removeClass(elements[i], 'is-required');
  }
}
