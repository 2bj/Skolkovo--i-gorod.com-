/**
* TreeItem
* Класс осуществяляет визуализацию узла дерева
* @author Антон Прусов
* @ver    1.1
* @param Object _oControl - экземпляр класса Control
* @param Object _oParent - экземпляр класса TreeItem, указывающий на прямого предка элемента
* @param Object _oData - информация о элементе
* @param Object _oSiblingItem - экземпляр класса TreeItem, указывающий на соседа элемента
* @param String _sInsertMode - режим добавление элемента по отношению к соседу _oSiblingItem. Может быть "after" и "before"
*/
var TreeItem = function(_oControl, _oParent, _oData, _oSiblingItem, _sInsertMode) {
	var id = parseInt(_oData.id);
	var __self = this;
	var Data = _oData;
	var Parent = _oParent;
	var SiblingItem = _oSiblingItem || null;
	var InsertMode = _sInsertMode || 'after';
	var ForceDraw = typeof(_oData['force-draw']) !== 'undefined' ? parseInt(_oData['force-draw']) : 1;
	var CountChilds = typeof(_oData['childs']) !== 'undefined' ? parseInt(_oData['childs']) : 0;
	var typeName = (typeof(_oData['basetype']) !== 'undefined' && typeof(_oData['basetype']['_value']) === 'string')? _oData['basetype']['_value'] : "";
	var IconsPath = _oControl.iconsPath;
	var baseModule = (typeof(_oData['basetype']) !== 'undefined' && typeof(_oData['basetype']['module']) === 'string') ? _oData['basetype']['module'] : "content";
	var baseMethod = (typeof(_oData['basetype']) !== 'undefined' && typeof(_oData['basetype']['method']) === 'string')? _oData['basetype']['method'] : "";
	var iconSrc = typeof(_oData['iconbase']) !== 'undefined' ? _oData['iconbase'] : IconsPath + 'ico_' + baseModule + '_' + baseMethod + '.png';
	var toggleCtrl = null;
	var labelCtrl = null;
	var labelText = null;
	var itemIcon = null;
	var Settings = SettingsStore.getInstance();
	var AutoexpandAllowed = true;
	var oldClassName      = null;
	var selected		  = false;
	var maxChildsCount = 49;
	
	/**
	* (Public properties)
	*/
	this.element = null;
	this.control = _oControl;
	this.childsContainer = null;
	this.id = id;
	this.name = typeof(_oData['name']) !== 'undefined' ? _oData['name'] : 'noname';
	this.isRoot = (id === 0);
	this.loaded = false;
	this.viewLink = typeof(_oData['link']) !== 'undefined' ? _oData['link'] : false;
	this.editLink = typeof(_oData['edit-link']) !== 'undefined' ? _oData['edit-link'] : false;
	this.createLink = typeof(_oData['create-link']) !== 'undefined' ? _oData['create-link'] : false;
	this.permissions = typeof(_oData['permissions']) !== 'undefined' ? parseInt(_oData['permissions']) : 0;
	this.isActive = typeof(_oData['is-active']) !== 'undefined' ? parseInt(_oData['is-active']) : 0;
	this.isVirtualCopy = typeof(_oData['virtual-copy']) !== 'undefined' ? true : false;
	this.lockedBy = typeof(_oData['locked-by']) === 'object' ? _oData['locked-by'] : null;
	this.expiration = typeof(_oData['expiration']) === 'object' ? _oData['expiration'] : null;
	this.isDefault = typeof(_oData['is-default']) !== 'undefined' ? true : false;
	
	this.templateId = typeof(_oData['template-id']) !== 'undefined' ? _oData['template-id'] : null;
	this.langId = typeof(_oData['lang-id']) !== 'undefined' ? _oData['lang-id'] : null;
	this.domainId = typeof(_oData['domain-id']) !== 'undefined' ? _oData['domain-id'] : null;

	this.allowCopy = typeof(_oData['allow-copy']) !== 'undefined' ? parseInt(_oData['allow-copy']) : true;
	this.allowActivity = typeof(_oData['allow-activity']) !== 'undefined' ? parseInt(_oData['allow-activity']) : true;
	this.allowDrag = typeof(_oData['allow-drag']) !== 'undefined' ? _oData['allow-drag'] : true;

	this.parent = Parent;
	this.childs = [];
	this.hasChilds = (CountChilds > 0 || id == 0);
	this.labelControl = null;
	this.position = false;
	this.isExpanded = false;
	this.filter = new filter;
	this.filter.setParentElements(id);
	this.pageing = {
		'total' : 0,
		'limit' : 0,
		'offset': 0
	};


	this.baseModule = (typeof(_oData['basetype']) !== 'undefined' && typeof(_oData['basetype']['module']) === 'string') ? _oData['basetype']['module'] : "content";
	this.baseMethod = (typeof(_oData['basetype']) !== 'undefined' && typeof(_oData['basetype']['method']) === 'string')? _oData['basetype']['method'] : "";

	/**
	* (Private methods)
	*/
	/**
	* Конструктор класса
	* @access private
	*/
	var __constructor = function() {
		if (_oParent) {
			_oParent.childs[_oParent.childs.length] = id;
			__draw(Parent.childsContainer);
		} else {
			__drawRoot();
		}
	};

	/**
	* "Рисует" элемент
	* @access private
	* @param DOMElement _oContainerEl контейнер для добавления элемента
	*/
	var __draw = function(_oContainerEl) {
		var element = document.createElement('li');
		element.setAttribute('rel', id);
		element.className = 'ti';
		element.rel = id;
		element.className = 'ti';

		// fix for opera and mozilla (cancel user select)
		element.onmousedown = function() { return false; };

		// draw controls
		// label
		labelCtrl = document.createElement('div');
		labelCtrl.className = 'ti';
		if (__self.isVirtualCopy) labelCtrl.className += ' virtual';
		if (__self.isDefault) labelCtrl.className += ' main-page';


		// toggle
		toggleCtrl = document.createElement('img');
		toggleCtrl.className = 'ti-toggle';

		var tsrc = __self.hasChilds ? IconsPath + 'expand.png' : IconsPath + 'collapse-disabled.png';
		toggleCtrl.setAttribute('src', tsrc);

		toggleCtrl.onclick = function() {
			__self.toggle();
			return false;
		};

		labelCtrl.appendChild(toggleCtrl);

		// itemicon
		itemIcon = document.createElement('img');
		itemIcon.style.border = '0px';
		itemIcon.setAttribute('alt', typeName);
		itemIcon.setAttribute('title',typeName);
		itemIcon.setAttribute('src', iconSrc);
		itemIcon.className = 'ti-icon';
		itemIcon.onmousedown = function() {
			return false;
		};
		if (__self.control.allowDrag && __self.allowDrag) itemIcon.style.cursor = 'move';


		labelCtrl.appendChild(itemIcon);

		// indicators
		if (__self.expiration) {
			var oStatus = __self.expiration['status'];
			if (oStatus) {
				var statusSID = oStatus['id'];
				var statusName = oStatus['_value'];
				if (statusSID) {
					var expInd =  document.createElement('img');
					var ico = IconsPath + 'ico_' + statusSID + '.png';
					expInd.setAttribute("src", ico);
					expInd.setAttribute("alt", statusName);
					expInd.setAttribute("title", statusName);
					expInd.className = 'page-status';
					labelCtrl.appendChild(expInd);
				}
			}
		}

		labelText = document.createElement('a');
		var title = __self.name;
		
		if(typeof title != 'string') {
			title = getLabel('js-smc-noname-page');
		}
		
		if(title.length > 45) {
			title = title.substring(0, 45) + "&#8230;";
		}
		labelText.innerHTML = title;
		
		if(__self.viewLink) {
			labelText.title = __self.viewLink;
		}
		if (__self.editLink) {
			labelText.setAttribute('href', __self.editLink); // Edit Link);
			labelText.onclick = function() {
				return __self.control.applyBehaviour(__self);
			};
		} else {
			labelText.setAttribute('href', '#'); 
			labelText.onclick = function() {
				return false;
			};
		}
		labelCtrl.appendChild(labelText);

		if(__self.isVirtualCopy) {
			var virtualLabel = document.createElement('span');
			virtualLabel.className = 'label-virtual';
			virtualLabel.innerHTML = getLabel('js-smc-virtual-copy');
			labelCtrl.appendChild(virtualLabel);
		}

		__self.labelControl = element.appendChild(labelCtrl);

		if (!__self.isActive) {
			$(itemIcon).fadeTo(1, 0.5);
			$(labelText).fadeTo(1, 0.5);
			$(toggleCtrl).fadeTo(1, 0.5);
		}


		// childs container
		childsContainer = document.createElement('ul');
		childsContainer.className = 'ti-childs-container';
		childsContainer.style.display = 'none';
		__self.childsContainer = element.appendChild(childsContainer);

		if (SiblingItem) {
			var prevEl = null;
			if (InsertMode.toLowerCase() == 'after') {
				prevEl = SiblingItem.element.nextSibling;
			} else {
				prevEl = SiblingItem.element;
			}
			if (prevEl) {
				__self.element = _oContainerEl.insertBefore(element, prevEl);
			} else {
				__self.element = _oContainerEl.appendChild(element);
			}
		} else {
			__self.element = _oContainerEl.appendChild(element);
		}

		if (__self.control.dragAllowed && __self.allowDrag) {
			var DropMode = 'child';

			$(labelCtrl).draggable({
				distance: Control.DragSensitivity,
				handle : '.ti-icon, a',
				helper: function() {
					// clone item element
					var el = __self.element;
					var drag_el = document.createElement('div');
					drag_el.innerHTML = '<div>' + __self.name + '</div>';
					drag_el.className = 'ti-draggable';
					$(drag_el).css({
						'position' : 'absolute',
						'background' : 'url(' + iconSrc + ') no-repeat 0 4px'
					});

					return  drag_el;
				},
				start: function() {
					Control.DraggableItem = __self;
					Control.DragMode = true;
					if (__self.control.toolbar) __self.control.toolbar.hide();
				},
				stop: function() {
					if (Control.HandleItem) {
						Control.HandleItem.deInitDroppable();
						if (Control.DraggableItem) {
							Control.DraggableItem.tryMoveTo(Control.HandleItem, DropMode);
						}
					}
					Control.DraggableItem = null;
					Control.DragMode = false;
				},
				drag: function(event, ui) {
					var x = event.pageX;
					var y = event.pageY;
					var hItem = Control.detectItemByMousePointer(x, y);
					var oldHItem = Control.HandleItem;
					if (oldHItem) {
						oldHItem.deInitDroppable();
					}

					Control.HandleItem = hItem;
					if (hItem) {
						var cpos = $(hItem.control.initContainer).position();
						var itmHeight = hItem.position.bottom - hItem.position.top;
						var itmDelta = y - cpos.top - hItem.position.top;
						if (itmDelta < itmHeight / 3) {
							DropMode = 'before';
						}
						if (itmDelta > itmHeight / 3 && itmDelta < 2 * itmHeight / 3) {
							DropMode = 'child';
						}
						if (itmDelta > 2 * itmHeight / 3) {
							DropMode = 'after';
						}

						// force disable for root
						if (hItem.isRoot) DropMode = 'child';
						hItem.initDroppable(DropMode);
					}
				}

			});
		}

	};

	/**
	* Рисует корневой элемент
	* @access private
	*/
	var __drawRoot = function() {
		// drop indicator
		if (!Control.dropIndicator) {
			var dropIndicator = document.createElement('div');
			dropIndicator.className = 'ti-drop';
			Control.dropIndicator = document.body.appendChild(dropIndicator);
		}
		__draw(__self.control.container);
	};

	/**
	* Разворачивает элемент, если он находится под курсором
	* Используется в режиме drag&drop
	* @access private
	*/
	var __autoExpandSelf = function() {
		if (AutoexpandAllowed && __self === Control.HandleItem) {
			__self.expand();
		}
	};


	this.draw = function() {
		if (_oParent) {
			if (!ForceDraw) __draw(Parent.childsContainer);
		} else {
			if (!ForceDraw) __drawRoot();
		}
	};


	/**
	* Добавляет дочерний элемент последним в списке
	* @access public
	* @param Array _oChildData - массив с информацией о новом элементе
	* @return Object - новый элемент
	*/
	this.appendChild = function(_oChildData) {
		return new TreeItem(this.control, __self, _oChildData);
	};

	/**
	* Добавляет дочерний элемент после указанного элемента
	* @access public
	* @param Array _oChildData - массив с информацией о новом элементе
	* @param Object oItem - элемент, после которого добавится новый
	* @return Object - новый элемент
	*/
	this.appendAfter = function(_oChildData, oItem) {
		return new TreeItem(this.control, __self, _oChildData, oItem, 'after');
	};

	/**
	* Добавляет дочерний элемент перед указанным элементом
	* @access public
	* @param Array _oChildData - массив с информацией о новом элементе
	* @param Object oItem - элемент, перед которым добавится новый
	* @return Object - новый элемент
	*/
	this.appendBefore = function(_oChildData, oItem) {
		return new TreeItem(this.control, __self, _oChildData, oItem, 'before');
	};

	/**
	* Добавляет дочерний элемент в начало списка
	* @access public
	* @param Array _oChildData - массив с информацией о новом элементе
	* @return Object - новый элемент
	*/
	this.appendFirst = function(_oChildData) {
		if (!this.childsContainer.childNodes.length) {
			return this.appendChild(_oChildData);
		} else if(typeof(this.childsContainer.childNodes[0].rel) != 'undefined') {
			return this.appendBefore(_oChildData, this.control.getItem(this.childsContainer.childNodes[0].rel));
		}
	};


	/**
	* Возвращает предыдущего соседа элемента
	* @access public
	* @return Object предыдущий сосед, либо null
	*/
	this.getPreviousSibling = function() {
		var prevEl = this.element.previousSibling;
		if (prevEl && prevEl.rel) {
			return this.control.getItem(prevEl.rel);
		}
		return null;
	};

	/**
	* Возвращает последующего соседа элемента
	* @access public
	* @return Object последующий сосед, либо null
	*/
	this.getNextSibling = function() {
		var prevEl = this.element.nextSibling;
		if (prevEl && prevEl.rel) {
			return this.control.getItem(prevEl.rel);
		}
		return null;
	};

	/**
	* Удаляет элемент из DOM
	* @access public
	*/
	this.clear = function() {
		if (this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
	};

	/**
	* Проверяет, является ли текущий элемент потомком указанного (на всю глубину)
	* @access public
	* @param Object oItem - элемент
	* @return Boolean true, если является
	*/
	this.checkIsChild = function(oItem) {
		var parent = this.parent;
		while (parent) {
			if (oItem === parent) return true;
			parent = parent.parent;
		}
		return false;
	};


	/**
	* Возвращает координаты DOM-представления элемента
	* Метод является обязательным, вызывается Control'ом.
	* Служит для определения элемента под курсором мыши
	* @access public
	*/
	this.recalcPosition = function() {
		try {
			var pos = $(labelCtrl).position();
			this.position = {
				'left' : pos.left,
				'top' : pos.top,
				'right' :  this.control.initContainer.offsetWidth,
				'bottom' : pos.top + labelCtrl.offsetHeight
			};
			return this.position;
		} catch(e) {
			return false;
		}
	};

	/**
	* Получает значение свойства c именем fieldName
	* @param String fieldName - имя свойства
	* @return Mixed значение свойства, либо false, в случае неудачи
	*/
	this.getValue = function(fieldName) {
		if (!Data['properties']) return false;
		if (!Data['properties']['group']) return false;

		var Groups = typeof(Data['properties']['group'][0]) != 'undefined' ? Data['properties']['group'] : [Data['properties']['group']];

		for (var i = 0; i < Groups.length; i++) {
			if (!Groups[i]['property']) continue;
			var Props = typeof(Groups[i]['property'][0]) != 'undefined' ? Groups[i]['property'] : [Groups[i]['property']];

			for (var j = 0; j < Props.length; j++) {
				if (Props[j]['name'] == fieldName) {
					return Props[j]['value'];
				}
			}

		}
		
		return false;
	};
	
	/**
		* Получить данные, которые отдал DataSet
		* @return Array объект со свойствами
	*/
	this.getData = function () {
		return Data;
	};

	/**
	* Выставляет статус загружены/не загружены дети элемента
	* Метод является обязательным, вызывается Control'ом!
	* @param Boolean loaded - статус
	* @access public
	*/
	this.setLoaded = function(loaded) {
		this.loaded = loaded;
		var ico = loaded ? IconsPath + 'collapse.png' : IconsPath + 'expand.png';
		toggleCtrl.setAttribute('src', IconsPath + 'collapse.png');
	};

	/**
	* Выставляет pageing у item'а и заполняет pagebar страницами
	* @param Object pageing
	* @return Boolean false, в случае неудачи
	*/
	this.setPageing = function(pageing) {
		if (!pageing) return false;
		this.pageing = pageing;
	};

	/**
	* Разворачивает элемент
	* Метод является обязательным, вызывается Control'ом!
	* @access public
	*/
	this.expand = function() {
		if (!this.hasChilds) return false;

		this.isExpanded = true;
		if (!this.loaded) {
			if(CountChilds > maxChildsCount) {
				var self = this;
				openDialog({
					'title': getLabel('js-expand-big-title'),
					'text': getLabel('js-expand-big-shured'),
					'OKText': getLabel('js-expand-do'),
					'cancelText': getLabel('js-cancel'),
					'OKCallback': function () {
						self.control.load(self.filter);
						toggleCtrl.setAttribute('src', IconsPath + 'loading.gif');
						self.childsContainer.style.display = '';
						Control.recalcItemsPosition();
						self.control.saveItemState(self.id);
					}
				});
				return;
			}
			this.control.load(this.filter);
			toggleCtrl.setAttribute('src', IconsPath + 'loading.gif');
		} else {
			toggleCtrl.setAttribute('src', IconsPath + 'collapse.png');
		}
		this.childsContainer.style.display = '';

		Control.recalcItemsPosition();
		// save settings
		this.control.saveItemState(this.id);
		
	};

	/**
	* Сворачивает элемент
	* Метод является обязательным, вызывается Control'ом!
	* @access public
	*/
	this.collapse = function() {
		if (!this.hasChilds) return false;

		this.isExpanded = false;
		toggleCtrl.setAttribute('src', IconsPath + 'expand.png');
		this.childsContainer.style.display = 'none';
		Control.recalcItemsPosition();
		// save settings
		this.control.saveItemState(this.id);
	};

	/**
	* Сворачивает/разворачивает элемент в зависимости от текущего состояния
	* Метод является обязательным, вызывается Control'ом!
	* @access public
	*/
	this.toggle = function() {
		if (this.hasChilds) {
			this.isExpanded ? this.collapse() : this.expand();
		}
	};

	/**
	* Обновляет элемент, используя новые данные о нем
	* @param Array _oNewData - новые данные о элементе
	* Метод является обязательным, вызывается Control'ом!
	* @access public
	*/
	this.update = function(_oNewData) {
		if (_oNewData) {
			if (this.id != _oNewData.id) return false;
			// change template id
			if (typeof(_oNewData['template-id']) !== 'undefined') this.templateId = _oNewData['template-id'];

			// change view link
			if (typeof(_oNewData['link']) !== 'undefined' && _oNewData['link'] != this.viewLink) {
				this.viewLink = _oNewData['link'];
				labelCtrl.setAttribute('href', this.viewLink);
			}
			
			// change childs
			if (typeof(_oNewData['childs']) !== 'undefined' && parseInt(_oNewData['childs']) !== CountChilds) {
				CountChilds = parseInt(_oNewData['childs']);
				this.hasChilds = CountChilds > 0 || id == 0;
				var tsrc = IconsPath + 'collapse-disabled.png';
				if (this.hasChilds) {
					tsrc = this.isExpanded ? IconsPath + 'collapse.png' : IconsPath + 'expand.png';
				} 
				toggleCtrl.setAttribute('src', tsrc);
			}

			// change active
			var newActive = typeof(_oNewData['is-active']) !== 'undefined' ? parseInt(_oNewData['is-active']) : 0;
			if (newActive !== this.isActive) {
				this.isActive = newActive;
				if (!this.isActive) {
					$(itemIcon).fadeTo(300, 0.5);
					$(toggleCtrl).fadeTo(300, 0.5);
					$(labelText).fadeTo(300, 0.5);
				} else {
					$(itemIcon).fadeTo(300, 1);
					$(toggleCtrl).fadeTo(300, 1);
					$(labelText).fadeTo(300, 1);
				}
			}

			if (typeof(_oNewData['name']) !== 'undefined' && _oNewData['name'] != this.name) {
				this.name = _oNewData['name'];
				labelText.innerHTML = this.name;
			}

		}
	};


	/**
	* Пытается отправить запрос на перемещение элемента
	* @access public
	* @param Object Item - элемент в который (или после которого) пытаемся переместить текущий
	* @param Boolean asSibling - если true, перемещаем после элемента Item, если false, то делаем элемент первым ребенком Item'a
	* @return False ,в вслучае если перемещение не возможно
	*/
	this.tryMoveTo = function(Item, MoveMode) {
		if (Item) {
			var before = this.control.getRootNodeId();
			var rel = Item.id;
			var asSibling = MoveMode !== 'child' ? 1 : 0;
			if (MoveMode == 'before') {
				before = Item.id;
				rel = Item.parent.id;
			}
			if (MoveMode == 'after') {
				var s = Item.getNextSibling();
				rel = Item.parent.id;
				before = s ? s.id : this.control.getRootNodeId();
			}

			if (Item === this) return false;
			if (Item.checkIsChild(this)) return false;
			if (before == this.id) return false;

			var receiver = Item;
			if (asSibling) {
				receiver = Item.parent  ? Item.parent : Item.control.getRoot();
			}

			this.control.dataSet.execute('tree_move_element', {
				'element' : this.id,
				'before' : before,
				'rel' : rel,
				'as-sibling' : asSibling,
				'domain' : Item.control.getRoot().name,
				'childs' : 1,
				'links' : 1,
				'virtuals' : 1,
				'permissions' : 1,
				'templates': 1,
				'receiver_item' : receiver,
				'handle_item' : this
			});
		}
	};


	/**
	* Пытается подготовить элемент, как контейнер для перемещаемого
	* @access public
	* @param Boolean asSibling - если true, готовим для перемещения после текущего элемента, если false, то готвоим для перемещения в качестве первого ребенка
	* @return False ,в вслучае если перемещение в этот элемент не возможно
	*/
	this.initDroppable = function(DropMode) {
		var DropMode = DropMode || 'child';
		var di = Control.DraggableItem;
		var cpos = $(this.control.initContainer).position();
		if (di) {
			if (di === this) return false;
			if (this.checkIsChild(di)) return false;

			var ind = Control.dropIndicator;

			if (DropMode == 'after') {
				//document.title = 'drop after ' + this.name;
				ind.style.top = this.position.bottom + cpos.top + 'px';
				ind.style.left = this.position.left + cpos.left + 'px';
				ind.style.width = this.position.right -  this.position.left;
			}
			if (DropMode == 'before') {
				//document.title = 'drop before ' + this.name;
				ind.style.top = this.position.top + cpos.top + ind.offsetHeight + 'px';
				ind.style.left = this.position.left + cpos.left + 'px';
				ind.style.width = this.position.right -  this.position.left + 'px';
			}
			if (DropMode == 'child') {
				//document.title = 'drop as child ' + this.name;
				ind.style.top = this.position.bottom + cpos.top + 'px';
				ind.style.left = this.position.left + cpos.left + 20 + 'px';
				ind.style.width = this.position.right + cpos.left - 20 -  this.position.left + 'px';
			}

			ind.style.display = '';

			setTimeout(__autoExpandSelf, 3239); //MUF
		}
	};

	/**
	* Восстанавливает состояние элемента из режима "контейнер для перемещаемого"
	* @access public
	*/
	this.deInitDroppable = function() {
		if (!Control.dropIndicator) return;
		Control.dropIndicator.style.display = 'none';
		//this.labelControl.className = selected ? 'ti selected' : 'ti'; 
	};
	
	/**
	* Устанавливает фильтр для детей элемента и обновляет содержимое, если потребуется
	* @access public
	* @param _Filter
	*/
	this.applyFilter = function(_Filter, ignoreHierarchy) {
		if(_Filter instanceof Object) {
			this.filter = _Filter;		
		} else {			
			this.filter.clear();
		}
		if(!ignoreHierarchy) this.filter.setParentElements(id);
		if (this.loaded) {
			 			
			this.control.removeItem(id, true);
			this.loaded = false;			
			if(this.isExpanded) this.expand();
		}
	};
	
	this.setSelected = function(_selected) {
		if(_selected) {			
			if(!oldClassName) { 
				oldClassName = 'ti';//labelCtrl.className;
				labelCtrl.className = 'ti selected-highlight';
				if (__self.isDefault) labelCtrl.className += ' main-page';
			}
			selected = true;
		} else {
			if(oldClassName) {
				labelCtrl.className = oldClassName;
				if (__self.isDefault) labelCtrl.className += ' main-page';
				oldClassName        = null;
			}
			selected = false;
		}
	};
	
	this.getSelected = function() {
		return selected;
	};

	// {main}
	__constructor();
};
