/*
---
description: An Class that supplies a basic functionality for a fixed menu that can fade in and out.

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4: [Class, Class.Extras, Element, Element.Style]

provides: [FixedMenu, FixedMenu.Vertical]

...
*/

var FixedMenu = new Class({
	Implements : [Options],
	options : {
		start : 0 // when to start showing the menu
		, costum : false //if costum, use this for position
		, speed : 700 //fade speed
		, position : '' // Can be bottom,top,costum
	},
	menu : null,
	fx : null,
	position : 0,
	property : '',
	axis : 'y',
	initialize : function(el,options){
		var pos;
		
		this.setOptions(options);
		this.menu = el;
		
		el.setStyles({
			'visibility':'hidden',
			'position' : 'fixed'
		});
		el.inject(document.body);
		
		this.setPosition();
		
		this.fx = new Fx.Tween(el,{
			property : 'opacity',
			duration : this.options.speed
		});
		
		el.setStyles({
			'visibility' : 'visible'
		});
		
		this.setEvents();
	},
	setPosition :function(){},
	setEvents : function(){
		var self = this
			, last_scroll = 0
			, hide = this.hide.bind(this)
			, show = this.show.bind(this)
			,menu = self.menu;

		function action(){
			var scroll = $(this).getScroll()[self.axis]
				, moved = false;
			
			if (scroll<self.options.start && (menu.hasClass('visible') || menu.hasClass('hidden')==false)) hide();
			if (scroll>self.options.start && (menu.hasClass('hidden')  || menu.hasClass('visible')==false)) show();
			
			if (Browser.Engine == 'trident' && Browser.version<7){
				this.position += scroll-last_scroll;
				this.menu.setStyle(this.property,this.position);
			}
			
			last_scroll = scroll;
		}
		
		window.addEvent('scroll',action);
		window.addEvent('load',action);
	},
	hide : function(){
		this.menu.addClass('hidden');
		this.menu.removeClass('visible');
		this.fx.start(0);
	},
	show : function(){
		this.menu.addClass('visible');
		this.menu.removeClass('hidden');
		this.fx.start(1);
	},
	toElement : function(){return this.menu;}
});

FixedMenu.Vertical = new Class({
	Implements : [Options],
	Extends : FixedMenu,
	property : 'top',
	axis : 'y',
	setPosition :function(){
		var pos;
		switch (this.options.position){
			case 'top':
				pos = 0;
			break;
			case 'costum':
				pos = this.options.costum;
			break;
			case 'bottom':
			default:
				pos = Window.getHeight()-this.menu.getSize().y;
			break;
		}
		this.menu.setStyle('top',pos);
		if (Browser.Engine == 'trident' && Browser.version<7) this.position = pos;
	}
});
