var inlineWYSIWYG = function (node) {
	var self = this;
	var targetNode = node;
	var toolboxNode = null;

	var drawToolbox = function () {
		var position = uPageEditor.nodePositionInfo(targetNode);
		toolboxNode = document.createElement('div');
		jQuery(toolboxNode).attr('class', 'eip-wysiwyg-toolbox eip-ui-element eip-wysiwyg_buttons');
		document.body.appendChild(toolboxNode);
		uPageEditor.placeWith(targetNode, toolboxNode, 'top', 'left');
		jQuery(toolboxNode).draggable();
	};


	var drawButtons = function () {
		var i;
		for(i in inlineWYSIWYG.buttons) {
			self.callButton(i, 'init', {
				'toolbox':	toolboxNode,
				'editor':	self
			});
		}
	};

	var checkButtons = function () {
		var i, selectedNode = self.sels.getNode();
		
		var checkedTags = new Array();
		for(i in inlineWYSIWYG.buttons) {
			var status = self.callButton(i, 'status');
			var node = jQuery('.eip-wysiwyg_button_' + i);
			if(node.size()) {
				if(status) node.addClass('act'); else node.removeClass('act');
			}
			
			var requireTag = inlineWYSIWYG.buttons[i].requireTag;
			if(requireTag) {
				var n, isOk = false;
				
				if(selectedNode) {
					for(n in requireTag) {
						if(typeof checkedTags[requireTag[n]] != 'undefined') {
							isOk = checkedTags[requireTag[n]];
							break;
						}
					
						if(inlineWYSIWYG.seekTag(selectedNode, requireTag[n])) {
							isOk = true;
							checkedTags[requireTag[n]] = true;
							break;
						} else {
							checkedTags[requireTag[n]] = false;
						}
					}
				}
				
				node.css('display', isOk ? '' : 'none');
			}
		}
	};


	var init = function () {
		drawToolbox();
		drawButtons();
		
		self.sels = new selections(window, targetNode);
		
		jQuery(targetNode).bind('click', function () {
			checkButtons();
		});
		
		jQuery(targetNode).bind('keyup', function () {
			checkButtons();
		});
		
		if(!targetNode.firstChild || targetNode.firstChild.tagName != 'P') {
			var html = jQuery.trim(jQuery(targetNode).html());
			jQuery(targetNode).html('<p>' + html + '</p>');
		}
	};


	this.getToolBox = function () {
		return toolboxNode;
	};

	this.callButton = function (name, funcName, params) {
		var button = inlineWYSIWYG.buttons[name];
		
		if(button) {
			var func = button[funcName];
			
			if(typeof func == 'function') {
				var result = func(params, targetNode, self.sels);
				if(funcName == 'execute') {
					setTimeout(function () {
						checkButtons();
					}, 150);
				}
				return result;
			}
		} else alert("Button \"" + name + "\" not found");
		return false;
	};	


	this.refocus = function () {
		node.focus();
	};
	
	
	this.destroy = function () {
		jQuery(toolboxNode).remove();
		jQuery(targetNode).unbind('click');
		jQuery(targetNode).unbind('keyup');
		jQuery(targetNode).unbind('mouseover');
		jQuery(targetNode).unbind('mouseout');
	};
	
	init();
};

inlineWYSIWYG.buttons = [];
inlineWYSIWYG.button = function (name, params) { inlineWYSIWYG.buttons[name] = params; };


inlineWYSIWYG.createSimpleButton = function (editor, name, prefix, noSelReset) {
	var node = document.createElement('a');
	jQuery(node).attr({
		'href':			'#',
		'className':	'eip-wysiwyg_button_' + prefix,
		'type':			'button'
	});
	editor.getToolBox().appendChild(node);
	
	noSelReset = true;	//Fixed lost selection bug, check if no more problems earned.
	var _editor = editor, _name = name, _noReset = noSelReset;
	jQuery(node).bind('click', function () {
		_editor.callButton(_name, 'execute');
		return false;
	});
	
	return node;
};

function createSimple (inName, inParams) {
	return function () {
		inlineWYSIWYG.button(inName, {
			init: function (params) {
				var button = inlineWYSIWYG.createSimpleButton(params['editor'], inName, inName);//inParams['prefix']);
				jQuery(button).attr({
					'value':		inParams['button-label'],
					'title':		inParams['button-title']
				});
				if(inParams['letter']) {
					jQuery(button).html(inParams['letter']);
				}
			},
			
			execute: function (params, targetNode, sels) {
				var selectedNode = sels.getNode();
				
				if(jQuery(selectedNode).attr('umi:field-name') || selectedNode == targetNode) {
					return false;
				}
				
				var align, aligns = {JustifyLeft: 'left', JustifyCenter: 'center', JustifyRight: 'right'};
				if(align = aligns[inName]) {
					if(targetNode.firstChild == selectedNode && selectedNode.tagName == 'P') {
						jQuery(selectedNode).css('text-align', align);
						return true;
					}
				}
				
				setTimeout(function () {
					try {
						return document.execCommand(inName, false, null);
					} catch (exception) {
						return false;
					}
				}, 110);
			},
			
			status: function () {
				try {
					return document.queryCommandState(inName);
				} catch (exception) {
					return false;
				}
			},
			
			params: inParams
		});
	};
};


inlineWYSIWYG.seekTag = function (node, tagName) {
	do {
		if(!node) return false;
		if(node.nodeType != 1) continue;
		if(node.tagName == tagName) return node;
		if(jQuery(node).hasClass('u-eip-editing')) return false;
		
	} while(node = node.parentNode);
	return false;
};

