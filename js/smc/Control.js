/**
* Control
* Реализация абстрактного контрола, связанного с каким-либо DataSet'ом
* @author Антон Прусов
* @ver    1.0
*/


var Control = function(_oDataSet, _ItemClass, options) {
	/**
	* (Private properties)
	*/
	var __self = this;
	var DataSet 		= _oDataSet;
	var ItemClass		= _ItemClass;
	var options 		= typeof(options) == 'object' ? options : {};
	var ForceDraw 		= typeof(options['draw']) == 'boolean' ? options['draw'] : false;
	var ExpandAll 	    = typeof(options['expandAll']) == 'boolean' ? options['expandAll'] : false;
	var Toolbar         = typeof(options['toolbar']) === 'function' ? options['toolbar'] : false;
	var RootNodeId      = null;
	var RootData = null;
	var CurrentFilter = new filter();
	var Settings        = SettingsStore.getInstance();
	var SelectBehaviour = typeof(options['onItemClick'])    === 'function' ? options['onItemClick']    : function() { return true };
	var SelectCallback  = typeof(options['onItemSelect'])   === 'function' ? options['onItemSelect']   : function() { return true };
	var TargetCallback  = typeof(options['onTargetSelect']) === 'function' ? options['onTargetSelect'] : function() { return true };
	/**
	* (Static properties)
	*/
	Control.instances[Control.instances.length] = this;
	

	/* Public properties */
	this.container = typeof(options['container']) == 'object' ? options['container'] : document.body;
	this.dataSet   = DataSet;
	this.toolbar   = null;
	this.items     = {};
	this.id        = options['id'] || Math.random();
	this.iconsPath = options['iconsPath'] || '/images/cms/admin/mac/tree/';
	this.flatMode = options['flatMode'] || false;
	this.defaultRootMode = options['defaultRootMode'] || false;
	this.objectTypesMode = options['objectTypesMode'] || false;
	this.contentType = options['contentType'] || 'pages';
	this.enableObjectsActivity = options['enableObjectsActivity'] || false;
	this.lastClicked  = null;
	this.selectedList = {};
	this.targetsList  = {};
	this.dragAllowed     = typeof(options['allowDrag']) == 'boolean' ? options['allowDrag'] : true;
	this.onGetValueCallback = typeof(options['onGetValueCallback']) === 'function' ? options['onGetValueCallback'] : function (value, name, item) { return value; };
	this.onDrawFieldFilter = typeof(options['onDrawFieldFilter']) === 'function' ? options['onDrawFieldFilter'] : function (field, th) { return false; };
	this.onRemoveColumn = typeof(options['onRemoveColumn']) === 'function' ? options['onRemoveColumn'] : function (field) { return false; };
	this.initContainer = this.container;
	this.disableCSVButtons = options['disableCSVButtons'] || false;
	this.hideCsvImportButton = options['hideCsvImportButton'] || false;
	/**
	* (Private methods)
	*/

	var __constructor = function() {
		if (ForceDraw) {
			__self.init();
		}
	};

	// event handlers
	var __DataSetInitComplete = function() {

		// create root node if not exists
		if (typeof(__self.items[RootNodeId]) === 'undefined') {
			
			__self.items[RootNodeId] = new ItemClass(__self, null, {
				'id' : (RootNodeId ? RootNodeId : 0),
				'iconbase' : '/images/cms/admin/mac/tree/ico_domain.png'
			});
		}

		__self.items[RootNodeId].draw();

		if (Toolbar) {
			__self.toolbar = new Toolbar(__self);
		}

		if (__self.getItemState(RootNodeId)) {
			__self.items[RootNodeId].expand();
		}

	};


	var __arraySearch = function(arrList, vVal) {
		for (var i = 0; i < arrList.length; i++) {
			if (arrList[i] === vVal) return arrList[i];
		}
		return null;
	};

	var __buildItems = function(arrNodes, oCurrItem, ignoreHirearchy) {
		if (typeof(oCurrItem) != 'object' || typeof(arrNodes) == 'undefined') return false;
		if(!ignoreHirearchy) ignoreHierarchy = false;

		var currId = oCurrItem.id;
		for (var i = 0; i < arrNodes.length; i++) {
			var parentId = (typeof(arrNodes[i]['parentId']) != 'undefined') ? parseInt(arrNodes[i]['parentId']) : 0;

			if (parentId == currId || ignoreHirearchy) {
				var newItemId = parseInt(arrNodes[i]['id']);
				if (__self.items[newItemId]) {
					__self.items[newItemId].update(arrNodes[i]);
				} else {
					__self.items[newItemId] = oCurrItem.appendChild(arrNodes[i]);					
					if (ExpandAll || __self.getItemState(newItemId)) {
						__self.items[newItemId].expand();
					}
				}

				__buildItems(arrNodes, __self.items[newItemId]);
			}
		}
	};

	var __DataSetAfterLoad = function(arrParams) {
		var arrObjs = arrParams['objects'];
		var oFilter = arrParams['filter'];
		var pageing = arrParams['paging'];
		var arrParents = oFilter.getParents();


		var ignoreHierarchy = false;
		if(!arrParents.length) { 
			arrParents = [(RootNodeId ? RootNodeId : 0)];
			ignoreHierarchy = true;
		}
		for (var i = 0; i < arrParents.length; i++) {
			var parentId =  parseInt(arrParents[i]);
			var parent = (typeof(__self.items[parentId]) != 'undefined') ? __self.items[parentId] : __self.items[RootNodeId];
			
			__buildItems(arrObjs, parent, ignoreHierarchy);

			if (parent) {
				parent.setLoaded(true);
				parent.setPageing(pageing);
			}
		}

		Control.recalcItemsPosition();
		if(Control.HandleItem) {
			__self.toolbar.show(Control.HandleItem, true);
		}
	};

	var __DataSetBeforeRefresh = function() {
		__self.removeItem(RootNodeId);
		// restore root
		if (RootData) {
			if (__self.initContainer) __self.container = __self.initContainer;
			var root = __self.setRootNode(RootData, true);
			root.draw();
		}
		Control.recalcItemsPosition();
	};

	var __DataSetAfterExecute = function(arrData) {
		var arrObjs = arrData['objects'];
		var error = arrData['error'];

		var arrParams = arrData['params'];
		var pageing = arrParams['paging'];
		var hItem = arrParams['handle_item'];
		var selItems = arrParams['selected_items'];

		var items = {};
		if (selItems) {
			items = selItems;
		} else if (hItem) {
			items[hItem.id] = hItem;
		}

		var method = arrData['method'];

		if (!error) {
			// delete
			switch (method.toLowerCase()) {
				case 'restore_element' :
				case 'tree_delete_element' : {
					for (var id in items) {
						var itm = items[id];
						__self.removeItem(id);
						delete __self.selectedList[id];
						if (itm.parent && itm.parent.parent) {
							__buildItems(arrObjs, itm.parent.parent);
						}
						
					}
					Control.HandleItem = null;
					if (__self.toolbar) {
						__self.toolbar.hide();
					}
					break;
				}
				
				case 'export' : {
					var i, res = "";
					if(arrData.objects[0].file) {
						window.location = arrData.objects[0].file;
					}
					break;
				}

				case "tree_move_element" : {
					var receiver = arrParams['receiver_item'];
					var before = arrParams['before'] ? receiver.control.getItem(arrParams['before']) : null;
					if (arrObjs.length && hItem && receiver) {
						var itmData = arrObjs[0] || [];
						var newRelData = arrObjs[1] || [];
						var oldRelData = arrObjs[2] || [];

						// update old parent
						if (hItem.parent) hItem.parent.update(oldRelData);
						// update new parent
						receiver.update(newRelData);
						// remove item form old receiver
						hItem.control.removeItem(hItem.id);
						// append item in new receiver
						var itm = null;

						if (arrParams['as-sibling']) {
							//document.title = 'Move "' + hItem.name + '" in ' + receiver.name;
							if (before) {
								//document.title += ' before ' + before.name + ' ['+before.id+']';
								itm = receiver.appendBefore(itmData, before);
							} else {
								//document.title += ' at last';
								itm = receiver.appendChild(itmData);
							}
							
						} else {
							if (receiver.loaded) {
								itm = receiver.appendFirst(itmData);
							}
						}
						if (itm) {
							receiver.control.items[itm.id] = itm;
						}
						
					}

					break;
				}

				default: {
					for (var id in items) {
						var parentId = __self.items[id].parent;
						ignoreHierarchy = (!__self.items[parentId]);
						
						__buildItems(arrObjs, parentId, ignoreHierarchy);
					}
				}
			}

			if (__self.toolbar && hItem === Control.HandleItem) {
				__self.toolbar.show(Control.HandleItem, true);
			}

			Control.recalcItemsPosition();
			Control.PrepareDrag = false;
			Control.startDragItem = null;
			Control.PrepareDrag = false;
			Control.DragMode = false;
		} else {
		    //TODO: Make it beauty
			alert(error);
		}

	};

	/**
	* (Set DataSet Event handlers)
	*/
	DataSet.addEventHandler('onAfterLoad', __DataSetAfterLoad);
	DataSet.addEventHandler('onAfterPieceLoad', __DataSetAfterLoad);
	DataSet.addEventHandler('onInitComplete', __DataSetInitComplete);
	DataSet.addEventHandler('onBeforeRefresh', __DataSetBeforeRefresh);
	DataSet.addEventHandler('onAfterExecute', __DataSetAfterExecute);


	// forse container position
	this.initContainer.style.position = 'relative';
	
	/**

	* Выполняет инициализацию
	*/
	this.init = function() {
		DataSet.init();
		
	};

	this.load = function(_oFilter, _bNeedDraw) {
		DataSet.load(_oFilter);
	};

	this.getItemByPosition = function(mX, mY) {
		var hItem = null;
		for (var id in this.items) {
			if (!this.items[id]) continue;
			var pos = this.items[id].position;
			if (mY > pos.top) {
				if(mY <= pos.bottom) {
					if (mX > pos.left) {
						if (mX <= pos.right) {
							hItem = this.items[id];
							break;
						}
					}
				}
			}
		}

		return hItem;
	};

	this.getItem = function(_ID) {
		if (typeof(this.items[parseInt(_ID)]) == 'object') {
			return this.items[parseInt(_ID)];
		} else {
			return false;
		}
	};

	this.setRootNode = function(_RootData, _skipLoad) {
		RootData = _RootData;
		RootNodeId = _RootData['id'];
		this.items[RootNodeId] =  new ItemClass(__self, null, _RootData);
		if(_skipLoad) this.items[RootNodeId].loaded = true;
		return this.items[RootNodeId];
	};
	
	this.getRootNodeId = function() {
		return RootNodeId;
	};

	this.getRoot = function() {
		return this.items[RootNodeId];
	};

	this.applyBehaviour = function(Item) {
		if (SelectBehaviour) return SelectBehaviour(Item);
		return true;
	};

	/**
	* Сохраняет состояние элемента (свернут/развернут) в профиле пользователя
	* @access public
	*/
	this.saveItemState = function(_ID) {
		var itemId = parseInt(_ID);
		if (this.items[itemId]) {
			var itm = this.items[itemId];
			var expanded = Settings.get(__self.id, "expanded");
			var val = "{" + itm.id + "}";
			if (typeof(expanded) != 'string') expanded = "";
			if (expanded.indexOf(val) !== -1 && !itm.isExpanded) {
				expanded = expanded.replace(val, "");
				Settings.set(__self.id, expanded, "expanded");
				return true;
			} else if (expanded.indexOf(val) === -1 && itm.isExpanded) {
				expanded += val;
				Settings.set(__self.id, expanded, "expanded");
				return true
			} else {
				return false;
			}
		}
	};

	/**
	* Применяет новый фильтр для выбранных элементов
	* @param _oFilter объект класса filter
	* @access public
	*/
	this.applyFilter = function(_oFilter) {
		this.selectItems([]);
		if(_oFilter != undefined && (_oFilter instanceof Object)) {
			CurrentFilter = _oFilter;
		}
		if(!CurrentFilter) return;
		var hasTargets = false;
		for(var i in this.targetsList) {			
			this.targetsList[i].applyFilter(CurrentFilter.clone());
			hasTargets = true;
		}
		if(!hasTargets) __self.items[RootNodeId].applyFilter(CurrentFilter.clone(), true);
	};
	
	/**
	* Возвращает текущий фильтр
	*/
	this.getCurrentFilter = function () {
		return CurrentFilter;
	};
	
	/**
	* Устанавливае/снимает выделение переданного элемента
	* @param _oItem выделяемый элемент
	* @access public
	*/
	this.toggleItemSelection = function(_oItem) {
		if(_oItem) {
			if(_oItem.getSelected()) { 
				_oItem.setSelected();
				delete this.selectedList[_oItem.id];
				SelectCallback(_oItem, false);				
			} else {
				_oItem.setSelected(true);
				this.selectedList[_oItem.id] = _oItem;		
				SelectCallback(_oItem, true);
			}
		}		
	};

	this.toggleRangeSelection = function(_oItem) {
		if(_oItem) {
			if(!this.lastClicked) return;
			var element    =_oItem.element;
			var oldElement = this.lastClicked.element;
			var wrk   = element.parentNode.firstChild;
			var last  = null;
			var selList = [];
			while(wrk) {
				if(!last && wrk == element) {
					last = oldElement;
				}
				if(!last && wrk == oldElement) {
					last = element;
				}
				if(last) {
					selList.push(this.items[wrk.rel]);
				}
				if(wrk == last) break;
				wrk = wrk.nextSibling;
			}
			this.selectItems(selList);
		}
	};
	
	this.setSelectionCallback = function(_Callback, _Replace) {
		if(typeof(_Callback) === 'function') { 
			if(_Replace) {
				SelectCallback = _Callback; 
			} else {
				var h = SelectCallback;
				SelectCallback = function(a, b) { h(a, b); _Callback(a, b); }
			}
		}
	};
	/**
	 * Some dark magic. Don't use it IRL
	 * @return Function callback on item selection
	 */
	this.getSelectionCallback = function() {
		return SelectCallback;
	};
	
	this.selectItems = function(Items) {
		if(!(Items instanceof Array)) Items = [Items];		
		for(var i in this.selectedList)   this.toggleItemSelection(this.selectedList[i]);
		this.selectedList = new Object;
		for(var i=0; i<Items.length; i++) this.toggleItemSelection(Items[i]);		
	};
	
	this.setTargetItems = function(Targets) {
		this.targetsList = {};
		for(var i in Targets) this.targetsList[i] = Targets[i];
		TargetCallback(this.targetsList);
	};
	
	this.isTarget = function(Item) {
		for(var i in this.targetsList) 
			if(this.targetsList[i] == Item) return true;
		return false;
	};
	
	this.setTargetSelectCallback = function(_Callback) {
		if(typeof(_Callback) === 'function') TargetCallback = _Callback; 
	};

	this.getItemState = function(_ID) {
		var itemId = parseInt(_ID);

		if (this.items[itemId]) {
			var itm = this.items[itemId];
			if (!itm.hasChilds) return false;
			var expanded = Settings.get(__self.id, "expanded");
			var val = "{" + itm.id + "}";
			if (typeof(expanded) != 'string') expanded = "";
			return (expanded.indexOf(val) !== -1);
		}
	};

	this.removeItem = function(_ID, keepSelf) {
		var itemId = parseInt(_ID);
		if (this.items[itemId]) {
			var itm = this.items[itemId];
			var parent = itm.parent;
			for (var j = 0; j < itm.childs.length; j++) {
				this.removeItem(itm.childs[j]);
			}
			itm.childs = [];
			if(!keepSelf) {
				this.items[itemId] = false;
				itm.clear();
			}
		};
	};

	this.expandAll = function() {
		ExpandAll = true;
		for (id in this.items) {
			this.items[id].expand();
		}
	};

	this.collapseAll = function() {
		ExpandAll = false;
		for (id in this.items) {
			this.items[id].collapse();
		}
	};

	this.recalcItemsPosition = function() {
		for (id in this.items) {
			if (this.items[id]) this.items[id].recalcPosition();
		}
	};

	__constructor();
};

// static properties
Control.DragMode = false;
Control.PrepareDrag = false;
Control.startDragX = 0;
Control.startDragY = 0;
Control.startDragItem = null;

Control.DragSensitivity = 7; //SMF
Control.HandleItem = null;
Control.DraggableItem = null;
Control.instances = new Array();
Control.enabled = true;

Control.getInstanceById = function(sId) {
	for (var i = 0; i < Control.instances.length; i++) {
		if (Control.instances[i].id === sId) return Control.instances[i];
	}
	return null;
};

// static methods
Control.recalcItemsPosition = function() {
	for (var i = 0; i < Control.instances.length; i++) {
		Control.instances[i].recalcItemsPosition();
	}
};


// define common observers
Control.detectItemByMousePointer = function(x, y) {
	var HandleItem = Control.HandleItem;
	if(HandleItem) {
		var cpos = $(HandleItem.control.initContainer).position();
		var pos = HandleItem.position;
		if (y > pos.top + cpos.top && y <= pos.bottom + cpos.top && x > pos.left + cpos.left && x <= pos.right + cpos.left) {
			return HandleItem;
		}
	}

	var hItem = null;
	for (var i = 0; i < Control.instances.length; i++) {
		var Inst = Control.instances[i];
		var cpos = $(Inst.initContainer).position();
		hItem = Inst.getItemByPosition(x - cpos.left, y - cpos.top);
		if (hItem) break;
	}
	
	return hItem;
};

Control.recalcSelectedItems = function(event) {
	if (!Control.instances.length) return;
	if (Control.DragMode) return;
	if (!Control.enabled) return;
	var el = event.target;
	var tn = el.tagName.toLowerCase();
	if (tn == 'textarea' || tn == 'input' || tn == 'select' || tn == 'option') return;

	var x = event.pageX;
	var y = event.pageY;

	var hItem = Control.detectItemByMousePointer(x, y);

	Control.HandleItem = hItem;

	for (var i = 0; i < Control.instances.length; i++) {
		if (Control.instances[i].toolbar) {
			Control.instances[i].toolbar.hide();
		}
	}

	if (hItem) {
		var tshow = true;
		if (hItem.control.toolbar && tshow) {
			hItem.control.toolbar.show(hItem);
		}
	}
};

$(document).bind('mousemove', Control.recalcSelectedItems);

$(document).bind('mousedown', function(event) {
	Control.recalcSelectedItems(event);

	if (!Control.HandleItem) return;

	if (event.button != 0) return; // not Left click
	if (!Control.enabled) return;
	
	var el = event.target;
	
	if (el.className.toLowerCase() != 'ti-toggle') {
		Control.PrepareDrag = true;
		Control.startDragItem = Control.HandleItem;
		Control.startDragX = event.pageX;
		Control.startDragY = event.pageY;
	}
});


$(document).bind('mouseup', function(event) {
	if (!Control.enabled) return;

	if(!Control.DragMode && Control.HandleItem) {
		if(event.altKey) {
			// Nothig to do with selection
		} else if(event.ctrlKey || event.metaKey) {
			Control.HandleItem.control.toggleItemSelection(Control.HandleItem);
		} else if(event.shiftKey) {
			Control.HandleItem.control.toggleRangeSelection(Control.HandleItem);
		} else {
			var el = event.target;
			if (el.className.toLowerCase() != 'ti-toggle') {
				var doSelect = true;
				if (event.button == 2) {
					for(var i in Control.HandleItem.control.selectedList) {
						if(Control.HandleItem.control.selectedList[i].id == Control.HandleItem.id) doSelect = false;
					}
				}
				if(doSelect)
					Control.HandleItem.control.selectItems(Control.HandleItem);
			}
		}
		Control.HandleItem.control.lastClicked = Control.HandleItem;

	}
	Control.PrepareDrag = false;
	Control.startDragItem = null;
	Control.DragMode = false;
	
});


$(window).bind('resize', function(event) {
	Control.recalcItemsPosition();
});

function createAddButton(oButton, oControl, sAddLink, aTypes) {
	oButton.ControlInstance = oControl;
	var _SelectionCallback = function() {
		var Count = 0;
		var id    = null;
		var Allow = false;
		var i; 
		for(i in oControl.selectedList) { 
			Count++;			
			id = i;			
		}		
		for(i = 0; i<aTypes.length; i++) {
			if((id == null && aTypes[i] === true)
				 || (id != null && (aTypes[i] === oControl.selectedList[id].baseMethod
				 || aTypes[i] === '*'))) {
					Allow = true;
					break;
			}
		}		
		var _sAddLink = sAddLink.replace(/\{id\}/, (id || '0'));
		_sAddLink = _sAddLink.replace(/\{\$param0\}/, (id || '0'));
		_sAddLink = _sAddLink.replace(/\{\$pre_lang\}/, window.pre_lang);
		var domainSelect = document.getElementById("domainSelect" + oControl.id);
		if(domainSelect) {
			var domain = domainSelect.options[domainSelect.selectedIndex].text;
			if(_sAddLink.indexOf("?") != -1) _sAddLink = _sAddLink + "&domain=" + domain;
			else _sAddLink = _sAddLink + "?domain=" + domain;
		}
		oButton.addLink = _sAddLink;				
		for(var i=0; i<oButton.linkCache.length; i++) {
			oButton.linkCache[i].href = oButton.addLink;
			oButton.linkCache[i]['param0'] = (id || '0');
		}
		if(oButton.tagName.toLowerCase() == 'a') {
			oButton.href   = oButton.addLink;
			oButton.param0 = (id || '0');
		}
		var needPositionRecalc = false;
		if(Count > 1 || !Allow) {
			if(oButton.style.display != 'none') {
				oButton.style.display = 'none';
				needPositionRecalc = true;
			}	
		} else {
			if(oButton.style.display == 'none') {
				oButton.style.display = '';
				needPositionRecalc = true;
			}	
		}		
		if(needPositionRecalc) {
			Control.recalcItemsPosition();
		}		
	};
	oControl.setSelectionCallback( function(a,b){setTimeout(_SelectionCallback, 100);} );
	
	var _sAddLink = sAddLink.replace(/\{id\}/, '0');
	_sAddLink = _sAddLink.replace(/\{\$param0\}/, '0');
	_sAddLink = _sAddLink.replace(/\{\$pre_lang\}/, window.pre_lang);
	oButton.addLink   = _sAddLink;
	oButton.linkCache = oButton.getElementsByTagName('a');
	_SelectionCallback();
};
