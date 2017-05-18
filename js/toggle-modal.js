var modal = document.getElementById('modal');
var openModal = document.getElementById("openModal");
var closeModal = document.getElementsByClassName("closeModal")[0];

openModal.addEventListener('click', function() {
  modal.style.display = "block";
  activateSwitchTabsListeners();
  activateFieldsValidation();
});

closeModal.addEventListener('click', function() {
  modal.style.display = "none";
});
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
