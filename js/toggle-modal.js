var modal = document.getElementById('modal');
var openModal = document.getElementById("openModal");
var closeModal = document.getElementsByClassName("closeModal")[0];

openModal.addEventListener('click', function() {
  removeClass(modal, "hide");
  // this class is used in order to avoid starting listeners every time this button
  // is pressed this will make it so that the listeners are activated only once.
  if (checkForClass(this, 'not-pressed-once')) {
    activateSwitchTabsListeners();
    activateFieldsValidation();
    removeClass(this, 'not-pressed-once');
  }
});

closeModal.addEventListener('click', addClass.bind(null, modal, "hide"));
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    addClass(modal, "hide")
  }
});
