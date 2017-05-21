var lastModalIndex = document.querySelector('.modal.last').id.split("#")[1];

// function that opens a modal with the index of the button presssed
function openTheModal() {
  var modal = document.getElementById('modal#'+this.id.split("#")[1]);

  removeClass(modal, "hide");
  // this class is used in order to avoid starting listeners every time this button
  // is pressed this will make it so that the listeners are activated only once.
  if (checkForClass(this, 'not-pressed-once')) {
    activateSwitchTabsListeners(modal);
    activateFieldsValidation(modal);
    removeClass(this, 'not-pressed-once');
  }
}

// function that closes a modal with the index of the button presssed
function closeTheModal() {
  var modal = document.getElementById('modal#'+this.id.split("#")[1]);

  addClass(modal, "hide");
}

// allow multiple modals by adding #i to their ids and "last" to the
// last modal class
for (var i = 1 ; i <= lastModalIndex; i++) {
  var openModal = document.getElementById("openModal#"+i);
  var closeModal = document.getElementById("closeModal#"+i);

  openModal.addEventListener('click', openTheModal);

  closeModal.addEventListener('click', closeTheModal);
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function(event) {
    var modal = document.querySelector('.modal:not(.hide)');
    if (event.target == modal) {
      closeTheModal.call(modal);
    }
  });
}

