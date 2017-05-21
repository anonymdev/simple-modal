// hides one element and displays the other one
function showTheOtherContent(elementToShow, elementToHide) {
  addClass(elementToHide, 'hide');
  removeClass(elementToShow, 'hide');
}

// check if any element from the tab has an error class attached.
function tabContainsErrors(tabContent) {
  var hasErrorFields = tabContent.querySelectorAll(".has-error").length > 0;
  var isRequiredFields = tabContent.querySelectorAll(".is-required").length > 0;

  return (hasErrorFields && isRequiredFields);
}

// check if any element from the tab is in an initial-state.
// initial-state is a class that will be removed from a field at
// the first blur. This function adds the error classes to all the
// fields that are in an initial state (empty value) if shouldValidate is true.
function tabIsInInitialState(tabContent, shouldValidate) {
  var initialStateFields = tabContent.querySelectorAll(".is-initial");
  var isInitialState = initialStateFields.length > 0;

  if (shouldValidate) {
    for (var i = 0; i < initialStateFields.length; i++) {
      addContainerErrors(initialStateFields[i].parentElement.children);
    }
  }

  return isInitialState;
}

// switches the active tab if the content is valid (when the new tab index is the first
// after the current active tab index) and switches it anyway (when the new index is less
// than the current one).
// I've made this generalized, for however many tabs there can be.
// If you're on the last tab, it adds the save and cancel buttons.
// It also shows previous(except for first tab)/next(except for last tab) buttons.
function switchClasses(newLink, elementToShow, newIndex, lastIndex, nextBtn, previousBtn) {
  var currentLink = document.querySelector(".tab-link.active");
  var elementToHide = document.querySelector(".tab-fields:not(.hide)");
  var currentIndex = getTabIndex(currentLink.id)
  var shouldValidate = (newIndex - currentIndex === 1);
  var invalid = tabContainsErrors(elementToHide);
  var initial = tabIsInInitialState(elementToHide, shouldValidate);

  if ((newIndex < currentIndex) || (shouldValidate && !invalid && !initial)) {
    var saveButton = document.getElementById("save");
    var cancelButton = document.getElementById("cancel");

    removeClass(currentLink, "active");
    addClass(newLink, "active");
    showTheOtherContent(elementToShow, elementToHide);
    if (newIndex === lastIndex) {
      removeClass(cancelButton, 'hide');
      removeClass(saveButton, 'hide');
      addClass(next, 'hide');
    } else {
      addClass(saveButton, 'hide');
      addClass(cancelButton, 'hide');
      removeClass(next, 'hide');
    }
    (newIndex == 1) ? addClass(previous, 'hide') : removeClass(previous, 'hide');
  }
}

// get the index from the id field (which is <something>#<index>)
function getTabIndex(id) {
  return id.split("#")[1];
}

// gets the desired tab content based on the pressed tab link index.
function getClickedTabContent(tab) {
  return document.getElementById("tab-field#"+getTabIndex(tab.id));
}

// triggers the next field or the previous one based on the
// 'next' parameter, which is a boolean showing if the next button
// is pressed(true), or previous(false).
function triggerTab(next, last) {
  var currentLink = document.querySelector(".tab-link.active");
  var currentIndex = getTabIndex(currentLink.id)*1;

  if (next && (currentIndex !== last*1)) {
    document.getElementById('tab-link#'+(currentIndex+1)).click();
  }
  else if (!next && (currentIndex*1 !== 1)) {
    document.getElementById('tab-link#'+(currentIndex-1)).click();
  }
}

// reset the modal completely if this tab is valid
function save() {
  var tabContent = document.querySelector(".tab-fields.last");
  var allTabs = document.querySelector(".tab-content").children;
  var invalid = tabContainsErrors(tabContent);
  var initial = tabIsInInitialState(tabContent, true);

  if (!initial && !invalid) {
    clearModal(allTabs, true, true);
  }
}

// you can either reset the modal or just close it.
// I chose to reset it whithout validating this tab.
function cancel() {
  var tabContent = document.querySelector(".tab-fields.last");
  var allTabs = document.querySelector(".tab-content").children;

  clearModal(allTabs, false, true);
}

function activateSwitchTabsListeners() {
  var tabs = document.querySelectorAll(".tab-link");
  var lastIndex = getTabIndex(document.querySelector(".tab-fields.last").id);
  var next = document.getElementById("next");
  var previous = document.getElementById("previous");
  var saveButton = document.getElementById("save");
  var cancelButton = document.getElementById("cancel");

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', switchClasses.bind(
      null, tabs[i], getClickedTabContent(tabs[i]),
      getTabIndex(tabs[i].id), lastIndex, next, previous
    ))
  }
  next.addEventListener('click', triggerTab.bind(null, true, lastIndex));
  previous.addEventListener('click', triggerTab.bind(null, false, lastIndex));
  saveButton.addEventListener('click', save);
  cancelButton.addEventListener('click', cancel);
}
