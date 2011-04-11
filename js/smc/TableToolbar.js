/**
* TableToolbar
* use Prototype
* @author Антон Прусов
* @ver    1.0
*/

var TableToolbar = function(_oControl) {
	/**
	* (Private properties)
	*/
	var __self = this;
	var Control = _oControl;
	var HandleItem = null;
	var cDepth = parseInt(Control.container.style.zIndex) || 0;
	var IconsPath = Control.iconsPath;
	var DataSet = Control.dataSet;
	/**
	* (Public properties)
	*/
	this.highlight = null;
	this.element = null;
	this.buttons = new Array();

	/**
	* (Private methods)
	*/
	var __drawButtons = function() {
		var btns = document.createElement('div');
		btns.style.position = 'absolute';
		btns.style.display = 'none';
		btns.className = 'tree_toolbar';

		// fix for table
		btns.style.width = '160px';

		// del
		__appendButton(btns, {
			name: 'ico_del',
			hint: getLabel('js-delete'),
			init : function(button) {
				var e = button.element;
				var hint = getLabel('js-delete');

				if (HandleItem !== null && (HandleItem.permissions && HandleItem.permissions & 8 || !HandleItem.permissions)) {
					var icon = IconsPath + 'ico_del.png';

					e.setAttribute('title', hint);
					e.style.background = "url('" + icon + "') no-repeat";

					e.setAttribute('href', '#');
					e.style.visibility = 'visible';
				} else {
					e.style.visibility = 'hidden';
				}
			},

			release : function(button) {
				if (HandleItem !== null) {
					DataSet.execute('tree_delete_element', {
						'childs' : 1,
						'element' : HandleItem.id,
						'handle_item' : HandleItem
					});
				}
				return false;
			}
		});
		// edit
		__appendButton(btns, {
			name: 'ico_edit',
			hint: getLabel('js-edit-item'),
			init : function(button) {
				var e = button.element;
				if (HandleItem !== null && HandleItem.editLink !== false  && (HandleItem.permissions && HandleItem.permissions & 2 || !HandleItem.permissions)) {
					var icon = IconsPath + 'ico_edit.png';
					var hint = getLabel('js-edit-item');
					var href = HandleItem.editLink;
					e.setAttribute('title', hint);
					e.style.background = "url('" + icon + "') no-repeat";

					e.setAttribute('href', href);
					e.style.visibility = 'visible';
				} else {
					e.style.visibility = 'hidden';
				}
			},

			release : function(button) {
				return true;
			}
		});

		if(!TableToolbar.disableAddButton) {
			// create
			__appendButton(btns, {
				name: 'ico_add',
				hint: getLabel('js-add-page'),
				init : function(button) {
					if (HandleItem !== null && HandleItem.createLink !== false) {
						button.element.setAttribute('href', HandleItem.createLink);
						button.element.style.visibility = 'visible';
					} else {
						button.element.style.visibility = 'hidden';
					}
				}
			});
		}

		// blocking
		__appendButton(btns, {
			name: 'blocking',
			hint: getLabel('js-disable-page'),
			icon: IconsPath + 'ico_block.png',
			init : function(button) {
				if (HandleItem !== null && HandleItem.allowActivity && HandleItem.viewLink !== false) {
					var icon = HandleItem.isActive ? IconsPath + 'ico_unblock.png' : IconsPath + 'ico_block.png';
					var hint = HandleItem.isActive ? getLabel('js-disable-page') : getLabel('js-enable-page');
					button.element.style.background = "url('" + icon + "') no-repeat";
					button.element.setAttribute('href', '#');
					button.element.setAttribute('title', hint);
					button.element.style.visibility = 'visible';
				} else {
					button.element.style.visibility = 'hidden';
				}
			},
			release : function(button) {
				if (HandleItem !== null) {
					var icon = HandleItem.isActive ? IconsPath + 'ico_block.png' : IconsPath + 'ico_unblock.png';
					var hint = HandleItem.isActive ?  getLabel('js-enable-page') : getLabel('js-disable-page');
					button.element.setAttribute('title', hint);
					button.element.style.background = "url('" + icon + "') no-repeat";
					DataSet.execute('tree_set_activity', {
						'element' : HandleItem.id,
						'active' : HandleItem.isActive ? 0 : 1,
						'handle_item' : HandleItem
					});
				}
				return false;
			}
		});

		// view
		__appendButton(btns, {
			name: 'view',
			hint: getLabel('js-view-page'),
			init : function(button) {
				if (HandleItem !== null && HandleItem.getData().guide == "guide") {
					button.element.setAttribute('href', window.pre_lang + "/admin/data/guide_items/" + HandleItem.id + "/");
					button.element.style.visibility = 'visible';
				} else if (HandleItem !== null && HandleItem.viewLink !== false) {
					button.element.setAttribute('href', HandleItem.viewLink);
					button.element.style.visibility = 'visible';
				} else {
					button.element.style.visibility = 'hidden';
				}
			}
		});

		__self.element = document.body.appendChild(btns);
	};

	var __initButtons = function() {
		for (var i = 0; i < __self.buttons.length; i++) {
			__self.buttons[i].init(__self.buttons[i]);
		}
	};

	var __appendButton = function(container, options) {
		var b = document.createElement('a');
		var name = options.name || 'toolbtn';
		var href = options.href || '#';
		var icon = options.icon || IconsPath + name + ".png";
		var init = options.init || function() {};
		var title = options.hint || '';

		var el = container.appendChild(b);
		var button = {
			'name' : name,
			'href' : href,
			'icon': icon,
			'init' : init,
			'element' : el
		};

		__self.buttons[__self.buttons.length] = button;

		el.setAttribute('href', href);
		el.setAttribute('title', title);
		el.className = options.className || 'tree_toolbtn';
		if (typeof(options.release) === 'function') {
			el.onclick = function() {
				if (!DataSet.isAvailable()) return false;
				return options.release(button);
			};
		} else {
			el.onclick = function() {
				if (!DataSet.isAvailable()) return false;
				if(HandleItem.focus) HandleItem.focus();
				return true;
			};
		}
		
		el.name = name;
		el.style.background = "url('" + icon + "') no-repeat";
	};

	var __draw = function() {
		var el = document.createElement('div');
		el.className = 'tree-highlight';
		el.style.display = 'none';
		el.style.position = 'absolute';
		el.style.zIndex = cDepth - 1;

		__self.highlight = Control.container.appendChild(el);

		__drawButtons();
	};
	
	/**
	* (Public methods)
	*/
	this.show = function(_HandleItem, bForce) {
		var bForce = bForce || false;
		// unselect old HandleItem

		if (typeof(_HandleItem) === 'undefined' || (HandleItem === _HandleItem && !bForce)) return false;
		
		if (HandleItem) {
			HandleItem.labelControl.className = 'ti';
		}

		HandleItem = _HandleItem;

		HandleItem.labelControl.className = HandleItem.getSelected() ? 'ti selected-highlight' : 'ti hightlight';

		//HandleItem.focus();

		__initButtons();

		var iroot = HandleItem.control.getRootNodeId();
		var container = HandleItem.control.initContainer.parentNode;
		var cpos = $(container).position();

		this.element.style.top = HandleItem.position.top + cpos.top + 'px';

		this.element.style.left = container.offsetWidth - 160 + 'px';
		this.element.style.display = '';

	};

	this.hide = function() {
		if (HandleItem) {
			HandleItem.labelControl.className = HandleItem.getSelected() ? 'ti selected' : (HandleItem.isVirtualCopy ? 'ti virtual' : 'ti');
			this.element.style.display = 'none';
			HandleItem = null;
		}
	};

	// {main} draw toolbar
	if (typeof(Control) === 'object') {
		__draw();
	} else {
		alert('Can\'t create toolbar without control object');
	}
};

TableToolbar.disableAddButton = false;