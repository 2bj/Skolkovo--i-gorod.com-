//Create table
inlineWYSIWYG.button('TCreate', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TCreate', 'tcreate');
		jQuery(button).attr({
			'value':		'TCreate',
			'title':		'Создать таблицу'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		
		sels.save();
		jQuery(node).after(tablesHelper.createTable());
		sels.load();
		
	},
	status: function () {
		return false;
	},
	params: {}
});

//Delete table
inlineWYSIWYG.button('TDelete', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TDelete', 'tdelete');
		jQuery(button).attr({
			'value':		'TDelete',
			'title':		'Удалить таблицу'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.deleteTable(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TABLE'],
	params: {}
});


//Insert row before
inlineWYSIWYG.button('TInsRowBefore', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TInsRowBefore', 'tinsrowbefore');
		jQuery(button).attr({
			'value':		'TInsRowBefore',
			'title':		'Вставить строку до'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.insertRowBefore(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TD', 'TR'],
	params: {}
});

//Insert row after
inlineWYSIWYG.button('TInsRowAfter', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TInsRowAfter', 'tinsrowafter');
		jQuery(button).attr({
			'value':		'TInsRowAfter',
			'title':		'Вставить строку после'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.insertRowAfter(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TD', 'TR'],
	params: {}
});

//Delete row
inlineWYSIWYG.button('TDelRow', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TDelRow', 'tdelrow');
		jQuery(button).attr({
			'value':		'TDelRow',
			'title':		'Удалить строку'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.deleteRow(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TD', 'TR'],
	params: {}
});

//Insert column before
inlineWYSIWYG.button('TInsColBefore', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TInsColBefore', 'tinscolbefore');
		jQuery(button).attr({
			'value':		'TInsColBefore',
			'title':		'Вставить колонку до'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.insertColBefore(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TD'],
	params: {}
});

//Insert column after
inlineWYSIWYG.button('TInsColAfter', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TInsColAfter', 'tinscolafter');
		jQuery(button).attr({
			'value':		'TInsColAfter',
			'title':		'Вставить колонку после'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.insertColAfter(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TD'],
	params: {}
});

//Delete column
inlineWYSIWYG.button('TDelCol', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TDelCol', 'tdelcol');
		jQuery(button).attr({
			'value':		'TDelCol',
			'title':		'Удалить колонку'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		tablesHelper.deleteColumn(node);
	},
	status: function () {
		return false;
	},
	requireTag: ['TD'],
	params: {}
});

//Vertical merge
inlineWYSIWYG.button('TMergeVCells', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TMergeVCells', 'tmergevcells');
		jQuery(button).attr({
			'value':		'TMergeVCells',
			'title':		'Объединить вертикальные ячейки'
		});
	},
	execute: function (params, targetNode, sels) {
		// Merge vertical cells
		var node = sels.getNode();
		
		//1. Get cells from next row matched by current cell index (if not break)
		var nextNode = tablesHelper.getNextRowCell(node);
		if(!nextNode) return;
		
		//2. Get down-cell contents and append it to current cell
		jQuery(node).html(jQuery(node).html() + ' ' + jQuery(nextNode).html());
		
		//3. Change current cell rowspan += 1
		var rowspan = jQuery(node).attr('rowspan');
		rowspan = rowspan ? parseInt(rowspan) : 1;
		jQuery(node).attr('rowspan', rowspan + 1);
		
		//4. Delete down-cell
		jQuery(nextNode).remove();
	},
	status: function () {
		return false;
	},
	requireTag: ['TD'],
	params: {}
});


inlineWYSIWYG.button('TMergeHCells', {
	init: function (params) {
		var button = inlineWYSIWYG.createSimpleButton(params['editor'], 'TMergeHCells', 'tmergehcells');
		jQuery(button).attr({
			'value':		'TMergeHCells',
			'title':		'Оъединить горизонтальые ячейки'
		});
	},
	execute: function (params, targetNode, sels) {
		var node = sels.getNode();
		var nextNode = tablesHelper.getNextCell(node);
		if(!nextNode) return;
		
		var colspan = tablesHelper.getCollSpan(node) + tablesHelper.getCollSpan(nextNode);
		
		sels.save();
		jQuery(node).attr('colspan', colspan);
		jQuery(node).html(jQuery(node).html() + ' ' + jQuery(nextNode).html());
		jQuery(nextNode).remove();
		sels.load();
		
	},
	status: function () {
		return false;
	},
	requireTag: ['TD'],
	params: {}
});



//Tables-related functions
var tablesHelper = function () {};
tablesHelper.getNextCell = function (node) {
	var nextTd = node;
	while(nextTd = nextTd.nextSibling) {
		if(nextTd.nodeType != 1) continue;
		if(nextTd.tagName == 'TD') break;
		if(nextTd.tagName != 'TD') return false;
	}
	return nextTd;
};

tablesHelper.getCollSpan = function (node) {
	var colspan = jQuery(node).attr('colspan');
	return colspan ? parseInt(colspan) : 1;
};


tablesHelper.createTable = function () {
	return	'<table><tbody>' +
		'<tr><td>1</td><td>2</td><td>3</td></tr>' +
		'<tr><td>4</td><td>5</td><td>6</td></tr>' +
		'<tr><td>7</td><td>8</td><td>9</td></tr>' +
		'</tbody></table>';
};

tablesHelper.deleteTable = function (node) {
	if(node = inlineWYSIWYG.seekTag(node, 'TABLE')) {
		jQuery(node).remove();
	}
};

tablesHelper.deleteRow = function (node) {
	if(!node || !node.parentNode) return;
	var tr = node.parentNode;
	if(tr.tagName == 'TR') {
		jQuery(tr).remove();
	}
};

tablesHelper.deleteColumn = function (node) {
	var nodes = tablesHelper.getColumnTD(node);
	jQuery(nodes).remove();
};

tablesHelper.getColumnTD = function (node) {
	var index = 0;
	tablesHelper.getRowTD(node).each(function (i, tdNode) {
		if(tdNode == node) return;
		index++;
		
	});
	
	var tdNodes = new Array();
	jQuery('tr', node.parentNode.parentNode).each(function (i, trNode) {
		var c = 0;
		jQuery('td', trNode).each(function (i, tdNode) {
			if(++c == index) {
				tdNodes.push(tdNode);
			}
		});
	});
	
	return tdNodes;
};

tablesHelper.getRowTD = function (node) {
	return jQuery('td', node.parentNode);
};

tablesHelper.insertRowBefore = function (node) {
	var node = inlineWYSIWYG.seekTag(node, 'TR');
	
	if(node) {
		var newNode = tablesHelper.cloneEmptyRow(node);
		jQuery(node).before(newNode);
	}
};

tablesHelper.insertRowAfter = function (node) {
	var node = inlineWYSIWYG.seekTag(node, 'TR');
	
	if(node) {
		var newNode = tablesHelper.cloneEmptyRow(node);
		jQuery(node).after(newNode);
	}
};


tablesHelper.insertColBefore = function (node) {
	var nodes = tablesHelper.getColumnTD(node);
	jQuery(nodes).each(function (i, n) {
		var tdNode = document.createElement('td');
		jQuery(n).before(tdNode);
	});
};

tablesHelper.insertColAfter = function (node) {
	var nodes = tablesHelper.getColumnTD(node);
	jQuery(nodes).each(function (i, n) {
		var tdNode = document.createElement('td');
		jQuery(n).after(tdNode);
	});
};

tablesHelper.cloneEmptyRow = function (node) {
	var node = jQuery(node).clone();
	jQuery('td', node).each(function (i, n) {
		jQuery(n).empty();
	});
	return node;
};

tablesHelper.getNextRowCell = function (node) {
	var nodes = tablesHelper.getColumnTD(node), matched = false, result = null;
	jQuery(nodes).each(function (i, n) {
		if(matched) {
			result = n;
			matched = false;
		}
		if(n == node) {
			matched = true;
		}
	});
	
	return result;
};