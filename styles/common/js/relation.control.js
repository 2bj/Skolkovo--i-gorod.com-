function relationControl(_typeId, _fieldSuffix, _prependEmpty, _sourceUri) {
	var _self       = this;
	var typeId      = _typeId;
	var fieldSuffix = _fieldSuffix || _typeId;
	var needLoad    = true;	
	var selectInput = null;
	var textInput   = null;
	var addButton   = null;
	var addedOption = null;
	var useSearchOption = null;
	var suggestDiv  = null;
	var timeHandler = null;
	var suggestItems = null;
	var suggestIndex = null;
	var mouseX       = 0;
	var mouseY       = 0;
	var sourceUri = _sourceUri || '/admin/data/guide_items_all/';
	
	/**
	 * Initialize the control
	 */
	var init = function() {
		selectInput = document.getElementById('relationSelect' + fieldSuffix);
		textInput   = document.getElementById('relationInput'  + fieldSuffix);
		addButton   = document.getElementById('relationButton' + fieldSuffix);
		if(!selectInput) {
			alert('Select input for field #' + fieldSuffix + ' not found');
			return;
		}
		// Bind some events		
		if(addButton) {
			addButton.onclick = function() {
				_self.addItem();
			}
		}
		if(textInput) {
			textInput.onkeyup = function(keyEvent) {
				var code = keyEvent ? keyEvent.keyCode : event.keyCode;
				if(code == 13 && addButton) {
					_self.addItem();
					return false;
				} else {
					_self.doSearch();					
				}				
			};
			textInput.onkeydown = function(keyEvent) {
				var code = keyEvent ? keyEvent.keyCode : event.keyCode;
				if(code == 13) {
					return false;
				}
			};
		}
		var onLoadItems = function() { if(needLoad) { _self.loadItemsAll(); needLoad = false; } };
		selectInput.onmouseover = onLoadItems;
		selectInput.onfocus		= onLoadItems;
		// Cleanup
		for(var i = 0; i < selectInput.childNodes.length; i++) {
			if(selectInput.childNodes[i].nodeType != 1) {
				selectInput.removeChild(selectInput.childNodes[i]);
				i = 0;
			}
		}		
		if(_prependEmpty && $("option[value='']", selectInput).size()==0) {			
			$(selectInput).prepend("<option value=''></option>");
		}
	};
	
	this.rescan = function () {
		textInput   = document.getElementById('relationInput'  + fieldSuffix);
		
		if(textInput) {
			textInput.onkeyup = function(keyEvent) {
				var code = keyEvent ? keyEvent.keyCode : event.keyCode;
				if(code == 13 && addButton) {
					_self.addItem();
				} else {
					_self.doSearch();
				}
			};
		}
	};

	this.getValue = function() {
		var opts   = $("option[selected]", $(selectInput));
		var values = [];
		for(var i = 0; i< opts.length; i++) {
			values[opts[i].value] = $(opts[i]).text();
		}
		return values;
	};
	
	/**
	 * Sends request to load items
	 */
	this.loadItems = function(startsWith) {
		$.ajax({url      : sourceUri + typeId + ".xml?limit&search[]=" + encodeURIComponent(startsWith),
		        type     : "get",
				complete : function(r, t) { _self.updateItems(r);} });
	};
	this.loadItemsAll = function() {
		$.ajax({url      : sourceUri + typeId + ".xml?allow-empty",
			    type     : "get",
				complete : function(r, t) { _self.updateItemsAll(r);} });
	};
	this.updateItemsAll = function(response) {
		if(response.responseXML.getElementsByTagName('empty').length) {
			if(textInput) {
				textInput.onkeyup = function(keyEvent) {
					var code = keyEvent ? keyEvent.keyCode : event.keyCode;
					switch(code) {
						case 38 : // Arrow up
							{
								if(suggestItems.length && (suggestIndex > 0 || suggestIndex == null )) {
									highlightSuggestItem((suggestIndex === null) ? (suggestItems.length - 1) : (suggestIndex - 1) );
								}
								break;
							}
						case 40 : // Arrow down
							{
								if(suggestItems.length && (suggestIndex < (suggestItems.length - 1) || suggestIndex == null )) {
									highlightSuggestItem((suggestIndex === null) ? 0 : (suggestIndex + 1) );
								}
								break;
							}
						case 13 : // Enter
							{
								addHighlitedItem();
								hideSuggest();
								break;
							}
						case 27 :
							{
								hideSuggest();
								break;
							}
						default :
							{
								clearTimeout(timeHandler);
								timeHandler = setTimeout(function(){_self.doSearchAjax();}, 500);
							}
					}
				};
				textInput.onblur  = function() {
					if(suggestDiv) {						
						if(mouseX < parseInt(suggestDiv.style.left) ||
						   mouseX > (parseInt(suggestDiv.style.left) + parseInt(suggestDiv.offsetWidth)) ||
						   mouseY < parseInt(suggestDiv.style.top) ||
						   mouseY > (parseInt(suggestDiv.style.top) + parseInt(suggestDiv.offsetHeight)) )
						 {
							hideSuggest();
						 }
					}
				};
				var total = response.responseXML.getElementsByTagName('empty')[0].getAttribute('total');
				if(!useSearchOption) {
					useSearchOption = new Option(' ', '');
					useSearchOption.innerHTML = getLabel('js-relation-total') + total + ". " + getLabel('js-relation-use_search');
					selectInput.insertBefore(useSearchOption, selectInput.firstChild);
				}
			}
			return;
		}
		var items     = response.responseXML.getElementsByTagName('object');
		var selection = [];
		var i = 0;
		for(i = 0; i < selectInput.options.length; i++){
			if(selectInput.options[i].selected) {
				selection.push(selectInput.options[i].value);
			}
		}		
		$("option:not([selected])", selectInput).remove();
		$("option[value='']", selectInput).remove();		
		if(_prependEmpty) $(selectInput).prepend("<option value=''> </option>");
		for(i = 0; i < items.length; i++) {
			var itemId  = items[i].getAttribute('id');
			var hasItem = false;
			for(var idx in selection) {
				if(selection[idx] == itemId) {
					hasItem = true;
					delete selection[idx];
					break;
				}
			}
			if(!hasItem) {
				var text = items[i].getAttribute('name');
				var opt  = new Option(text, itemId);
				opt.innerHTML = text; // Fix for stupid IE!!!
				selectInput.appendChild(opt);
			}
		}
		if($.browser.msie) {
			var d = selectInput.style.display;
			selectInput.style.display = 'none';
			selectInput.style.display = d;
		}
	};
	this.updateItems = function(response) {
		suggestIndex = null;
		suggestItems = response.responseXML.getElementsByTagName('object');
		if(!suggestItems.length) return;
		var ul    = null;		
		if(!suggestDiv) {
			suggestDiv = document.createElement('div');			
			suggestDiv.className      = 'relationAutosuggest';
			var pos =  $(textInput).offset();
			suggestDiv.style.position = 'absolute';
			suggestDiv.style.zIndex = 1050;
			suggestDiv.style.width  = textInput.clientWidth + "px";
			suggestDiv.style.top    = (pos.top + textInput.offsetHeight) + "px";
			suggestDiv.style.left   = pos.left + "px";
			ul = document.createElement('ul');
			suggestDiv.appendChild(ul);
			document.body.appendChild(suggestDiv);
		}
		suggestDiv.style.display = '';
		$(document).mousemove(documentMouseMoveHandler);
		ul = suggestDiv.firstChild;
		while(ul.firstChild) {
			ul.removeChild(ul.firstChild);
		}
		for(i = 0; i < suggestItems.length; i++) {
			var text = suggestItems[i].getAttribute('name');
			var li   = document.createElement('li');
			li.innerHTML = text;
			li.onmouseover = function() { highlightSuggestItem(this.suggestIndex); };
			li.onmouseout  = function() { this.className  = ''; };
			li.onclick     = function() { addHighlitedItem(); hideSuggest(); };
			li.suggestIndex = i;
			ul.appendChild(li);
		}		
	};
	var documentMouseMoveHandler = function(e) {
		if(!e) {
			mouseX = event.clientX + document.body.scrollLeft;
			mouseY = event.clientY + document.body.scrollTop;
		} else {
			mouseX = e.pageX;
			mouseY = e.pageY;
		}		
		return true;
	};
	/**
	 * Add new item to list	 
	 */
	this.addItem = function(_text, _value) {
		if(!(_text && _text.length) && !(textInput && textInput.value.length)) {
			return;
		}
		clearSearch();
		removeGroups();
		if(!selectInput.multiple && addedOption && !_text && !_value) {
			addedOption.innerHTML  = (_value ? '' : '&rarr;&nbsp;&nbsp;') + textInput.value;
			addedOption.value      = _value ? _value : textInput.value;
			selectInput.selectedIndex = 0;
		} else {
			addedOption = new Option(_text ? _text : textInput.value, _value ? _value : textInput.value);
			addedOption.innerHTML  = (_value ? '' : '&rarr;&nbsp;&nbsp;') + (_text ? _text : textInput.value);
			if(selectInput.options.length) {
				selectInput.insertBefore(addedOption, selectInput.firstChild)
			} else {
				selectInput.appendChild(addedOption);
			}
		}
		textInput.value      = '';
		addedOption.selected = true;
		if(jQuery.browser.msie) {
			setTimeout(function(){ addedOption.selected = false; addedOption.selected = true; }, 20);
		}		
	};
	var highlightSuggestItem = function(itemIndex) {
		if(suggestDiv.style.display != 'none') {
			var list = suggestDiv.firstChild;
			var oldHighlited = list.childNodes.item(suggestIndex);
			if(oldHighlited) {
				oldHighlited.className = '';
			}
			list.childNodes.item(itemIndex).className    = 'active';
			suggestIndex = itemIndex;
		}
	};
	var addHighlitedItem = function() {
		if(suggestDiv && suggestDiv.style.display != 'none' && suggestIndex !== null) {
			var text  = suggestItems[suggestIndex].getAttribute('name');
			var value = suggestItems[suggestIndex].getAttribute('id');
			var found = false;
			for(var i = 0; i < selectInput.options.length; i++) {
				if(selectInput.options[i].value == value) {
					found = true;
					selectInput.options[i].selected = true;
					break;
				}
			}
			if(!found) {
				_self.addItem(text, value);
			}
		} else if(textInput.value.length && addButton) {
			_self.addItem();
		}
	};
	var hideSuggest = function() {
		if(suggestDiv && suggestDiv.style.display != 'none') {
			suggestDiv.style.display = 'none';
			$(document).unbind('mousemove', documentMouseMoveHandler);
		}
	};
	/**
	 * Process a search
	 */
	this.doSearch = function() {
		var text = textInput.value.toLowerCase();		
		clearSearch();
		if(text == '') {
			if(selectInput.multiple) removeGroups();
			return;
		}
		for(var i=0; i < selectInput.options.length; i++) {
			var optionText  = selectInput.options[i].text;
			var optionText2 = optionText.replace(/^.\s\s/, '');
			if(optionText.substring(0, text.length).toLowerCase()  === text ||
			   optionText2.substring(0, text.length).toLowerCase() === text) {
				if(selectInput.multiple) {
					if(selectInput.firstChild.nodeName.toLowerCase() != 'optgroup') {
						createGroups();
						searchGroup	= selectInput.firstChild;
						itemsGroup  = selectInput.lastChild;
					}
					var currentItem = selectInput.options[i];
					if(currentItem.parentNode == searchGroup) continue;
					currentItem.oldPrevSibling = currentItem.previousSibling;
					itemsGroup.removeChild(currentItem);
					searchGroup.appendChild(currentItem);
					if(searchGroup.childNodes.length == 5) return;
				} else {
					selectInput.selectedIndex = i;
					return;
				}				
			}
		}		
	};
	/**
	 * Process a search with ajax
	 */
	this.doSearchAjax = function() {
		if(textInput.value) {
			this.loadItems(textInput.value);
		}
	};
	/**
	 *
	 */
	var createGroups = function() {
		var searchGroup   = document.createElement('optgroup');
		searchGroup.label = 'Search results';
		var itemsGroup    = document.createElement('optgroup');
		itemsGroup.label  = '------------------------------------------------';
		while(selectInput.firstChild) {
			var child = selectInput.firstChild;
			selectInput.removeChild(child);
			itemsGroup.appendChild(child);
		}
		selectInput.appendChild(searchGroup);
		selectInput.appendChild(itemsGroup);
	};
	/**
	 *
	 */
	var removeGroups = function() {		
		if(selectInput.firstChild && selectInput.firstChild.nodeName.toLowerCase() == 'optgroup') {
			selectInput.removeChild(selectInput.firstChild);
			var itemsGroup = selectInput.firstChild;			
			while(itemsGroup.firstChild) {
				var child = itemsGroup.firstChild;
				itemsGroup.removeChild(child);
				selectInput.appendChild(child);
			}
			selectInput.removeChild(itemsGroup);
		}
	};
	/**
	 *
	 */
	var clearSearch = function() {
		if(selectInput.firstChild && selectInput.firstChild.nodeName.toLowerCase() == 'optgroup') {
			var searchGroup	= selectInput.firstChild;
			var itemsGroup  = selectInput.lastChild;
			while(searchGroup.firstChild) {
				var child = searchGroup.firstChild;
				searchGroup.removeChild(child);
				if(child.oldPrevSibling !== undefined || child.oldPrevSibling == null) {
					if(child.oldPrevSibling && child.oldPrevSibling.nextSibling) {						
						itemsGroup.insertBefore(child, child.oldPrevSibling.nextSibling);						
					} else if(child.oldPrevSibling === null) {
						itemsGroup.insertBefore(child, itemsGroup.firstChild);
					} else {
						itemsGroup.appendChild(child);						
					}
					//delete child['oldPrevSibling'];
					child.oldPrevSibling = undefined;
				}				
			}
		}
	};
	// Init our control
	init();
}