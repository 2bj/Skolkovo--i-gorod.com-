var uRevision = function (info) {
	var elementId		= info['element-id'];
	var objectId		= info['object-id'];
	var fieldName		= info['field-name'];
	var originalValue	= info['original-value'];
	var newValue		= info['new-value'];
	var fieldType		= info['field-type'];
	var fieldParams		= info['params'];
	var valuePrefix		= info['valuePrefix'];
	var valueSuffix		= info['valueSuffix'];
	var deleteAction	= info['delete-action'];
	var self			= this;

	this.getOriginalValue = function () {
		return originalValue;
	};
	
	this.getNewValue = function () {
		return newValue;
	};
	
	this.getFieldType = function () {
		return fieldType;
	};

	
	/**
		* Сохранить изменение на сервере
	*/
	this.save = function (callback) {
		var dt = new Date;
		var qSuffix = "?qt=" + dt.getTime();
		
		if(deleteAction) {
			jQuery.post('/content/eip_del_page.xml' + qSuffix, {'element-id': elementId, 'object-id': objectId}, function (data) {
				var error = jQuery('error', data);
				if(error.size()) {
					uPageEditor.message(error.text());
				} else {
					var searchRow = function (node, depth) {
						if(!node.parentNode) return depth;
						var tagName = node.tagName;
						
						if(tagName != 'TABLE') {
							if(jQuery(node).attr('umi:element-id')) {
								if(jQuery(node).attr('umi:element-id') != elementId) return 2;
							}
							if(jQuery(node).attr('umi:object-id')) {
								if(jQuery(node).attr('umi:object-id') != objectId) return 2;
							}
							if(jQuery(node).attr('umi:region') == 'row') {
								return node;
							}
						}
						
						if(--depth) {
							return searchRow(node.parentNode, depth);
						} else return 3;
					};
					
					var nodes = getNodes(true);
					jQuery(nodes).each(function (index, node) {
						var rowNode = searchRow(node, 10);
						if(rowNode) jQuery(rowNode).remove();
					});
					uPageEditor.normalizeBoxes();
				}
			});
			
			return;
		}
		
		var queryParams = {
			'element-id':	elementId,
			'object-id':	objectId,
			'field-name':	fieldName
		};
		
		if(typeof newValue == 'object') {
			var value = new Array(), i;
			for(i in newValue) value.push(i);
			queryParams['value'] = value;
		} else {
			queryParams['value'] = newValue;
		}
		
		var uri = uRevisionsQueue.getEditUri(info['field-name'], 'save');
		jQuery.post(uri + qSuffix, queryParams, function (data) {
			var params = {};
			var prop = jQuery('property', data);
			var error = jQuery('error', data);
			var oldLink = jQuery('links previous', data);
			var newLink = jQuery('links current', data);
			
			if(error.size()) {
				uPageEditor.message(error.text());
				return false;
			}
			
			value = prop.text();
			fieldType = jQuery(prop).attr('type');
			
			if(fieldType == 'relation') {
				var items = jQuery('item', prop), value = {};
				
				for(var i = 0; i < items.length; i++) {
					var id = jQuery(items[i]).attr('id');
					var name = jQuery(items[i]).attr('name');
					value[id] = name;
				}
				
				params['guide-id'] = jQuery(prop).attr('guide-id');
				params['multiple'] = (jQuery(prop).attr('multiple') == 'multiple');
			}
			
			if(oldLink.size() && newLink.size()) {
				oldLink = oldLink.text();
				newLink = newLink.text();
				
				var nodes = getNodes();
				jQuery(nodes).each(function (index, node) {
					//if(jQuery(node).attr('href') == oldLink)
					jQuery(node).attr('href', newLink);
					node.onclick = node.onmouseup = node.onmousedown = function () { return true; };
					jQuery('a', node).each(function (index, node) {
						//if(jQuery(node).attr('href') == oldLink)
						jQuery(node).attr('href', newLink);
						node.onclick = node.onmouseup = node.onmousedown = function () { return true; };
					});
				});
			}

			callback(value, fieldType, params);
			if(typeof callback == 'function') {
				callback();
			}
		});
	};


	/**
		* Показать изменение на странице
	*/
	this.apply = function () {
		if(deleteAction) return false;
		replaceValues(getNodes(), newValue, originalValue);
	};

	/**
		* Отменить изменение на странице
	*/
	this.cancel = function () {
		if(deleteAction) return false;
		replaceValues(getNodes(), originalValue, newValue);
	};


	// Вернуть текущее значение
	this.value = function () { return newValue; };

	// Вернуть тип изменяемого поля
	this.fieldType = function () { return fieldType; };
	
	this.fieldParams = function () { return fieldParams; };


	/**
		* Проверить, удовлетворяет ли изменение переданным параметрам
	*/
	this.matchByInfo = function (info) {
		if(deleteAction && elementId && elementId == info['element-id']) {
			return true;
		}
		
		if(deleteAction && objectId && objectId == info['object-id']) {
			return true;
		}
		
		if(fieldName == 'h1' || fieldName == 'name') {
			if(info['field-name'] != 'name' && info['field-name'] != 'h1') return false;
		} else {
			if(info['field-name'] != fieldName) return false;
		}
		
		if((elementId && info['element-id'] == elementId) || (objectId && info['object-id'] == objectId)) return true;
		return false;
	};


	/**
		* Получить идентификатор изменения
	*/
	this.id = function () {
		return (elementId ? ('page-' + elementId) : ('object-' + objectId)) + '-' + fieldName;
	};

	this.isDeleteAction = function () {
		return deleteAction ? true : false;
	};

	var getNodes = function (returnPlainNodes) {
		var nodes = uPageEditor.getRegions();
		
		var result = new Array(), info;
		for(var i = 0; i < nodes.length; i++) {
			var originalNode = nodes[i];
			var node = jQuery(originalNode);
			if(jQuery(nodes[i]).attr('tagName') == 'TABLE') continue;
			
			if(!deleteAction) {
				if(fieldName == 'h1' || fieldName == 'name') {
					if(node.attr('umi:field-name') != 'h1' && node.attr('umi:field-name') != 'name') continue;
				} else {
					if(node.attr('umi:field-name') != fieldName) continue;
				}
			}
			
			if(info = uPageEditor.searchAttr(nodes[i], 20)) {
				if(
					(elementId && info['element-id'] == elementId)
					||
					(objectId && info['object-id'] == objectId)
				) {
					result.push(returnPlainNodes ? originalNode : node);
				}	
			}
		}
		return result;
	};
	
	var replaceValues = function (nodes, value, previousValue) {
		jQuery(nodes).each(function (i, node) {
			switch(fieldType) {
				case 'img_file': return replaceImage(node, value, previousValue); break;
				case 'relation': return replaceRelation(node, value, previousValue); break;
				case 'video_file': return replaceVideo(node, value, previousValue); break;
				case 'boolean': return replaceBoolean(node, value, previousValue); break;
				default: return jQuery(node).html(value);
			}
		});
	};
	
	var replaceImage = function (node, value, previousValue) {
		var isModified = false;
		
		//If image tag
		if(jQuery(node).attr('tagName') == 'IMG') {
			//If image set by src
			if(compareImages(node.attr('src'), previousValue)) {
				node.attr('src', value);
				isModified = true;
			} else if(checkIsThumb(node.attr('src'))) {
				var width = node.width();
				var height = node.height();
				var tSrc = node.attr('src');
				if(tSrc.indexOf(width) != -1 && tSrc.indexOf(height) == -1) height = 'auto';
				if(tSrc.indexOf(width) == -1 && tSrc.indexOf(height) != -1) width = 'auto';
				
				value = makeNewThumb(value, width, height);
				node.attr('src', value);
				isModified = true;
			}
			
			jQuery(node).one('load', function () {
				uPageEditor.normalizeBoxes();
			});
		}
		
		//If image set by css background
		var cssBackground = node.css('background-image');
		if(cssBackground.substr(0, 4) != 'url(') {
			if(!isModified && node.attr('childNodes')) {
				var childs = node.attr('childNodes');
				
				for(var i = 0; i < childs.length; i++) {
					var subNode = childs.item(i);
					if(subNode && jQuery(subNode).attr('tagName')) {
						replaceImage(jQuery(subNode), value, previousValue);
					}
				}
			}
			return;
		}
		
		cssBackground = cssBackground.substring(4, cssBackground.length - 1);
		var httpHost = window.location.protocol + '//' + window.location.host;
		if(cssBackground.substr(0, httpHost.length) != httpHost) return;
		cssBackground = cssBackground.substr(httpHost.length);
		if(!cssBackground) return;
		
		if(compareImages(cssBackground, previousValue)) {
			node.css('background-image', 'url(' + value + ')');
			isModified = true;
		}
		
		if(!isModified && node.attr('childNodes')) {
			var childs = node.attr('childNodes');
			
			for(var i = 0; i < childs.length; i++) {
				var subNode = childs.item(i);
				if(subNode && jQuery(subNode).attr('tagName')) {
					replaceImage(jQuery(subNode), value, previousValue);
				}
			}
		}
	};
	
	var compareImages = function (left, right) { return left == right; };

	var checkIsThumb = function (src) {
		if(src.indexOf('/images/cms/thumbs/') >= 0) return true;
		if(src.indexOf('/images/autothumbs/') >= 0) return true;
		return false;
	};

	var makeNewThumb = function (src, width, height) {
		src = src.toString();
		var tempArr = src.split(/\./g);
		if(tempArr.length < 2) return false;
		
		var ext = tempArr[tempArr.length - 1].toString();
		var tempArr = tempArr[tempArr.length - 2].toString().split(/\//g);
		
		var filename = tempArr[tempArr.length - 1].toString();
		var dirname = src.substr(0, src.length - filename.length - ext.length - 1);
		
		return '/images/autothumbs' + dirname + filename + '_' + width + '_' + height + '.' + ext;
	};
	
	var replaceRelation = function (node, value, previousValue) {
		var html = '', i;
		
		for(i in value) {
			html += value[i] + ', ';
		}
		
		if(html) html = html.substr(0, html.length - 2);
		jQuery(node).html(html);
	};
	
	var replaceVideo = function (node, value, previousValue) {
		var getFlexApp = function (appName) {
			return (navigator.appName.indexOf ("Microsoft") != -1) ? window[appName] : document[appName];
		};
		
		getFlexApp('UmiVideoPlayer').setVideoFile(value);
	};

	var replaceBoolean = function (node, value, previousValue) {
		if(node.attr('tagName') == 'INPUT' && node.attr('type') == 'checkbox') {
			 node.attr('checked', value ? true : false);
		} else {
			jQuery(node).html(value ? 'Да' : 'Нет');
		}
	};
};