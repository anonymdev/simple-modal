// could have used classList instead of className but it's still not
// compatible with IE (except for 11, which has limitations)
// also, this is more generalized (in real scenario, we only have
// 'active' class or no class at all).

// hides one element and displays the other one
function showTheOtherContent(elementToShow, elementToHide) {
  elementToHide.style.display = "none";
  elementToShow.style.display = "inherit";
}

// check if an element has a specific class
function checkForClass(element, cName) {
  return element.className.split(" ").indexOf(cName) >= 0;
}

// adds a class to an element and shows it's content, hiding the active one
function addClass(element, elementToShow, elementToHide, cName) {
  showTheOtherContent(elementToShow, elementToHide);
  element.className += " active";
}

// removes a class from an element
function removeClass(element, cName) {
  var currentClassNames = element.className.split(" ");

  currentClassNames.splice(currentClassNames.indexOf(cName), 1);

  element.className = currentClassNames.join(" ");
}

// switches the active tab
function switchClasses(element1, element2, elementToShow, elementToHide, cName) {
  checkForClass(element1, cName) && removeClass(element1, cName);
  !checkForClass(element2, cName) && addClass(element2, elementToShow, elementToHide, cName);
}

function activateSwitchTabsListeners() {
  var firstTab = document.getElementById("firstTab");
  var secondTab = document.getElementById("secondTab");
  var firstTabContent = document.getElementById("firstTabContent");
  var secondTabContent = document.getElementById("secondTabContent");

  firstTab.onclick = switchClasses.bind(null, secondTab, firstTab,
    firstTabContent, secondTabContent, "active");
  secondTab.onclick = switchClasses.bind(null, firstTab, secondTab,
    secondTabContent, firstTabContent,  "active");
}
