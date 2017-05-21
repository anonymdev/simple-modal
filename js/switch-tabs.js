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
  var currentLink = this.querySelector(".tab-link.active");
  var elementToHide = this.querySelector(".tab-fields:not(.hide)");
  var currentIndex = getIndexFromId(currentLink.id)
  var shouldValidate = (newIndex - currentIndex === 1);
  var invalid = tabContainsErrors(elementToHide);
  var initial = tabIsInInitialState(elementToHide, shouldValidate);

  if ((newIndex < currentIndex) || (shouldValidate && !invalid && !initial)) {
    var saveButton = document.getElementById("save#"+getIndexFromId(this.id));
    var cancelButton = document.getElementById("cancel#"+getIndexFromId(this.id));

    removeClass(currentLink, "active");
    addClass(newLink, "active");
    showTheOtherContent(elementToShow, elementToHide);
    if (newIndex === lastIndex) {
      removeClass(cancelButton, 'hide');
      removeClass(saveButton, 'hide');
      addClass(nextBtn, 'hide');
    } else {
      addClass(saveButton, 'hide');
      addClass(cancelButton, 'hide');
      removeClass(nextBtn, 'hide');
    }
    (newIndex == 1) ? addClass(previousBtn, 'hide') : removeClass(previousBtn, 'hide');
  }
}

// gets the desired tab content based on the pressed tab link index.
function getClickedTabContent(modal, tab) {
  return document.getElementById("tab-field#"+getIndexFromId(tab.id)+"#modal"+getIndexFromId(modal.id));
}

// triggers the next field or the previous one based on the
// 'next' parameter, which is a boolean showing if the next button
// is pressed(true), or previous(false).
function triggerTab(next, last) {
  var currentLink = this.querySelector(".tab-link.active");
  var currentIndex = getIndexFromId(currentLink.id)*1;

  if (next && (currentIndex !== last*1)) {
    document.getElementById('tab-link#'+(currentIndex+1)+'#modal'+getIndexFromId(this.id)).click();
  }
  else if (!next && (currentIndex*1 !== 1)) {
    document.getElementById('tab-link#'+(currentIndex-1)+'#modal'+getIndexFromId(this.id)).click();
  }
}

// reset the modal completely if this tab is valid
function save() {
  var tabContent = this.querySelector(".tab-fields.last");
  var allTabs = this.querySelector(".tab-content").children;
  var invalid = tabContainsErrors(tabContent);
  var initial = tabIsInInitialState(tabContent, true);

  if (!initial && !invalid) {
    clearModal.call(this, allTabs, true, getIndexFromId(this.id)==1);
  }
}

// you can either reset the modal or just close it.
// I chose to reset it whithout validating this tab.
function cancel() {
  var tabContent = this.querySelector(".tab-fields.last");
  var allTabs = this.querySelector(".tab-content").children;

  clearModal.call(this, allTabs, false, getIndexFromId(this.id)==1);
}

function activateSwitchTabsListeners(currentModal) {
  var tabs = currentModal.querySelectorAll(".tab-link");
  var lastIndex = getIndexFromId(currentModal.querySelector(".tab-fields.last").id);
  var next = document.getElementById("next#" + getIndexFromId(currentModal.id));
  var previous = document.getElementById("previous#" + getIndexFromId(currentModal.id));
  var saveButton = document.getElementById("save#" + getIndexFromId(currentModal.id));
  var cancelButton = document.getElementById("cancel#" + getIndexFromId(currentModal.id));

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', switchClasses.bind(
      currentModal, tabs[i], getClickedTabContent(currentModal, tabs[i]),
      getIndexFromId(tabs[i].id), lastIndex, next, previous
    ))
  }
  next.addEventListener('click', triggerTab.bind(currentModal, true, lastIndex));
  previous.addEventListener('click', triggerTab.bind(currentModal, false, lastIndex));
  saveButton.addEventListener('click', save.bind(currentModal));
  cancelButton.addEventListener('click', cancel.bind(currentModal));
}
