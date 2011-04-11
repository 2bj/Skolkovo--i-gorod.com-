var ie = document.selection && window.ActiveXObject && /MSIE/.test(navigator.userAgent);

createSimple('Bold',		{'button-label': 'Bold', 'button-title': 'Жирный', 'prefix': 'b'})();
createSimple('Italic',		{'button-label': 'Italic', 'button-title': 'Курсив', 'prefix': 'i'})();
createSimple('Underline',	{'button-label': 'Underlined', 'button-title': 'Подчеркнутый', 'prefix': 'u'})();

createSimple('JustifyLeft',	{'button-label': 'Left', 'button-title': 'Выравнивание по левому краю', 'prefix': 'l'})();
createSimple('JustifyCenter',	{'button-label': 'Center', 'button-title': 'Выравнивание по центру', 'prefix': 'c'})();
createSimple('JustifyRight',	{'button-label': 'Right', 'button-title': 'Выравнивание по правому краю', 'prefix': 'r'})();

createSimple('InsertOrderedList',	{'button-label': 'InsertOrderedList', 'button-title': 'Нумерованный список', 'prefix': 'ol'})();
createSimple('InsertUnorderedList',	{'button-label': 'InsertUnorderedList', 'button-title': 'Маркированный список', 'prefix': 'ul'})();


inlineWYSIWYG.button('AddLink', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'AddLink', 'addlink', true);
		jQuery(button).attr({
			'value':		'AddLink',
			'title':		'Создать ссылку'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode(), url = '';
		if(node.nodeType == 1 && node.tagName == 'A') {
			url = jQuery(node).attr('href');
		}

		var date = new Date;
		var ts = date.getTime();
		var url = '/styles/common/other/inline-wysiwyg/createLink.html?ts=' + ts + '&url=' + url;
		var _sels = sels;
		
		sels.save();
		jQuery.openPopupLayer({
			'name'   : "CreateLink",
			'title'  : "Создание ссылки",
			'url'    : url,
			'width'  : 490,
			'height' : 95,
			'afterClose': function (value) {
				_sels.load();
				if(typeof value == 'undefined') return true;
				if(value) {
					document.execCommand('createlink', false, value);
				} else {
					document.execCommand('unlink', false, false);
				}
			}
		});
	},
	status: function () {
		return false;
	},
	params: {}
});


inlineWYSIWYG.button('UnLink', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'UnLink', 'unlink', true);
		jQuery(button).attr({
			'value':		'Unlink',
			'title':		'Удалить ссылку'
		});
	},
	execute: function (params, targetNode, sels) {
		sels.expand();
		document.execCommand('unlink', false, false);
	},
	status: function () {
		return false;
	},
	params: {}
});


inlineWYSIWYG.button('InsertImage', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'InsertImage', 'insertimage', true);
		jQuery(button).attr({
			'value':		'InsertImage',
			'title':		'Вставить изображение'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode(), src = '', folder = './images/cms/data', fileName = '';
		if(node.nodeType == 1 && node.tagName == 'IMG') {
			src = jQuery(node).attr('src');
			
			src = src.toString();
			var arr = src.split(/\//g);
			fileName = arr[arr.length - 1];
			folder = '.' + src.substr(0, src.length - fileName.length - 1);
		}

		var date = new Date;
		var ts = date.getTime();
		var url = '/styles/common/other/filebrowser/umifilebrowser.html?ts=' + ts + '&image=1&folder=' + folder;
		if(fileName) url += '&file=' + fileName;
		
		var _sels = sels;
		if(ie && !sels.isSomethingSelected()) {
			alert("Выделите фрагмент текста");
			return false;
		}
		
		
		sels.save();
		jQuery.openPopupLayer({
			'name'   : "Filemanager",
			'title'  : "Менеджер изображений",
			'width'  : 660,
			'height' : 460,
			'url'    : url,
			'afterClose': function (value) {
				if(typeof value == 'undefined') return;
				if(typeof value == 'object') value = value.toString();

				if(value.length > 0)  {
					_sels.load();
					
					setTimeout(function () {
						document.execCommand('InsertImage', false, value);
					}, 100);
				}
			}
		});
	},
	status: function () {
		return false;
	},
	params: {}
});


inlineWYSIWYG.button('XmlOff', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'XmlOff', 'xmloff');
		jQuery(button).attr({
			'value':		'XmlOff',
			'title':		'Очистить код'
		});
	},
	execute: function (params, targetNode) {
		var html = jQuery(targetNode).html();
		var strict = true;

		html = html.replace(/<![\s\S]*?--[ \t\n\r]*>/ig, ' ');
		html = html.replace(/<!--[\w\W\n]*?-->/ig, ' ');
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

		jQuery(targetNode).html(html);
	},
	status: function () {
		return false;
	},
	params: {}
});

inlineWYSIWYG.button('ClipboardPaste', {
	init: function (params) {
		var button  = inlineWYSIWYG.createSimpleButton(params['editor'], 'ClipboardPaste', 'clipboardpaste');
		var toolbox = jQuery(params['toolbox']);
		var tip = jQuery("<div class='eip-wysiwyg-toolbox eip-ui-element eip-wysiwyg_tip'>Для вставки из буфера обмена нажмите Ctrl+V</div>");
		jQuery(button).attr({
			'value':		'ClipboardPaste'
		}).mouseenter(function() {
			jQuery(document.body).append(tip);
			tip.css({
				position : 'absolute',
				display  : 'none',
				top      : (parseInt(toolbox.css('top')) - parseInt(tip.height())) + "px",
				left	 : toolbox.css('left'),
				width    : (parseInt(toolbox.outerWidth()) - 10) + "px"
			}).fadeIn(400);
		}).mouseleave(function(){
			tip.fadeOut(400, function(){ tip.remove(); });
		});
	},
	execute: function (params, targetNode) {
		// Nothing to do here
	},
	status: function () {
		return false;
	},
	params: {}
});
