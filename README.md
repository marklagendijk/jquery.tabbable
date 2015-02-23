jQuery.tabbable
===============

Simple utility for selecting the next / previous 'tabbable' element. Includes and uses the ':tabbable' and ':focusable' selectors from jQuery UI Core.

### Demo
View the [jsFiddle demo](http://jsfiddle.net/Kgzzx/).

### Methods
jQuery.tabbable adds the following methods.
``` javascript
// Focuses the next ':tabable' element.
jQuery.tabNext();

// Focuses the previous ':tabable' element.
jQuery.tabPrev();

// Focuses the previous ':focusable' element. 
// Elements which have a tabindex of '-1' are 'focusable', but not 'tabbable'.
jQuery.focusNext();

// Focuses the previous ':focusable' element.
// Elements which have a tabindex of '-1' are 'focusable', but not 'tabbable'.
jQuery.focusPrev();
```

### Selectors
jQuery.tabbable adds following selectors (which come from jQuery UI Core):
``` javascript
// Select tabbable elements
$(':tabbable');

// Select focusable elements
$(':focusable');
```

## Installation
1. `bower install jQuery.tabbable --save` or `npm install jquery.tabbable --save`
2. Include `jquery.tabbable.min.js`
