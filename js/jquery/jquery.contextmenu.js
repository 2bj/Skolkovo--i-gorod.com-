/**
Author: A.Chakkaev [1602] http://1602.habrahabr.ru/
Created: summer 2008
Modified: 23 oct 2008

*/
/*global cm_img, globals, MenuItem, jQuery*/

(function ($) {

	if (typeof cm_img !== 'function') {
		cm_img = function (img, alt, style) {/* {{{ */
			if (alt) {
				alt = alt.replace(/"/, '\"');
			}
			return '<img src="/images/cms/admin/mac/tree/' + img + 
				(img.search(/\.(gif|jpg|jpeg)$/i) === -1?'.png':'') +
				'" width="16" height="16" alt="' +
				(alt?alt:'img') + '" ' +
				(alt?'title="' + alt + '"':'') +
				(style?' style="' + style + '"':'') + ' />';
		/* }}} */
		};
	}

	if (typeof globals === 'undefined') {
		globals = {
			activeModule: window
		};
	}
	
	/**
	 * create object MenuItem
	 *
	 * @param string caption	displayed label, required parameter, if first symbol is "!"
	 *							then this menu item is disabled by default
	 * @param string icon		name of 16x16 icon, displayed on the left side of label, optional
	 * @param function execute	this will called when menu item was triggered
	 * @param object submenu	subitems of current item
	**/
	MenuItem = function (caption, icon, execute, submenu) {
		if (caption.search(/^!/) !== -1) {
			this.disabled = true;
			caption = caption.substr(1);
		}
		this.caption = caption;
		this.icon = icon;
		this.execute = execute;
		this.submenu = submenu;
	};
	
	$.cmenu = {
		c: [],
		init: function (id, act) {		/* Create cmenu object	{{{ */
			var x = {
				cn: 'cmenu',
				id: id,
				jq: $('<div iuid="' + id + '" class="cmenu"></div>'),
				r: false
			};
			x[typeof act === 'function'?'f':'a'] = act;
			
			$('body').append(x.jq);
			return x;
			/* }}} */
		},
		render: function (x) {			/* Render menu items	{{{ */
			if (typeof x.f === 'function') {
				if (typeof x.caller !== 'object') {
					return false;
				}
				x.r = x.f(x);
				if (typeof x.r === 'object') {
					x.a = x.r;
					x.r = false;
				} else {
					x.r = !x.r;
				}
			}
			if (x.async) {
				if (!x.a) {
					x.done = function () {
						x.v = false;
						$.cmenu.show(x, x.caller);
					}
					return false;
				}
				x.r = false;
			}
			if (x.r) {
				return false;
			}
			x.r = true;
			
			var h = '';
			if (x.type === 'radio') {
				var radio = x.get();
			} else {
				radio = false;
			}
			var strAsd = ' onmouseover="$(this).addClass(\'cmenuItemHover\'); $.cmenu.to=setTimeout(function(){var m = $.cmenu.getMenu(' + x.id + ');m && m.sub && $.cmenu.hideMenu(m.sub);},300);" onmouseout="$(this).removeClass(\'cmenuItemHover\'); clearTimeout($.cmenu.to);" ';
			for (var i in x.a) {
				var a = x.a[i];
				if (a === '-') {                        
					h += '<hr' + ($.browser.msie?' style="width:50px;align:center;"':'') + '/>';
					//h += '<div class="hr"></div>';
					continue;
				}
				
				if (a.constructor === Array) {
					a = (function (x) {
						return new MenuItem(x[0], x[1], x[2], x[3]);
					})(a);
					x.a[i] = a;
				}
				x.a[i].parent = x.parent_item;
				// Условие невидимости действия
				if (typeof a.visible !== 'undefined' && !a.visible ||
					(typeof a.acid !== 'undefined' && $.inArray(a.acid, globals.accessedActions || []))) {
					continue;
				}
				
				if (a.submenu && (!a.submenu.cn || a.submenu.cn !== 'cmenu')) {
					a.submenu = this.getMenu(a.submenu);
				}
				// Calc caption
				var caption = a.caption;
				if (radio && caption === radio) { // radio
					caption = '<strong><u>' + a.caption + '</u></strong>';
				} else { // other
					
				}
				h += '<div class="cmenuItem" item_id="' + i + '" ' +
					(a.disabled? 
						// Недоступный элемент
						'style="color:#808080;" ':
						// Доступный элемент
						'onclick="$.cmenu.exec(this);" ' +
						
						//'onclick="$.cmenu.exec(' + x.id + ',\'' + i + '\');" ' +
						(a.submenu?
						// Есть подменю
						this.getCaller(a.submenu, 'hovertimeout'):
						// Нет подменю
						strAsd)
					) +
				'>' +
				cm_img(a.icon?a.icon:'undefined', ' ') + ' ' + caption +
				(a.submenu?cm_img('page-next.gif', ' ', 'position:absolute;right:0px;vertical-align:middle;'):'') + '</div>';
			}
			x.jq.html(h);
			/* }}} */
		},
		exec: function (item_element) {		/* Execute action	{{{ */
			item_element = $(item_element);
			var act = item_element.attr('item_id');
			var id = item_element.parent().attr('iuid');
			
			var m = $.cmenu.c[id];
			if (!m) {
				alert('Menu not found');
				return false;
			}
			if (!m.a || !m.a[act]) {
				alert('Action not found');
				return false;
			}
			if (m.type === 'radio') {
				m.set(m.a[act].caption);
				this.render(m);
				return false;
			}
			if (typeof m.a[act].execute === 'function' && !m.a[act].disabled) {
				m.a[act].execute.apply(globals.activeModule, [m.a[act], m, m.p]);
			}
			/* }}} */
		},
		getMenu: function (acts) {		/* Get menu from global collection	{{{ */
			var t = typeof acts; 
			if (t.search(/function|object|undefined/) !== -1) { // Init menu with (un)defined actions
				var id = this.c.length;
				this.c.push({id: id});
				this.c[id] = this.init(id, acts);
				return this.c[id];
			} else { // Select from collection (acts - number or string)
				return this.c[acts];
			}
			/* }}} */
		},
		show: function (m, p, oEvent) {			/* Show menu m near parent object p	{{{ */
			Control.enabled = false;
			if (typeof m !== 'object') {
				m = this.getMenu(m);
			}
			if (m.v && m.caller === p) {
				return false;
			}
			if (!this.hideBinded) {
				this.hideBinded = true;
				$(document).bind('click', this.hideAll);
			}
			var prev_caller = m.caller;
			m.caller = p;
			if (m.sub) {
				this.hideMenu(m.sub);
			}
			var jqp = $(p);
			// Если вызвавший меню элемент - элемент меню (то есть показываем подменю)
			// то надо оставить p подсвеченным (класс cmenuItemWithSub);
			// также надо установить родительскому меню ссылку на дочернее, а дочернему - на родителя
			// и еще - если у нашего меню уже есть подменю - скрыть его
			if (jqp.hasClass('cmenuItem') && !jqp.hasClass('cmenuItemWithSub')) {
				jqp.addClass('cmenuItemWithSub');
				var pm = $.cmenu.getMenu(parseInt($(p.parentNode).attr('iuid'), 10));
				if (pm) {
					if (pm.sub) {
						if (pm.sub === m) {
							$(prev_caller).removeClass('cmenuItemWithSub');
						} else {
							$.cmenu.hideMenu(pm.sub);
							if ($.cmenu.to && clearTimeout($.cmenu.to)) {
								delete $.cmenu.to;
							}
						}
					}
					pm.sub = m;
					m.parentMenu = pm;
				}
			}
			
			m.p = this.getPath(p);
			m.parent_item = m.p[m.p.length-1].cmenu_item;
			this.render(m);
			
			if (m.jq[0].offsetParent !== m.p[0].offsetParent && m.p[0].offsetParent) {
				m.jq.appendTo(m.p[0].offsetParent);
			}
			
			// Display menu
			if (m.jq.css('display') === 'none') {
				m.jq.show();
			}
			
			// Calculate menu parameters
			var cmenuOffParent = m.jq[0].offsetParent;
			var cmenuWidth = m.jq[0].offsetWidth;
			var cmenuHeight = m.jq[0].offsetHeight;
			
			// Calc visible screen bounds (this code is common)
			var w = 0, h = 0;
			if (typeof(window.innerWidth) === 'number') {// не msie
				w = window.innerWidth;
				h = window.innerHeight;
			} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
				w = document.documentElement.clientWidth;
				h = document.documentElement.clientHeight;
			}
			var sx = 0, sy = 0;
			if (typeof window.pageYOffset === 'number') {
				sx = window.pageXOffset;
				sy = window.pageYOffset;
			} else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
				sx = document.body.scrollLeft;
				sy = document.body.scrollTop;
			} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				sx = document.documentElement.scrollLeft;
				sy = document.documentElement.scrollTop;
			}
			var winHeight = h + sy;
			var winWidth = w + sx;
			
			// Получаем абсолютное смещение элемента, вызвавшего меню (p)
			// относительно cmenuOffParent
			// относительно курсора мыши
			

			var off = this.getOffset(p, cmenuOffParent);
			var pW = p.offsetWidth;
			var pH = p.offsetHeight;
			if (oEvent) {
				off = { 'x' : oEvent.pageX, 'y' : oEvent.pageY };
				pW = 0; pH = 0;
			};
			
			// Очень важный момент - в какую сторону показывать меню (по горизонтали)
			// Задача - если есть место чтобы показать справа от объекта
			//	- показываем справа: left = off.x+p.offsetWidth
			// если места справа нет
			// - показываем слева: left = off.x-cmenuWidth
			// Наличие места вычисляем исходя из
			// - размеров блока меню (cmenuWidth)
			// - смещению (off.x) родительского элемента относительно общего offsetParent-а (cmenuOffParent)
			// - ширине экрана (winWidth)
			m.jq.css('left', cmenuOffParent.offsetLeft + off.x + pW + cmenuWidth > winWidth?off.x - cmenuWidth:off.x + pW);
			// Еще один очень важный момент - в какую сторону показывать меню (по вертикали)
			// Задача - если есть место чтобы показать снизу от объекта
			//	- показываем снизу: top = off.y-2
			// если места снизу нет 
			// - показываем сверху: top = off.y-cmenuHeight+p.offsetHeight+4
			// Наличие места вычисляем исходя из
			// - размеров блока меню (cmenuHeight)
			// - смещению (off.y) родительского элемента относительно общего offsetParent-а (cmenuOffParent)
			// - высоте экрана (winHeight)
			var top_pos = cmenuOffParent.offsetTop + off.y + cmenuHeight > winHeight?off.y - cmenuHeight + pH + 4:off.y - 2;
			if (cmenuOffParent.tagName.toLowerCase() == 'body' && top_pos < 0) {
				top_pos = 0;
			}
			m.jq.css('top', top_pos);
			// Устанавливаем флаг видимости меню
			m.v = true;
			/* }}} */
		},
		getPath: function (el) {		/* Menu calling stack	{{{ */
			var p = [], jel;
			while (el) {
				jel = $(el);
				if (!jel.hasClass('cmenuItem')) {
					p.push(el);
					break;
				}
				el.cmenu = $.cmenu.getMenu(parseInt(jel.parent().attr('iuid'), 10));
				el.cmenu_item = el.cmenu.a[jel.attr('item_id')];
				p.push(el);
				
				// Go to parent
				el = el.cmenu.caller;
			}
			return p.reverse();
			/* }}} */
		},
		hideAll: function () {			/* Hide all displayed menus	{{{ */
			if(ContextMenu.allowControlEnable) Control.enabled = true;
			// Если блокировано сокрытие меню - выйти
			if ($.cmenu.lockHiding) {
				return false;
			}
			// Отбиндить сокрытие всех меню по клику
			$(document).unbind('click', $.cmenu.hideAll);
			$.cmenu.hideBinded = false;
			// Скрыть менюшки
			var len = $.cmenu.c.length;
			for (var i = 0; i < len; i++) {
				$.cmenu.hideMenu($.cmenu.c[i]);
			}
			/* }}} */
		},
		hideMenu: function (m) {		/* {{{ */
			if (!m || !m.v) {
				return;
			}
			m.v = false;
			this.hideMenu(m.sub);
			if (m.caller) {
				$(m.caller).removeClass('cmenuItemWithSub');
			}
			m.jq.hide();
			/* }}} */
		},
		getCaller: function (id, event) {/* Compile menu-caller-string (inline script attributes)	{{{ */
			var m = false;
			if (typeof id === 'object') {
				m = true;
				id = id.id;
			}
			if (typeof id !== 'number') {
				//console.error('$.cmenu.getCaller - unexpected type of first parameter ('+(typeof id)+'), expecting number');
				return '';
			}
			switch (event) {
			case 'click':
			default:
				return 'onclick="$.cmenu.show(' + id + ',this);$.cmenu.lockHiding=true;" onmouseout="$.cmenu.lockHiding=false;"';
			case 'hovertimeout':
				return 'onmouseover="$(this).addClass(\'cmenuItemHover\');var t=this;$.cmenu.to=setTimeout(function(){$.cmenu.show(' + id + ',t);$.cmenu.lockHiding=true;},200);" onmouseout="$(this).removeClass(\'cmenuItemHover\');clearTimeout($.cmenu.to);$.cmenu.lockHiding=false;"';
					// (m?'m=$.cmenu.getMenu('+id+');m&&m.sub&&$.cmenu.hideMenu(m.sub);':'')
			}
			
			/* }}} */
		},
		getOffset: function (el, stop) {/* Offset el against stop	{{{ */
			//console.log(el.tagName,el.offsetLeft,el.offsetTop);
			if (el.offsetParent && el.offsetParent !== stop) {
				var of = this.getOffset(el.offsetParent, stop);
				of.x += el.offsetLeft;
				of.y += el.offsetTop;
				return of;
			} else {
				return {
					x: el.offsetLeft,
					y: el.offsetTop
				};
			}
			/* }}} */
		}
	};
	
	$.fn.bindMenu = function (event, menu) {/* jQuery-plugin for menu binding	{{{ */
		if (arguments.length === 1) {
			menu = event;
			event = 'click';
		}
		if (!menu.jq) {
			menu = $.cmenu.getMenu(menu);
		}
		return this.each(function () {
			$(this).bind(event, function (oEvent) {
				$.cmenu.lockHiding = true;
				$.cmenu.show(menu, this, oEvent);
			})
			.bind('mouseout', function () {
				$.cmenu.lockHiding = false;
			});
		});
		/* }}} */
	};
	
	

})(jQuery);
/* :folding=explicit:*/
