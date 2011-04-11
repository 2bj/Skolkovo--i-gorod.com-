var stylesFormats = {
	'': '',
	'P': 'Абзац',
	'PRE': 'Форматированный',
	'H1': 'Заголовок 1',
	'H2': 'Заголовок 2',
	'H3': 'Заголовок 3',
	'H4': 'Заголовок 4',
	'H5': 'Заголовок 5',
	'H6': 'Заголовок 6'
};

inlineWYSIWYG.button('StylesFormatting', {
	init: function (params) {
		var node = document.createElement('select');
		node.className = 'eip-wysiwyg_select_format';
		params['editor'].getToolBox().appendChild(node);
		
		var i;
		for(i in stylesFormats) {
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = stylesFormats[i];
			node.appendChild(option);
		}
		
		var _editor = params['editor'];
		jQuery(node).bind('change', function () {
			_editor.callButton('StylesFormatting', 'execute', {'tag': this.value});
		});
	},
	execute: function (params, targetNode, sels) {
		if(!params['tag']) return;
		var node = sels.getNode(false, true);
		if(node && node.tagName != params['tag']) {
			document.execCommand('formatBlock', false, '<' + params['tag'] + '>');
		}
	},
	status: function (params, targetNode, sels) {
		var tagName = sels.getNode(false, true).tagName;
		if(stylesFormats[tagName]) {
			jQuery('.eip-wysiwyg_select_format').each(function (i, select) {
				select.value = tagName;
			});
		}
	},
	params: {}
});