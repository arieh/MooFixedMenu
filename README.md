FixedMenu
===========

This Class Supplies a simple interface to create a fixed positioned menu that will follow the screen while scrolling. It will also let you decide when to make the menu apear/hide.
The Class will work well under all modern browsers. It should work on IE6 but buggy.

This class was inspired by David Walsh's ScrollSidebar

How to use
----------
	#JS
    window.addEvent('domready', function() {
        new FixedMenu.Vertical({$('menu'),{
				start : 500 //this will make the menu apear only after scrolling 500 pixels
				, speed : 1000 //how fast the fading will be
				, position : 'costum' //where to position the menu vertically (can also be 'top' and 'bottom')
				, costum : 100 //will be positioned 100 pixels from top
			}
		});        
    }
	
Options
--------

  * `start` : At which point to start/stop showing the menu
  * `speed` : How fast to fade the menu
  * `position` : Where to position the menu on the screen (for FixedMenu.Vertical this can be `top`,`bottom`,`costum`
  * `costum` : Where exactly in the screen to position the menu. Only used when position is set to `costum`.   