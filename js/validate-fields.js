// set car brand logo on change, if it has value,
// set the picture, else, set the 1x1 gif
function setBrandSrc() {
  var brand = this.value;
  var logo = document.getElementById('brandLogo');

  if (!!brand) {
    logo.src = "../img/brands/" + brand + "-logo.png";
    addClass(this, 'mt-5');
    // get the first child of the first child of the parent (hacky, but gets
    // the right span to align with the logo).
    addClass(this.parentElement.children[0].children[0], 'alignWithPicture')
  } else {
    logo.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
    removeClass(this, 'mt-5');
    removeClass(this.parentElement.children[0].children[0], 'alignWithPicture')
  }
}

// returns CSS code of color or an empty string if it is not valid
function getColorCSS(color) {
  var elem = document.createElement("div");

  elem.style.color = color;

  return elem.style.color.split(/\s+/).join('').toLowerCase();
}

// checks if the color is invalid and adds errors to container or
// changes the background color of the color box to the selected color
function changeColor() {
  var color = getColorCSS(this.value);
  var colorBox = document.getElementById("colorBox");

  if (!!color) {
    colorBox.style.backgroundColor = color;
    removeContainerErrors(this.parentElement.children);
    addClass(colorBox, 'show');
  }
  else {
    addContainerErrors(this.parentElement.children, 1);
    removeClass(colorBox, 'show');
  }
}

// checks if a field is a number
function checkNumber() {
  if (isNaN(this.value)) {
    addContainerErrors(this.parentElement.children, 1);
    return false;
  }
  removeContainerErrors(this.parentElement.children);
  return true;
}

// checks if a field is a valid car year (between the first
// car that was ever made in 1908 and current year).
function checkYear() {
  if (!checkNumber.bind(this)() || ((this.value*1) > new Date().getFullYear()) ||
    (this.value*1) < 1908) {
    addContainerErrors(this.parentElement.children, 1);
  } else {
    removeContainerErrors(this.parentElement.children);
  }
}

// function that adds errors if fields are empty on blur
function blurEvent() {
  !this.value && addContainerErrors(this.parentElement.children);
  removeClass(this, "is-initial");
}

// function that clears the errors on focus
function focusEvent() {
  removeContainerErrors(this.parentElement.children);
}

// if the value of a select field is "yes",
// make another dependent appear and become required
// also, when the value isn't yes, make it dissapear,
// optional, and remove all the error classes.
function showAndRequireField(field) {
  if (this.value === "yes") {
    removeClass(field.parentElement, "hide");
    addClass(field, "is-initial");
    removeClass(field, "optional");
    // start listeners only once
    if (checkForClass(field, "listeners-not-started")){
      field.addEventListener('blur', blurEvent);
      field.addEventListener('focus', focusEvent);

      removeClass(field, "listeners-not-started");
    }
  } else {
    addClass(field.parentElement, "hide");
    removeClass(field, "is-initial");
    addClass(field, "optional");
    // You may or may not want to empty the value when changing selection
    field.value = "";
    removeContainerErrors(field.parentElement.children);
  }
}

function activateFieldsValidation() {
  var allValues = document.querySelectorAll(".value:not(.optional)");
  var brand = document.getElementById("brand");
  var color = document.getElementById("color");
  var mileage = document.getElementById("mileage");
  var vehicleDamaged = document.getElementById("vehicleDamaged");
  var details = document.getElementById("details");
  var price = document.getElementById("price");
  var manufacturingYear = document.getElementById("manufacturingYear");

  for (var i = 0; i < allValues.length; i++) {
    allValues[i].addEventListener('blur', blurEvent);
    allValues[i].addEventListener('focus', focusEvent);
  }
  brand.addEventListener('change', setBrandSrc);
  color.addEventListener('keyup',  changeColor);
  mileage.addEventListener('keyup',  checkNumber);
  price.addEventListener('keyup',  checkNumber);
  vehicleDamaged.addEventListener('change', showAndRequireField.bind(vehicleDamaged, details));
  manufacturingYear.addEventListener('keyup',  checkYear);
}
