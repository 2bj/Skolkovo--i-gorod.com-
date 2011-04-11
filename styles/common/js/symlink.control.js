function symlinkControl(_id, _module, _types, _options) {
	var _self      = this;
	var id         = _id;
	var types      = (_types instanceof Array) ? _types : [_types];
	var typesStr   = (_types instanceof Array) ? '&htypes[]=' + _types.join('&htypes[]=') : '';
	var module     = _module || null;
	var container  = null;
	var textInput  = null;
	var treeButton = null;
	var pagesList  = null;
	var suggestDiv = null;
	var suggestItems = null;
	var suggestIndex = null;
	var mouseX       = 0;
	var mouseY       = 0;
	if(!_options) var _options = {};
	var iconBase     = _options['iconsPath']      || '/images/cms/admin/mac/tree/';
	var fadeClrStart = _options['fadeColorStart'] || [255,   0,   0];
	var fadeClrEnd   = _options['fadeColorEnd']   || [255, 255, 255];
	var inputName    = _options['inputName']      || ('symlinkInput' + id);
	var noImages     = _options['noImages']       || false;
	var pagesCache   = {};
	/**
	 * 
	 */
	var init = function() {
		if(!window.symlinkControlsList) window.symlinkControlsList = {};
		window.symlinkControlsList[id] = _self;
		container = document.getElementById('symlinkInput' + id);
		if(!container) {
			alert('Symlink container #' + id + ' not found');
			return;
		}

		var input = document.createElement('input');
		input.type  = 'hidden';
		input.name  = inputName;
		container.parentNode.insertBefore(input, container);

		pagesList  = document.createElement('ul');
		container.appendChild(pagesList);
		textInput  = document.createElement('input');
		container.appendChild(textInput);
		treeButton = noImages ? document.createElement('input') : document.createElement('img');
		container.appendChild(treeButton);

		textInput.type  = 'text';
		
		if(noImages) {
			treeButton.type = 'button';
			treeButton.value = '╘';
		} else {
			treeButton.src    = "/images/cms/admin/mac/tree.png" ;
			treeButton.height = "18";
		}
		treeButton.className = 'treeButton';

		treeButton.onclick = function() {			
			$.openPopupLayer({
				name   : "Sitetree",
				title  : "Выбор страницы",
				width  : 620,
				height : 335,
				url    : "/styles/common/js/tree.html?id=" + id + (module ? "&module=" + module : "" ) + (window.lang_id ? "&lang_id=" + window.lang_id : "")
			});
		};

		pagesList.className = 'pageslist';

		textInput.onkeypress = function(e) {
			var keyCode = e ? e.keyCode : window.event.keyCode;
			if(keyCode == 13) return false;
		};

		textInput.onkeyup = function(e) {
			var keyCode = e ? e.keyCode : window.event.keyCode;
			switch(keyCode) {
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
						return false;
						break;
					}
				case 27 :
					{
						hideSuggest();
						break;
					}
				default :
					{

						_self.doSearch();
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
				}
	};

	this.loadItems = function(searchText) {
		$.ajax({url      : "/admin/content/load_tree_node.xml?limit&domain_id[]=" + (window.domain_id ? window.domain_id : '1') + typesStr + (window.lang_id ? "&lang_id=" + window.lang_id : "") + "&search-all-text[]=" + encodeURIComponent(searchText),
				type     : "get",
				complete : function(r,t) { _self.updateItems(r); } });
	};

	this.updateItems = function(response) {
		suggestIndex = null;
		suggestItems = response.responseXML.getElementsByTagName('page');
		if(!suggestItems.length) return;
		var tmp = [];
		for(var i=0; i<suggestItems.length; i++) {
			if(pagesCache[suggestItems[i].getAttribute('id')]) continue;
			tmp[tmp.length] = suggestItems[i];
		}
		suggestItems = tmp;
		var ul    = null;
		if(!suggestDiv) {
			suggestDiv = document.createElement('div');
			suggestDiv.className      = 'symlinkAutosuggest';
			var pos = $(textInput).offset();
			suggestDiv.style.position = 'absolute';
			suggestDiv.style.zIndex = 1050;
			suggestDiv.style.width  = textInput.clientWidth + "px";
			suggestDiv.style.top    = (pos.top + textInput.offsetHeight) + "px";
			suggestDiv.style.left   = pos.left + "px";
			ul = document.createElement('ul');
			suggestDiv.appendChild(ul);
			document.body.appendChild(suggestDiv);
		}
		showSuggest();
		$(document).mousemove(documentMouseMoveHandler);
		ul = suggestDiv.firstChild;
		while(ul.firstChild) {
			ul.removeChild(ul.firstChild);
		}
		for(i = 0; i < suggestItems.length; i++) {
			if(pagesCache[suggestItems[i].getAttribute('id')]) continue;
			var name = getElementText(suggestItems[i].getElementsByTagName('name')[0]);
			var type = getElementText(suggestItems[i].getElementsByTagName('basetype')[0]);
			var link =  suggestItems[i].getAttribute('link');
			var li   = document.createElement('li');
			var span = document.createElement('span');
			var a    = document.createElement('a');
			li.title = name;
			if(name.length > 20) name = name.substr(0, 20) + '...';
			if(link.length > 55) link = link.substr(0, 55) + '...';
			li.appendChild(document.createTextNode(name));			
			li.appendChild(span);
			li.appendChild(document.createElement('br'));
			li.appendChild(a);
			span.appendChild(document.createTextNode(' (' + type + ')'));
			a.appendChild(document.createTextNode(link));
			a.href = link;
			li.onmouseover = function() { highlightSuggestItem(this.suggestIndex);};
			li.onclick     = function() { addHighlitedItem(); hideSuggest(); };
			li.suggestIndex = i;
			ul.appendChild(li);
		}
	};

	this.doSearch = function() {
		var text = textInput.value;
		_self.loadItems(text);
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
			var id    = suggestItems[suggestIndex].getAttribute('id');
			var name  = getElementText(suggestItems[suggestIndex].getElementsByTagName('name')[0]);
			var aname = suggestItems[suggestIndex].getAttribute('link');
			var type  = suggestItems[suggestIndex].getElementsByTagName('basetype')[0];
			var t     = '';
			var module = (t = type.getAttribute('module')) ? t : '';
			var method = (t = type.getAttribute('method')) ? t : '';
			_self.addItem(id, name, [module,method], aname);
		}
	};

	this.addItem = function(pageId, name, basetype, href) {
		if(pagesCache[pageId] !== undefined) return;
		var page  = document.createElement('li');
		var text  = document.createElement('span');
		var link  = document.createElement('a');
		var btn   = document.createElement('a');		
		var input = document.createElement('input');
		input.type  = 'hidden';
		input.name  = inputName;
		input.value = pageId;
		btn.input  = input;		
		link.href  = href;
		if(noImages) {
			btn.appendChild( document.createTextNode('[x]') );
		} else {
			var btnImage = document.createElement('img');
			btnImage.src = iconBase + 'symlink_delete.png';
			btnImage.alt = 'delete';
			btn.appendChild(btnImage);
		}
		btn.href      = 'javascript:void(0);';
		btn.className = 'button';
		btn.onclick = function() {
						this.input.parentNode.removeChild(this.input);
						pagesList.removeChild(this.parentNode);
						delete pagesCache[pageId];
					  };
		text.title = basetype[0] + " " + basetype[1];
		text.appendChild(document.createTextNode(name));
		link.appendChild(document.createTextNode(href));
		page.appendChild(btn);
		if(!noImages) {
			var icon  = document.createElement('img');
			icon.src   = iconBase + 'ico_' + basetype[0] + '_' + basetype[1] + '.png';
			page.appendChild(icon);
		}
		page.appendChild(text);
		page.appendChild(link);
		pagesList.appendChild(page);
		container.parentNode.insertBefore(input, container);
		page.style.backgroundColor = makeHexRgb(fadeClrStart);
		page.startColor = fadeClrStart;
		page.endColor   = fadeClrEnd;
		page.pname      = name;
		page.fade		= fader;
		setTimeout(function(){page.fade()}, 2000);
		pagesCache[pageId] = true;
		if ($('#eip_page').size()) {
			frameElement.height = ($('#eip_page').height() > 500) ? 500 : $('#eip_page').height();
		}
	};

	var fader = function() {
		if(this.fadeColor == undefined) {
			this.fadeColor    = [];
			this.fadeColor[0] = this.startColor[0];
			this.fadeColor[1] = this.startColor[1];
			this.fadeColor[2] = this.startColor[2];
		}
		if(Math.round(this.fadeColor[0] + this.fadeColor[1] + this.fadeColor[2]) ==
		   Math.round(this.endColor[0] + this.endColor[1] + this.endColor[2])) return;
		this.fadeColor[0] += (this.endColor[0] - this.startColor[0]) / 50;
		this.fadeColor[1] += (this.endColor[1] - this.startColor[1]) / 50;
		this.fadeColor[2] += (this.endColor[2] - this.startColor[2]) / 50;
		this.style.backgroundColor = makeHexRgb(this.fadeColor);
		var _p = this;
		setTimeout(function(){_p.fade();}, 20);
	};

	var showSuggest = function() {
		if(suggestDiv) {
			var pos = $(textInput).offset();
			suggestDiv.style.width  = textInput.clientWidth;
			suggestDiv.style.top    = pos.top + textInput.offsetHeight;
			suggestDiv.style.left   = pos.left;
			suggestDiv.style.display = '';
		}
	};

	var hideSuggest = function() {
		if(suggestDiv && suggestDiv.style.display != 'none') {
			suggestDiv.style.display = 'none';
			$(document).unbind('mousemove', documentMouseMoveHandler);
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

	var getElementText = function(element) {		
		return (element.firstChild && element.firstChild.nodeType == 3) ? element.firstChild.nodeValue : element.nodeValue;
	};

	// initialize
	init();
};
var hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
function makeHexRgb(rgb) {
	var result = '';
	for(var i = 0; i < 3; i++) {
		result = result + hex[Math.floor(rgb[i] / 16)] + hex[Math.floor(rgb[i] % 16)];
	}
	return '#' + result;
}