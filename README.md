jQuery.tabbable
===============

Simple utility for selecting the next / previous 'tabbable' element. Includes and uses the ':tabbable' and ':focusable' selectors from jQuery UI Core.

Adds the following methods.
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
