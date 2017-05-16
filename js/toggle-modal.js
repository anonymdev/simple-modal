var modal = document.getElementById('modal');
var openModal = document.getElementById("openModal");
var closeModal = document.getElementsByClassName("closeModal")[0];

openModal.onclick = function() {
  modal.style.display = "block";
  activateSwitchTabsListeners();
}
closeModal.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
