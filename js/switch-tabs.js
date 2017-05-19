// hides one element and displays the other one
function showTheOtherContent(elementToShow, elementToHide) {
  elementToHide.style.display = "none";
  elementToShow.style.display = "inherit";
}

// check if any element from the tab has an error class attached.
function tabContainsErrors(tabContent) {
  const hasErrorFields = tabContent.querySelectorAll(".has-error").length > 0;
  const isRequiredFields = tabContent.querySelectorAll(".is-required").length > 0;

  return (hasErrorFields && isRequiredFields);
}

// check if any element from the tab is in an initial-state.
// initial-state is a class that will be removed from a field at
// the first blur. This function adds the error classes to all the
// fields that are in an initial state (empty value).
function tabIsInInitialState(tabContent) {
  const initialStateFields = tabContent.querySelectorAll(".is-initial");
  const isInitialState = initialStateFields.length > 0;

  for (let i = 0; i < initialStateFields.length; i++) {
    addContainerErrors(initialStateFields[i].parentElement.children);
  }

  return isInitialState;
}

// switches the active tab
function switchClasses(element1, element2, elementToShow, elementToHide, cName) {
  var invalid = tabContainsErrors(elementToHide);
  var initial = tabIsInInitialState(elementToHide);

  if (!invalid && !initial) {
    removeClass(element1, cName);
    addClass(element2, cName);
    showTheOtherContent(elementToShow, elementToHide);
  }
}

function activateSwitchTabsListeners() {
  var firstTab = document.getElementById("firstTab");
  var secondTab = document.getElementById("secondTab");
  var firstTabContent = document.getElementById("firstTabContent");
  var secondTabContent = document.getElementById("secondTabContent");

  firstTab.addEventListener('click', switchClasses.bind(null, secondTab, firstTab,
    firstTabContent, secondTabContent, "active"));
  secondTab.addEventListener('click', switchClasses.bind(null, firstTab, secondTab,
    secondTabContent, firstTabContent,  "active"));
}
