jQuery.tabbable
===============

Simple utility for selecting the next / previous 'tabbable' element. Includes and uses the ':tabbable' and ':focusable' selectors from jQuery UI Core.

Adds the following methods.
- 'jQuery.tabNext()': focuses the next ':tabable' element.
- 'jQuery.tabPrev()': focuses the previous ':tabable' element.
- 'jQuery.focusNext()': focuses the previous ':focusable' element. Elements which have a tabindex of '-1' are 'focusable', but not 'tabbable'.
- 'jQuery.focusPrev()': focuses the previous ':focusable' element.