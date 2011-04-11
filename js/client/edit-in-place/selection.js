var selections = function (targetWindow, container) {
	var _window = targetWindow, _container = container, _rng = null;
	var ie = document.selection && window.ActiveXObject && /MSIE/.test(navigator.userAgent);


	var _getSelection = function () {
		var doc = _window.document;
		if(doc.selection) {
			var type = doc.selection.type;
			return (type == "Text" || type == "None") ? doc.selection : null;
		}
	
		if(_window.getSelection) {
			return _window.getSelection();
		}
		return null;
	};


	var _createRange = function () {
		var sel = _getSelection();
		
		if(sel) {
			if(sel.createRange) {
				return sel.createRange();
			}
	
			if(sel.rangeCount && sel.getRangeAt) {
				return sel.getRangeAt(0);
			}
		}
		return null;
	};


	var _select = function (range) {
		if(range.select) {
			range.select();
		} else {
			var sel = _getSelection();
			if(sel.removeAllRanges && sel.addRange){
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	};


	var _createNode = function (tag, attrs, html) {
		var node = document.createElement(tag), i;
		for(i in attrs) {
			node.setAttribute(i, attrs[i]);
		}
		if(html) node.innerHTML = html;
		return node;
	};


	var _selectionRange = function () {
		var sel = _getSelection();
		return (!sel || sel.rangeCount == 0) ? false : sel.getRangeAt(0);
	};
	
	var _isAncestorOf = function (childNode, parentNode) {
		if(!childNode || !parentNode) return false;
		
		for(var i = 0; i < 150; i++) {
			if(childNode == parentNode) {
				return true;
			}
			if(childNode.tagName == 'HTML') {
				return false;
			}
			childNode = childNode.parentNode;
		}
		return false;
	};

	/**
		* Получить общего родителя левой и правой дочки
	*/
	var _commonParent = function (leftNode, rightNode) {
		var getParents = function (node) {
			var parents = new Array;
			do {
				if(node == _container.parentNode || node.tagName == 'HTML') break;
				if(node.nodeType != 1) continue;
				parents.push(node);
			} while(node = node.parentNode);
			return parents;
		};
		
		var leftParents = getParents(leftNode);
		var rightParents = getParents(rightNode);
		
		for(var i = 0; i < leftParents.length; i++) {
			for(var j = 0; j < rightParents.length; j++) {
				if(leftParents[i] == rightParents[j]) {
					return leftParents[i];
				}
			}
		}
		return false;
	};


	/**
		* Восстановаить выделение
	*/
	this.load = function () {
		if(_rng) {
			_select(_rng);
		}
	};


	/**
		* Сохранить выделение
	*/
	this.save = function () {
		_rng = _createRange();
	};


	this.expand = ie ? function (start) {
		//TODO Implement for ie
	} : function (start) {
		var range = _createRange(), node = this.getNode(start);
		
		if(this.isSomethingSelected() && range && node && node.nextSibling) {
			range.setStart(node, 0);
			range.setEnd(node.nextSibling, 0);
			
			var sel = _getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
	};
	
	this.getNode = ie ? function (start, ignoreNullSelection) {
		var range = _createRange();
		if(range && (ignoreNullSelection || this.isSomethingSelected(true))) {
			var node = range.parentElement();
			if(_isAncestorOf(node, _container)) {
				return node
			}
		}
		return false;
	} : function (start, ignoreNullSelection) {
		var range = _selectionRange();
		if(range && (ignoreNullSelection || this.isSomethingSelected(true))) {
			var node = _commonParent(range.startContainer, range.endContainer);
			while(node.nodeType != 1) {
				node = node.parentNode;
			}
			if(node != _container.parentNode) {
				if(_isAncestorOf(node, _container)) {
					return node
				}
			}
		}
		return false;
	};


	/**
		* Засунуть содержимое выделения в тег
		* @param tag String название тега
		* @param attr Hash атрибуты тега
	*/
	this.surround = ie ? function (tag, attrs) {
		if(this.isSomethingSelected()) {
			var range = _createRange();
			return this.insert(tag, attrs, range.htmlText);
		} else return false;
	} : function (tag, attrs) {
		if(this.isSomethingSelected()) {
			var range = _createRange();
			var node = _createNode(tag, attrs);
			range.surroundContents(node);
			return true;
		} else return false;
	};


	/**
		* Вставить тег вместо выделенного фрагмента
		* @param tag String название тега
		* @param attr Hash атрибуты тега
	*/
	this.insert = ie ? function (tag, attrs, innerHTML) {
		var selection = window.document.selection;
		if (this.isSomethingSelected() &&selection) {
			var html = _createNode(tag, attrs, innerHTML).outerHTML;
			
			var range = selection.createRange();
			range.pasteHTML(html);
			range.collapse(false);
			range.select();

			return true;
		} else return false;
	} : function (tag, attrs, innerHTML) {
		var range = _createRange();
		if (this.isSomethingSelected() && range) {
			var node = _createNode(tag, attrs, innerHTML);
			
			range.deleteContents();
			range.insertNode(node);
			range = _window.document.createRange();
			range.selectNode(node);
			range.collapse(false);
			selectRange(range, _window);

			return true;
		} else return false;
	};


	/**
		* Узнать, есть ли в выделенном фрагменте хотя бы один символ
		* @return Boolean
	*/
	this.isSomethingSelected = ie ? function (disableNodeCheck) {
		var sel = _window.document.selection;
		return sel && (sel.createRange().text != "") && (disableNodeCheck || this.getNode());
	} : function (disableNodeCheck) {
		var range = _createRange(_window);
		return range && !range.collapsed && (disableNodeCheck || this.getNode());
	};
};
