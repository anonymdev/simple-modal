<h2> Description </h2>
This is a simple html modal with css and javascript and no other frameworks/libraries.
I've tried to make it as modular and generalized as possible, so it would be easy to use
it for larger purposes (or to implement new functionalities). You can declare as many modals as you want as long as you respect the principles.

I've also focused on implementing a code that will work on as many browsers as possible, with
a responsive layout as well (both css and js are cross-browser -> tested on IE11, Safari, Chrome,
Edge).

The implementation requirements were:

```
Please take into consideration the following points:

You have to use HTML, CSS, JavaScript only to implement the modal window
DON'T use preprocessors, libraries or frameworks (SASS, LESS, underscore, lodash, ramda, jQuery, Angular, React, Vue etc)
DON'T use HTML5 form elements and validations
You should work cross-browser in modern browsers and IE11

```

<h2>Usage:</h2>

To declare a button that opens the modal, set it like this:
```html
<button class="styled-button not-pressed-once" id="openModal#1">
  Add Car
</button>
```
Note: The number of the id should be the same as the number for the modal id that you want it to open (see bellow). Also, the "not-presed once" class is
used to start the listeners only once when you open the modal for the first time.

To declare a modal, you have to set it's id like this:
```html
<div id="modal#1" class="modal hide center">
<!-- ... -->
```
Note: it is very important to have the number of the modal. Also,
you have to add the "last" class in case you are at the last modal and the index should be the greatest (e.g. if you have to modals, the modal#2 should have "last" class.

To declare a tab, you have to put a link to it, e.g. :
```html
<div class="modal-body">
  <ul>
    <li>
      <a id="tab-link#1#modal1" class="tab-link active" href="javascript:void(0)">
        First tab
      </a>
    </li>
    <!-- ... -->
  </ul>
  <!-- ... -->
</div>
<!-- ... -->
```
Note: ```id="tab-link#1#modal1"```. For each tab, you have to increment the id ! And for each modal you have to increment the modal id !

After that, you have to declare a div with ```id="tab-content"``` and inside of it you declare all
of the corresponding fields for links, e.g. :

```html
<div class="tab-content">
  <div id="tab-field#1modal1" class="tab-fields">
    <form>
      <div class="field-container">
        <span class="label"> label for field<span class="star">*</span> </span>
        <input class="value is-initial" type="text" id="labelForField">
        <span class="error-message"> label for field is required </span>
        <!-- More error messages can go here -->
      </div>
      <!-- ... -->
    </form>
  </div>
</div>
```
Note: As you can see, you have to set the same id as the link that it coresponds to.

Every classes are supposed to be used, except for the "is-initial" which is only
for the required fields that you want to validate on tab change (or submit). Also,
if you don't want validation at all for a field, you can remove the
```<span class="error-message"> ...message... </span>``` and add the class "optional"
to the input (be sure you remove the "is-initial" class and also the "star" span).
An optional field should look like this:

```html
<div class="field-container">
  <span class="label"> label for field </span>
  <input class="value optional" type="text" id="labelForField">
</div>
```

There are multiple types of validation. You can add as many "error-message" spans,
but leave the required one first because it's the default behavior to show it.
As you can see in the js/utilities.js file, there is a function that adds error classes
to a given container and displays an error message based on the index of it in html
(starting from 0 being the first one, which is by default "required").

```javascript
// function that adds error classes to specific elements
// elements[0] is the .label class,
// elements[1] is the .value class,
// elements[2..n] are the .error-message class elements
// if there are multiple error-message spans, errorMessageIndex
// will represent the index of the message to be displayed
// (defaults to 0, the 'required' message)
function addContainerErrors(elements, errorMessageIndex) {
  var asterix = elements[0].querySelectorAll(".star")[0];

  asterix && addClass(asterix, 'is-required');
  addClass(elements[1], 'has-error');

  for (var i = 2; i < elements.length; i++) {
    var index = errorMessageIndex || 0;

    index += 2;
    (i === index) ? addClass(elements[i], 'is-required') : removeClass(elements[i], 'is-required');
  }
}
```

<h2> Tab Logic </h2>
The logic for tab switching which I used, is implemented by this scenario:

You can navigate by pressing the tab links or the next/previous buttons. If you close the modal (by clicking
the X button or anywhere outside the modal), the state will be kept, so you won't lose what you've written.
When you click "save", the state will be cleaned and the modal closed and when you click "cancel" the last
tab will not be validated and the modal(state) will be cleaned. You can easily change this logic if you
want, for example, to delete the state everytime the modal is closed (but I thought it would be annoying to
lose the data you've written if you click by accident on X or outside the modal).

a. If you want to go from tab 1 to tab 2 (or any == 1 positive difference), it will check for errors in the
respective form, and also for empty inputs that were never focused/blured and add the
required errors if they do not have the "optional" class and have the "is-initial" class.

b. If you want to go from tab 2 to tab 1 (or any >= 1 negative difference), you will be allowed to go even if you
have errors because the submit button is always on the last tab, so you should always be able to see previous tabs.

c. If you want to go from tab 1 to tab 3 (or any >= 2 positive difference), you won't be allowed to go there,
and nothing will happen (not even validation).

<h2> Q&A </h2>

For any questions that you might have, you can create an issue and I will try to respond as soon as posbile.
Also, you can check the source because almost every function is documented.

If you want to implement a custom validation, you can watch my example (I implemented validation for numbers
(even custom - between 1908 and 2017), colors (validate if a color (code, hex or string) is valid and also show a box near the label with the color as background), even a select which adds a photo depending on the selected
value next to the label and also a dependent field appearing when a select has the value "yes", becoming
required from optional).
