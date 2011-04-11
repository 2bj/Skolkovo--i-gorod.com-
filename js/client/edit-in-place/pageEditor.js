$.ajaxSetup({
  cache: false
});

var uPageEditor = function () {
	var editNodes = [], listNodes = [], self = this, highlighted = false, previousEditBox = null;
	var enabled = false;
	this.queue = new uRevisionsQueue(this);

	this.enable = function () {
		finishLast();
		self.inspectDocument();
		self.highlight();
		uPageEditor.normalizeBoxes();
		
		setTimeout(function () {
			uPageEditor.normalizeBoxes();
		}, 1000);
		
		enabled = true;
		
		var date = new Date();
		date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
		jQuery.cookie('eip-editor-state', 'enabled', { path: '/', expires: date});
		
		uPageEditor.onEnable();
		uPageEditor.message('Редактирование страницы включено.');
	};
	
	this.disable = function () {
		finishLast();
		self.unhighlight();
		
		enabled = false;
		
		jQuery.cookie('eip-editor-state', '', { path: '/', expires: 0});
		uPageEditor.onDisable();
		uPageEditor.message('Редактирование страницы отключено.');
		
		if(self.queue.isModified()) {
			if(confirm('Сохранить изменения?')) {
				self.submit();
			}
		}
	};
	
	this.isEnabled = function () {
		return enabled;
	};
	
	this.cancel = function () {
		finishLast();
		this.queue.cancel();
		
		uPageEditor.message('Все изменения отменены.');
	};
	
	this.submit = function () {
		finishLast();
		this.queue.submit();
	};
	
	this.back = function (step) {
		finishLast();
		this.queue.back(step);
	};
	
	this.forward = function (step) {
		finishLast();
		this.queue.forward(step);
	};


	/**
		* Найти все помеченные области, пригодные для редактирования
	*/
	this.inspectDocument = function () {
		editNodes = [];
		listNodes = [];
		
		var regions = uPageEditor.getRegions();
		regions.each(function (index, node) {
			if(jQuery(node).css('display') == 'none') return;
			inspectNode(node);
		});
	};

	var isParentOf = function (seekNode, excludeNode) {
		if(!excludeNode || !seekNode) return false;
		if(excludeNode == seekNode) return true;
		if(seekNode.parentNode) {
			return isParentOf(seekNode.parentNode, excludeNode);
		}
		return false;
	};
	
	var htmlTrim = function (html) {
		html = jQuery.trim(html);
		return html.replace(/<br ?\/?>/g, '').replace(/<p><\/p>/g, '');
	};

	/**
		* Подсветить все редактируемые области
	*/
	this.highlight = function (excludeNode, skipListNodes) {
		if(highlighted) this.unhighlight();
		highlighted = true;
		
		jQuery(editNodes).each(function (index, node) {
			if(isParentOf(node, excludeNode) == false) self.highlightNode(node);
		});
		
		if(!skipListNodes) {
			jQuery(listNodes).each(function (index, node) {
				if(isParentOf(node, excludeNode) == false) {
					self.highlightListNode(node);
				}
			});
		}
		
		uPageEditor.onRepaint();


		setTimeout(function () {
			jQuery('.u-eip-edit-box').each(function (i, node) {
				var color = new RGBColor(jQuery(node).css('color'));
				var colorHash = color.toHash();
				var alpha = (colorHash['red'] / 255 + colorHash['green'] / 255 + colorHash['blue'] / 224) / 3;
				
				if(alpha >= 0.9) {
					jQuery(node).addClass('u-eip-edit-box-inversed');
				}
			});
		}, 500);
	};


	/**
		* Снять подсветку с редактируемых блоков
	*/
	this.unhighlight = function () {
		jQuery('.u-eip-edit-box').each(function (index, node) {
			node = jQuery(node);
			var empty = node.attr('umi:empty');
			if(empty && (node.attr('tagName') != 'IMG') && (node.html() == empty)) {
				node.html('');
			}
			
			node.attr('title', '');
		});
		
		
		var n = jQuery('.u-eip-edit-box');
		n.removeClass('u-eip-edit-box u-eip-edit-box-hover u-eip-modified u-eip-deleted u-eip-edit-box-inversed');

		n.unbind('click');
		n.unbind('mouseover');
		n.unbind('mouseout');
		n.unbind('mousedown');
		n.unbind('mouseup');
		
		jQuery('.u-eip-add-box, .u-eip-add-button, .u-eip-del-button').remove();
		
		jQuery('.u-eip-sortable').sortable('destroy');
		jQuery('.u-eip-sortable').removeClass('u-eip-sortable');
	};

	/**
		* Редактировать элемент
	*/
	this.edit = function (node) {
		finishLast();
		jQuery('.eip-del-button').remove();
		
		previousEditBox = new editBox(this, node);

		jQuery(node).removeClass('u-eip-edit-box u-eip-edit-box-hover u-eip-modified u-eip-deleted u-eip-empty-field');

		jQuery(node).addClass('u-eip-editing');
		var empty = htmlTrim(jQuery(node).attr('umi:empty'));
		if(empty && htmlTrim(jQuery(node).html()) == empty) {
			jQuery(node).html('&nbsp;');
			var className = jQuery(node).attr('class');
			jQuery(node).removeClass('u-eip-empty-field');
		}
	};
	
	
	var finishLast = function () {
		if(previousEditBox) {
			previousEditBox.finish(true);
			previousEditBox = null;
		}
	};
	
	/**
		* Проверить и при необходимости занести в редактируемый список html-элемент
	*/
	var inspectNode = function(node) {
		if(node.tagName == 'TABLE') return;
		if(jQuery(node).attr('umi:field-name')) editNodes.push(node);
		if(jQuery(node).attr('umi:module')) listNodes.push(node);
		// Fix editing behaviour for links child elements in ie
		if(jQuery.browser.msie) {
			jQuery(node).parents("a:first").each(function() {
													var href = this.href;
													jQuery(this).click(function(e) { if(e.ctrlKey) window.location.href = href; });
													this.removeAttribute("href");
												});
		}
	};
	
	this.getEditNodes = function () {
		return editNodes;
	};
	
	this.getListNodes = function () {
		return listNodes;
	};

	/**
		* Подсветить редактируемый html-элемент
	*/
	this.highlightNode = function (node) {
		var x, y, width, height;
		if(!jQuery(node).attr('umi:field-name')) return;
		if(!uPageEditor.searchAttr(node, 20)) return;
		
		var empty = htmlTrim(jQuery(node).attr('umi:empty'));
		
		if(empty && htmlTrim(jQuery(node).html()) == '' && (jQuery(node).attr('tagName') != 'IMG')) {
			try{
				jQuery(node).html(empty);
			} catch(e) {}
			jQuery(node).addClass('u-eip-empty-field');
		}
		
		jQuery(node).addClass('u-eip-edit-box');
		

		
		
		if(node.tagName == 'A' || node.parentNode.tagName == 'A' || jQuery('a', node).size() > 0) {
			jQuery(node).attr('title', 'Нажмите Ctrl+левая кнопка мыши, чтобы перейти по ссылке.');
		} else {
			jQuery(node).attr('title', '');
		}
	};


	this.highlightListNode = function (node) {
		var x, y, width, height;
		if(!jQuery(node).attr('umi:module')) return;

		var box = document.createElement('div');
		document.body.appendChild(box);
		node.boxNode = box;

		var position = uPageEditor.nodePositionInfo(node);
		if(!position.x && !position.y) return;
		
		jQuery(box).attr('class', 'u-eip-add-box');

		
		jQuery(box).css({
			'position':		'absolute',
			'width':		position.width,
			'height':		position.height,
			'left':			position.x,
			'top':			position.y
		});
		
		//Add button
		var button = document.createElement('img');
		node.addButtonNode = button;
		jQuery(button).attr({
			'class':		'u-eip-add-button',
			'src':			'/images/cms/eip/add-button.gif'
		});
		jQuery(button).hover(function () {
			jQuery(this).addClass('u-eip-add-button-hover');
		}, function () {
			jQuery(this).removeClass('u-eip-add-button-hover');
		});


		var fDim = 'bottom';
		var sDim = 'left';
		var userPos;
		if(userPos = jQuery(node).attr('umi:button-position')) {
			var arr = userPos.split(/ /);
			if(arr.length == 2) {
				fDim = arr[0];
				sDim = arr[1];
			}
		}
		
		if(jQuery(node).attr('umi:add-method') != 'none') {
			uPageEditor.placeWith(node, button, fDim, sDim);

			var elementId = jQuery(node).attr('umi:element-id');
			var module = jQuery(node).attr('umi:module');
			var method = jQuery(node).attr('umi:method');
			jQuery(button).bind('mouseup', function () {
				var regionType = jQuery(node).attr('umi:region');
				var addMethod = jQuery(node).attr('umi:add-method');
				var rowNode = uPageEditor.searchRow(node);
				
				if(rowNode && (regionType == 'list' || addMethod != 'popup')) {
					self.inlineAddPage(node);
				} else {
					if(self.queue.isModified()) {
						uPageEditor.message('Остались несохраненные именения, которые нужно либо сохранить, либо отменить перед созданием новой страницы.');
						return;
					}
	
					var url = '/admin/content/eip_add_page/choose/' + parseInt(elementId) + '/' + module + '/' + method + '/';
					jQuery.openPopupLayer({
						'name'   : "CreatePage",
						'title'  : "Создание страницы",
						'url'    : url
					});
				}
			});
			
			
			jQuery(button).hover(function () {
				jQuery(box).addClass('u-eip-add-box-hover');
			}, function () {
				jQuery(box).removeClass('u-eip-add-box-hover');
			});
			
			document.body.appendChild(button);
		}

		var oldNextItem = null, oldParentId = null, isSorting = false;
		if('sortable' == jQuery(node).attr('umi:sortable')) {
			jQuery(node).addClass('u-eip-sortable');
			
			
			var connectedLists = new Array();
			var i = 0;
			jQuery('*', document.body).each(function (i, n) {
				if(n.tagName == 'TABLE') return;
				if(jQuery(n).attr('umi:sortable') != 'sortable') return;
				if(jQuery(n).attr('umi:module') != module) return;
				
				connectedLists.push(n);
			});
			
			jQuery(node).sortable({
				'tolerance': 'pointer',
				'cursor': 'move',
				'connectWith': connectedLists,

				'start': function (event, ui) {
					var movingItem = ui.item[0];
					var nextItem = movingItem.nextSibling;
					
					do {
						if(!nextItem) break;
						if(nextItem.nodeType != 1) continue;
						if(uPageEditor.searchRowId(nextItem)) break;
					} while(nextItem = nextItem.nextSibling);
					
					oldNextItem = nextItem;
					
					var parentInfo = uPageEditor.searchAttr(movingItem.parentNode, function (node) {
						return jQuery(node).attr('umi:region') == 'list';
					});
					
					oldParentId = parseInt(parentInfo ? parentInfo['element-id'] : null);
					
					isSorting = true;
				},
			
				'update': function (event, ui) {
					if(!isSorting) return; else isSorting = false;
					
					var movedItem = ui.item[0];
					var movedItemId = uPageEditor.searchRowId(movedItem);
					var nextItem = movedItem.nextSibling;
					
					do {
						if(!nextItem) break;
						if(nextItem.nodeType != 1) continue;
						if(uPageEditor.searchRowId(nextItem)) break;
					} while(nextItem = nextItem.nextSibling);
					
					var nextItemId = nextItem ? uPageEditor.searchRowId(nextItem) : null;
					
					
					var parentInfo = uPageEditor.searchAttr(movedItem.parentNode, function (node) {
						return jQuery(node).attr('umi:region') == 'list';
					});
					var parentId = parseInt(parentInfo ? parentInfo['element-id'] : null);

					if(parentId == 0 || oldParentId == 0) {
						if(parentId != oldParentId) return false;
					}

					jQuery.get('/admin/content/eip_move_page/' + movedItemId + '/' + nextItemId + '.xml?parent-id=' + parentId, function (data) {
						uPageEditor.message('Страница перемещена');
					});
					
					oldNextItem = null;
					oldParentId = null;
					uPageEditor.normalizeBoxes();
				}
			});
		}
		
		return box;
	};
	
	var cleanupAddRow = function (originalRow, elementId, objectId, prepend) {
		var rowNode = jQuery(originalRow).clone();
		var _id = elementId ? elementId : objectId;
		var _attr = elementId ? 'umi:element-id': 'umi:object-id';
		
		var cleanTags = function (node) {
			if(jQuery(node).attr('tagName') == 'TABLE') return;
			
			if(jQuery(node).attr('umi:field-name')) {
				var empty = jQuery(node).attr('umi:empty');
				if(jQuery(node).attr('tagName') == 'IMG' && empty) {
					jQuery(node).attr('src', empty);
				} else {
					jQuery(node).html(empty ? empty : '');
				}
				
				jQuery(node).addClass('u-eip-empty-field');
				editNodes[editNodes.length] = node;
			}
			
			if(jQuery(node).attr(_attr)) {
				jQuery(node).attr(_attr, _id);
			}
		};
		
		if(!originalRow) {
			alert("Error, umi:region=row is not defined");
			return false;
		}
		
		//Delete subregions
		jQuery('*', rowNode).each(function (index, node) {
			var node = jQuery(node);
			if(node.attr('umi:region') == 'row') {
				node.remove();
			}
		});
		
		// Append new row
		var parentNode = originalRow.parentNode;
		var newRowNode = (prepend) ? rowNode.prependTo(parentNode) : rowNode.appendTo(parentNode);
		
		if(jQuery(newRowNode).attr(_attr)) {
			jQuery(newRowNode).attr(_attr, _id);
		}
		
		cleanTags(newRowNode);
		var subnodes = jQuery('*', newRowNode);
		subnodes.each(function (index, node) {
			cleanTags(node);
		});
		
		uPageEditor.onAfterInlineAdd(newRowNode);
	};
	
	this.inlineAddPage = function (node) {
		var parentId = parseInt(jQuery(node).attr('umi:element-id'));
		var typeId = jQuery(node).attr('umi:type-id');
		
		// Search row
		var rowNode = uPageEditor.searchRow(node);
		var prepend = (jQuery(node).attr('umi:method') == 'lastlist');
		//Send ajax request to add new element
		var uri = '/admin/content/eip_quick_add/' + parentId + '.xml?type-id=' + typeId;
		
		if(jQuery(node).attr('umi:module') != 'data') {
			uri += '&force-hierarchy=1';
		}
		
		jQuery.get(uri, function (data) {
			// Recieve new element id
			var elementId = parseInt(jQuery('data', data).attr('element-id'));
			var objectId = parseInt(jQuery('data', data).attr('object-id'));
			
			//Clean up cloned node with new element id or new object id
			cleanupAddRow(rowNode, elementId, objectId, prepend);
			
			// Redraw edit boxes
			uPageEditor.normalizeBoxes();
		});
	};


	this.bindEvents = function () {
		var nodes = jQuery('.u-eip-edit-box');
		nodes.die('click');
		nodes.unbind('click');
		
		nodes.live('click', function (e) {
			var node = e.target;
			if(e.ctrlKey) {
				return true;
			}
			
			var handler = (typeof node.onclick == 'function') ? node.onclick : function () {};
			var nullHandler = function () { return false; };
			node.onclick = nullHandler;
			setTimeout(function () {
				if(node && handler != nullHandler) {
					node.onclick = handler;
				}
			}, 100);

			for(var i = 0; i < 25; i++) {
				if(!node) return false;
				if(node.tagName != 'TABLE' && jQuery(node).attr('umi:field-name')) break;
				node = node.parentNode;
			}
			if(!node) return;
//			jQuery(document).unbind('click');
			self.edit(node);
			return false;
		});
		
		jQuery(document).unbind('keydown');
		jQuery(document).keydown(function (e) {
			if(e.keyCode == 113) {
				if(enabled) self.disable(); else self.enable();
				return false;
			}
			
			if(e.ctrlKey) {
				switch(e.keyCode) {
					case 83: self.submit(); break;
					case 90: self.back(1); break;
					case 89: self.forward(1); break;
					default: return true;
				}
				return false;
			}
			
			return true;
		});
		
		
		window.onbeforeunload = function () {
			if(self.queue.isModified()) {
				return "Остались несохраненные изменения. Если вы покинете эту страницу, то эти изменения будут утеряны.";
			}
		};
	};
	
	
	this.deletePage = function (elementId, objectId) {
		this.queue.add({
			'element-id':		elementId,
			'object-id':		objectId,
			'delete-action':	true
		});
		uPageEditor.normalizeBoxes();
		uPageEditor.message('<strong>Страница будет удалена после нажатия на кнопку "Сохранить".</strong>');
	};
	
	var init = function () {
		var timeoutId = null;
		var dropDeleteButtons = function () {
			jQuery('.eip-del-button').remove();
		};
		
		jQuery('.u-eip-edit-box').live('mouseover', function () {
			jQuery(this).addClass('u-eip-edit-box-hover');
			var info = uPageEditor.searchAttr(this, 20);
			if(jQuery(this).attr('umi:delete') && (info['element-id'] || info['object-id'])) {
				if(timeoutId) clearInterval(timeoutId);
				dropDeleteButtons();
				
				var deleteButton = document.createElement('div');
				jQuery(deleteButton).attr('class', 'eip-del-button');
				document.body.appendChild(deleteButton);
				uPageEditor.placeWith(this, deleteButton, 'right', 'middle');
				
				jQuery(deleteButton).bind('mouseover', function () {
					if(timeoutId) clearInterval(timeoutId);
				});
				
				jQuery(deleteButton).bind('mouseout', function () {
					timeoutId = setTimeout(dropDeleteButtons, 500);
				});
				
				var elementId = info['element-id'];
				var objectId = info['object-id'];
				jQuery(deleteButton).bind('click', function () {
					self.deletePage(elementId, objectId);
				});
			} else dropDeleteButtons();
			
			this.onclick = function (e) {
				this.onclick = function () { return true; };
				if(window.event) {
					return window.event.ctrlKey;
				} else {
					return e.ctrlKey;
				}
			};
		});
		
		jQuery('.u-eip-edit-box-hover').live('mouseout', function (e) {
			jQuery(this).removeClass('u-eip-edit-box-hover');
			
			if(jQuery(this).attr('umi:delete')) {
				var node = this;
				timeoutId = setTimeout(dropDeleteButtons, 500);
			}
			
			this.onclick = function () {
				return true;
			};
		});
		
		
		window.onresize = function () {
			uPageEditor.normalizeBoxes();
		};

		self.bindEvents();
	};
	init();
};

uPageEditor.onInit = typeof uPageEditorOnInit == 'function' ? uPageEditorOnInit : function () {};


if(typeof uPageEditor.onStep != 'function') uPageEditor.onStep = function () {};
if(typeof uPageEditor.onEnable != 'function') uPageEditor.onEnable = function () {};
if(typeof uPageEditor.onDisable != 'function') uPageEditor.onDisable = function () {};
if(typeof uPageEditor.onRepaint != 'function') uPageEditor.onRepaint = function () {};


/**
	* Получить позиционные параметры html-элемента
*/
uPageEditor.nodePositionInfo = function (node) {
	var node = jQuery(node), cssDisplay = jQuery(node).css('display');
	
	return {
		'width':	node.innerWidth(),
		'height':	node.innerHeight(),
		'x':		node.offset().left,
		'y':		node.offset().top
	};
};


//Apply original styles for temporary document node
uPageEditor.applyStyles = function (originalNode, targetNode) {
	var styles = [
	    'font-size', 'font-family', 'font-name',
	    'margin-left', 'margin-right', 'margin-top', 'margin-bottom',
	    'font-weight'
	], i;
	originalNode = jQuery(originalNode);
	targetNode = jQuery(targetNode);
	
	for(i in styles) {
		var ruleName = styles[i];
		targetNode.css(ruleName, originalNode.css(ruleName));
	}
	
	targetNode.width(originalNode.outerWidth());
	targetNode.height(originalNode.outerHeight());
};

uPageEditor.getRegions = function () {
	var Mozilla = (navigator.appName.indexOf("Netscape") != -1);
	if(Mozilla) {
		var nodes = jQuery('*[umi\\:field-name], *[umi\\:module]');
		if(nodes.size()) return nodes;
	}
	return jQuery('*', document.body);
};


uPageEditor.message = function (msg) {
	jQuery.jGrowl('<p>' + msg + '</p>', {
		'header': 'UMI.CMS',
		'life': 10000
	});
};


uPageEditor.normalizeBoxes = function (nodes) {
	var editor = uPageEditor.get();

	jQuery(editor.getEditNodes()).each(function (index, node) {
		uPageEditor.markBoxes(node);
	});

	jQuery(editor.getListNodes()).each(function (index, node) {
		if(!node.boxNode) return;
		
		var oldPosition = uPageEditor.nodePositionInfo(node.boxNode);
		var position = uPageEditor.nodePositionInfo(node);
		jQuery(node.boxNode).css({
			'width':		position.width,
			'height':		position.height,
			'left':			position.x,
			'top':			position.y
		});
		
		var button = node.addButtonNode;
		var fDim = 'bottom', sDim = 'left';
		if(button) {
			var userPos;
			if(userPos = jQuery(node).attr('umi:button-position')) {
				var arr = userPos.split(/ /);
				if(arr.length == 2) {
					fDim = arr[0];
					sDim = arr[1];
				}
			}
			uPageEditor.placeWith(node, button, fDim, sDim);
		}
	});
	uPageEditor.onRepaint();
};

uPageEditor.markBoxes = function (node) {
	var editor = uPageEditor.get(), region = jQuery(node);
	var info = uPageEditor.searchAttr(node, 10), revision;
	info['field-name'] = region.attr('umi:field-name');
	
	if(revision = editor.queue.searchByInfo(info)) {
		jQuery(node).addClass('u-eip-modified');
		if(revision.isDeleteAction()) {
			jQuery(node).addClass('u-eip-deleted');
		}
	} else {
		jQuery(node).unbind('mouseover');
		jQuery(node).unbind('mouseout');
		
		jQuery(node).removeClass('u-eip-modified u-eip-deleted');
	}
};

uPageEditor.searchAttr = function (node, deep, first, callback) {
	if(!deep || !node) return false;
	if(node.tagName == 'BODY' || node.tagName == 'TABLE') return false;

	//WT strange condition ??
	if(true || jQuery(node).attr('umi:field-name') || first) {
		if(typeof callback != 'function' || callback(node)) {
			if(jQuery(node).attr('umi:element-id')) return {'element-id': jQuery(node).attr('umi:element-id')};
			if(jQuery(node).attr('umi:object-id')) return {'object-id': jQuery(node).attr('umi:object-id')};
		}
	}
	if(node.parentNode) return uPageEditor.searchAttr(node.parentNode, --deep, false, callback);
	return false;
};

uPageEditor.searchRow = function (node) {
	var result = null;
	jQuery('*', node).each(function (index, cNode) {
		if(result) return;
		var regionType = jQuery(cNode).attr('umi:region');
		if(!regionType) return;
		result = cNode;
	});
	return result;
};

uPageEditor.searchRowId = function (node) {
	var elementId = null;
	if(elementId = jQuery(node).attr('umi:element-id')) {
		return elementId;
	}
	
	jQuery('*', node).each(function (index, cNode) {
		if(elementId) return;
		elementId = jQuery(cNode).attr('umi:element-id');
	});
	return elementId;
};


uPageEditor.placeWith = function (placer, node, fDim, sDim) {
	if(!placer || !node) return;
	var position = uPageEditor.nodePositionInfo(placer);

	var x, y;
	switch(fDim) {
		case 'top':
			y = position.y - parseInt(jQuery(node).css('height'));
			break;

		case 'right':
			x = position.x + position.width;
			break;
		
		case 'left':
			x = position.x - jQuery(node).width();
			break;
		
		default:
			y = position.y + position.height;
	}
	
	if(fDim == 'top' || fDim == 'bottom') {
		switch(sDim) {
			case 'right':
				x = position.x + position.width - jQuery(node).width();
				break;
				
			case 'middle':
			case 'center':
				if(position.width - parseInt(jQuery(node).css('width')) > 0) {
					x = position.x + Math.round((position.width - jQuery(node).width()) / 2);
				} else x = position.x;
				break;
			
			default: x = position.x;
			x += parseInt(jQuery(placer).css('padding-left'));
		}
	} else {
		switch(sDim) {
			case 'top':
				y = position.y;
				break;
			
			case 'bottom':
				y = position.y + position.height - parseInt(jQuery(node).css('height'));
				break;
			
			default:
				if(position.height - parseInt(jQuery(node).css('height')) > 0) {
					y = position.y + Math.round((position.height - parseInt(jQuery(node).css('height'))) / 2);
				} else y = position.y;
		}
	}
	try {
		jQuery(node).css({
			'position':		'absolute',
			'left':			x + 'px',
			'top':			y + 'px',
			'z-index':		560
		});
	} catch(e) {};
};

uPageEditor.instance = null;
uPageEditor.get = function () {
	if(!uPageEditor.instance) {
		uPageEditor.instance = new uPageEditor;
		uPageEditor.onInit();
	}
	return uPageEditor.instance;
};

uPageEditor.cleanupHTML = function (html) {
		var strict = true;

		html = html.replace(/<![\s\S]*?--[ \t\n\r]*>/ig, ' ');
		html = html.replace(/<!--.*?-->/ig, ' ');
		html = html.replace(/<\/?(title|style|font|meta)\s*[^>]*>/ig, '');
		html = html.replace(/\s*mso-[^:]+:[^;""]+;?/ig, '');
		html = html.replace(/<\/?o:[^>]*\/?>/ig, '');
		html = html.replace(/ style=['"]?[^'"]*['"]?/ig, '');

		if(strict) html = html.replace(/ class=['"]?[^'">]*['"]?/ig, '');

		html = html.replace(/<span\s*[^>]*>\s*&nbsp;\s*<\/span>/ig, '');
		html = html.replace(/<span\s*[^>]*>/ig, '');
		html = html.replace(/<\/span\s*[^>]*>/ig, '');

		// Glue
		html = html.replace(/<\/(b|i|s|u|strong|center)>[\t\n]*<\1[^>]*>/gi, "");
		html = html.replace(/<\/(b|i|s|u|strong|center)>\s*<\1[^>]*>/gi, " ");
		// Cut epmty
		html = html.replace(/<(b|i|s|u|strong|center)[^>]*>[\s\t\n\xC2\xA0]*<\/\1>/gi, "");
		// Cut trash symbols
		html = html.replace(/(\t|\n)/gi, " ");
		html = html.replace(/[\s]{2,}/gi, " ");

		if(jQuery.browser.safari) {
			html = html.replace(/\bVersion:\d+\.\d+\s+StartHTML:\d+\s+EndHTML:\d+\s+StartFragment:\d+\s+EndFragment:\d+\s*\b/gi, "");
		}
		
		return html;
};




//Date utility functions
Date.prototype.getFormattedDate = function (full) {
	var format = function (num) { return (num >= 10) ? num : '0' + num; };
	
	var year = this.getFullYear();
	var month = format(this.getMonth() + 1);
	var day = format(this.getDate());
	var hours = format(this.getHours());
	var minutes = format(this.getMinutes());
	
	if(full) {
		return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
	} else {
		return hours + ':' + minutes;
	}
};

Date.createDate = function (str) {
	var date = new Date;
	var year = str.substr(0, 4);
	var month = str.substr(5, 2) - 1;
	var day = str.substr(8, 2);
	var hours = str.substr(11, 2);
	var minutes = str.substr(14, 2);
	
	date.setYear(year);
	date.setMonth(month);
	date.setDate(day);
	date.setHours(hours);
	date.setMinutes(minutes);
	
	return date;
};

uPageEditor.onPasteCleanup = true;
uPageEditor.onAfterInlineAdd = function () {};