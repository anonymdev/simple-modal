// This file is for common functions between js files.
// Note: could have used classList instead of className but it's still not
// compatible with IE (except for 11, which has limitations)

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
