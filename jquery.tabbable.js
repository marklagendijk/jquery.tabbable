/*!
 * jQuery.tabbable 1.0 - Simple utility for selecting the next / previous ':tabbable' element.
 * https://github.com/marklagendijk/jQuery.tabbable
 *
 * Includes ':tabbable' and ':focusable' selectors from jQuery UI Core
 *
 * Copyright 2013, Mark Lagendijk
 * Released under the MIT license
 *
 */
(function($){
	'use strict';

	var tabIndexes = [];
	var tabbables = [];

	/**
	 * Focusses the next :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
	 * Does not take into account that the taborder might be different as the :tabbable elements order
	 * (which happens when using tabindexes which are greater than 0).
	 */
	$.focusNext = function(){
		selectNextTabbableOrFocusable(':focusable');
	};

	/**
	 * Focusses the previous :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
	 * Does not take into account that the taborder might be different as the :tabbable elements order
	 * (which happens when using tabindexes which are greater than 0).
	 */
	$.focusPrev = function(){
		selectPrevTabbableOrFocusable(':focusable');
	};

	/**
	 * Focusses the next :tabable element.
	 * Does not take into account that the taborder might be different as the :tabbable elements order
	 * (which happens when using tabindexes which are greater than 0).
	 */
	$.tabNext = function(){
		selectNextTabbableOrFocusable(':tabbable');
	};

	/**
	 * Focusses the previous :tabbable element
	 * Does not take into account that the taborder might be different as the :tabbable elements order
	 * (which happens when using tabindexes which are greater than 0).
	 */
	$.tabPrev = function(){
		selectPrevTabbableOrFocusable(':tabbable');
	};

	/** 
	 * Disables tabbing to all tabbable elements. 
	 * options: 
	 *	container: Limit inside container, defaults to document.
	 *  exclude: Excludes elements inside container. Accepts an array of elements or jQuery selection.
	 *  key: Any acceptable array element key, used to create disabled tabbing groups. Defaults to true
	 *
	 * Returns: key
	 */
	$.disableTabbing = function(options) {
		var opts = options || {};
		opts.container = opts.container || document;
		opts.exclude = opts.exclude || [];
		opts.key = opts.key || true;

		tabIndexes[opts.key] = tabIndexes[opts.key] || [];

		tabbables[opts.key] = $(":tabbable",opts.container);
		if(opts.exclude && opts.exclude.length) {
			if(opts.exclude instanceof jQuery) {
				opts.exclude = opts.exclude.toArray();
			}
			tabbables[opts.key] = $(tabbables[opts.key]).not($(":tabbable", opts.exclude));
		}

		
		tabbables[opts.key].each(function() {
			tabIndexes[opts.key].push(this.tabIndex);
			this.tabIndex = -1;
		});
		return opts.key;
	}



	/** 
	 * Enables tabbing to all tabbable elements. 
	 *  optKey: Key returned from disableTabbing. Defaults to true
	 *
	 * Returns: Boolean if tabIndexes were changed.
	 */
	$.enableTabbing = function(optKey) {
		var key = optKey || true;
		if(tabIndexes[key] && tabIndexes[key].length > 0) {
			tabbables[key].each(function() { this.tabIndex = tabIndexes[key].shift(); });
			delete tabbables[key];
			delete tabIndexes[key];
			return true;
		}

		return false;
	}


	function selectNextTabbableOrFocusable(selector){
		var selectables = $(selector);
		var current = $(':focus');
		var nextIndex = 0;
		if(current.length === 1){
			var currentIndex = selectables.index(current);
			if(currentIndex + 1 < selectables.length){
				nextIndex = currentIndex + 1;
			}
		}

		selectables.eq(nextIndex).focus();
	}

	function selectPrevTabbableOrFocusable(selector){
		var selectables = $(selector);
		var current = $(':focus');
		var prevIndex = selectables.length - 1;
		if(current.length === 1){
			var currentIndex = selectables.index(current);
			if(currentIndex > 0){
				prevIndex = currentIndex - 1;
			}
		}

		selectables.eq(prevIndex).focus();
	}

	/**
	 * Correct jquery filters for Chrome 
	 */

	jQuery.expr.filters.hidden = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return (elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && window.getComputedStyle(elem).display !== 'inline') || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};


	/**
	 * :focusable and :tabbable, both taken from jQuery UI Core
	 */
	$.extend($.expr[ ':' ], {
		data: $.expr.createPseudo ?
			$.expr.createPseudo(function(dataName){
				return function(elem){
					return !!$.data(elem, dataName);
				};
			}) :
			// support: jQuery <1.8
			function(elem, i, match){
				return !!$.data(elem, match[ 3 ]);
			},

		focusable: function(element){
			return focusable(element, !isNaN($.attr(element, 'tabindex')));
		},

		tabbable: function(element){
			var tabIndex = $.attr(element, 'tabindex'),
				isTabIndexNaN = isNaN(tabIndex);
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable(element, !isTabIndexNaN);
		}
	});

	/**
	 * focussable function, taken from jQuery UI Core
	 * @param element
	 * @returns {*}
	 */
	function focusable(element){
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase(),
			isTabIndexNotNaN = !isNaN($.attr(element, 'tabindex'));
		if('area' === nodeName){
			map = element.parentNode;
			mapName = map.name;
			if(!element.href || !mapName || map.nodeName.toLowerCase() !== 'map'){
				return false;
			}
			img = $('img[usemap=#' + mapName + ']')[0];
			return !!img && visible(img);
		}
		return ( /input|select|textarea|button|object/.test(nodeName) ?
			!element.disabled :
			'a' === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN) &&
			// the element and all of its ancestors must be visible
			visible(element);

		function visible(element){
			return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function(){
				return $.css(this, 'visibility') === 'hidden';
			}).length;
		}
	}


})(jQuery);
