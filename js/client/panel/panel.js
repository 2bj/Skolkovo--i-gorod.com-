var uPanel = function (_params) {
	var params = _params, self = this, editor = null;
	
	var renderPanel = function () {
		jQuery(params['placeholder']).html(uPanel.getSource());
		
		//TODO ???
		if(jQuery.cookie('eip-panel-state') == 'collapsed') {
			//self.swap(jQuery('#u-show_hide_btn'));
		}
		//TODO ???
		
		jQuery('#u-show_hide_btn').click(function () {
			self.swap(this);
		});
		
		jQuery('#u-quickpanel #last_doc, #changelog_dd').click(function () {
			changeClassName(this);
		});
		
		jQuery('#u-quickpanel #edit').click(function () {
			self.swapEditor();
		});
		
		jQuery('#u-quickpanel #save_edit #save').click(function() {
			uPageEditor.get().submit();
			return false;
		});
		
		jQuery('#u-quickpanel #save_edit #edit_back').click(function () {
			uPageEditor.get().back(1);
			return false;
		});
		
		jQuery('#u-quickpanel #save_edit #edit_next').click(function () {
			uPageEditor.get().forward(1);
			return false;
		});
		
		jQuery('#u-quickpanel #exit').click(function  () {
			window.location = '/users/logout/';
			return false;
		});
		
		jQuery('#u-quickpanel #note').click(function  () {			
			if(!window.ticketCreated) {
				alert('Теперь нужно выделить область страницы, к которой Вы собираетесь создать заметку.');
				window.ticketCreated = true;
			}
			window.initNewTicket();
			return false;
		});
		
		jQuery('#u-quickpanel #help').click(function  () {
			window.location = "http://help.umi-cms.ru/";
			return false;
		});
		
		if(jQuery.cookie('eip-editor-state')) {
			changeClassName(jQuery('#u-quickpanel #edit'));
			self.swapEditor();
		}
		
	};
	
	var onLoadData = function (data) {
		jQuery('recent page', data).each(function (index, page) {
			var node = document.createElement('li');
			var name = jQuery('name', page).text();
			var link = jQuery(page).attr('link');
			jQuery(node).html("<a href='" + link + "'>" + name + "</a>");
			jQuery('ul#u-docs-recent').append(node);
		});
		
		var i = 0;
		jQuery('editable page', data).each(function (index, page) {
			var module = jQuery('basetype', page).attr("module");
			var hasPerm = false;
			jQuery('modules module', data).each(function () {
				if(jQuery(this).text() == module) {
					hasPerm = true;
				}
			});
			if(!hasPerm) return;
			
			var node = document.createElement('li');
			var name = jQuery('name', page).text();
			var link = jQuery('edit-link', page).text();
			jQuery(node).html("<a href='" + link + "'>" + name + "</a>");
			jQuery('#u-quickpanel ul#u-docs-edit').append(node);
			i++;
		});
		
		if(i) {
			jQuery("#u-quickpanel #edit_menu").click(function(){
				changeClassName(this);
			});
		} else {
			jQuery("#u-quickpanel #edit_menu").hide(0);
		}
		
		i = 0;
		jQuery('modules module', data).each(function (index, module) {
			var node = document.createElement('li');
			
			var label = jQuery(module).attr('label');
			var name = jQuery(module).text();
			var link = '/admin/' + name + '/';
			var type = jQuery(module).attr('type');
			
			var selector;
			if(type == 'system') {
				selector = 'ul#u-mods-admin';
			} else if(type == 'util') {
				selector = 'ul#u-mods-utils';
			} else {
				selector = (++i % 2) ? 'ul#u-mods-cont-left' : 'ul#u-mods-cont-right';
			}
			
			jQuery(node).html("<a href='" + link + "'>" + label + "</a>");
			jQuery('#u-quickpanel ' + selector).append(node);
		});
		if(i) {
			jQuery("#u-quickpanel #butterfly").click(function(){ changeClassName(this); }).addClass("butterfly_hover");
		}
		
		var currentLocation = window.location.pathname;
		
		if(jQuery('changelog', data).size() > 0) {
			jQuery('changelog revision', data).each(function (index, revision) {
				var node = document.createElement('li');
				var time = jQuery('date', revision).text();
				var login = jQuery('author', revision).attr('name');
				var link = jQuery('link', revision).text();
				var active = (jQuery(revision).attr('active') == 'active');
				
				var label = time;
				if(login) {
					label += ' - ' + login;
				}
				
				link += '?force-redirect=' + window.location.pathname;
				
				if(active) {
					label += '&nbsp;&nbsp;&nbsp;&larr;';
				}
				
				jQuery(node).html("<a href='" + link + "'>" + label + "</a>");
				jQuery('#u-changelog').append(node);
			});
		
			jQuery('#changelog_dd').css('display', '');
		} else {
			jQuery('#changelog_dd').css('display', 'none');
		}
		
		if(jQuery('tickets', data).size() && (typeof tickets != 'undefined')) {
			tickets(jQuery, data);
		} else {
			jQuery('#u-quickpanel #note').remove();
		}
	};
	
	var loadData = function () {
		var url = '/admin/content/frontendPanel.xml?links';
		url += '&ts=' + Math.round(Math.random() * 1000);
		
		jQuery.get(url, {
			referer: window.location.toString()
		}, onLoadData);
	};
	
	var uPageEditorOnInit = function () {
		var h = (typeof uPageEditor.onEnable == 'function') ? uPageEditor.onEnable : function () {};
		uPageEditor.onEnable = function () {
			h();
			changeClassName(jQuery('#edit'));
		};
		
		var h = (typeof uPageEditor.onDisable == 'function') ? uPageEditor.onDisable : function () {};
		uPageEditor.onDisable = function () {
			h();
			changeClassName(jQuery('#edit'));
		};
		
		uPageEditor.onStep = function (index, size) {
			jQuery('#u-quickpanel #save_edit #edit_back').attr('class', (index == -1) ? '' : 'ac');
			jQuery('#u-quickpanel #save_edit #edit_next').attr('class', ((size - index) == 1) ? '' : 'ac');
		};
	};
	
	renderPanel();
	uPageEditorOnInit();
	loadData();
};

uPanel.prototype.swapEditor = function () {
	var editor = uPageEditor.get();
	
	if(editor.isEnabled()) {
		editor.disable();
		jQuery('#u-quickpanel #edit').html(getLabel('js-panel-edit') + ' (F2)');
	} else {
		editor.enable();
		jQuery('#u-quickpanel #edit').html(getLabel('js-panel-view') + ' (F2)');
	}
};


uPanel.prototype.swap = function (el) {
	var quickpanel_width = jQuery("#u-quickpanel").css("width");
	if (quickpanel_width == "0px") {
		return this.expand(el);
	} else {
		return this.collapse(el);		
	}
};

uPanel.prototype.expand = function (el) {
	var quickpanel = jQuery("#u-quickpanel");
	quickpanel.css('overflow', 'visible');
	quickpanel.animate({width:"100%"}, 500);
	el.style.background = 'url(\'/js/client/panel/quickpanel_bg.png\') no-repeat -635px -33px';
	
	jQuery.cookie('eip-panel-state', '', { path: '/', expires: 0});
};

uPanel.prototype.collapse = function (el) {
	var quickpanel = jQuery("#u-quickpanel");
	quickpanel.css('overflow', 'hidden');
	quickpanel.animate({width:"0"}, 500);
	el.style.background = 'url(\'/js/client/panel/quickpanel_bg.png\') no-repeat -635px 1px';
	
	var date = new Date();
	date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
	jQuery.cookie('eip-panel-state', 'collapsed', { path: '/', expires: date});
};

uPanel.loadRes = function (type, src, callback) {
	var node;
	switch(type) {
		case 'js': case 'text/javascript':
			node = document.createElement('script');
			node.src = src;
			node.charset = 'utf-8';
			break;
		
		case 'css': case 'text/css':
			node = document.createElement('link');
			node.href = src;
			node.rel = 'stylesheet';
			break;
		default: return;
	}
	
	document.body.parentNode.firstChild.appendChild(node);
	if(typeof callback == 'function') jQuery(document).one('ready', callback);
};

uPanel.getSource = function () {
	return '<div id="u-show_hide_btn" />\
<div id="u-quickpanel">\
	<div id="exit" title="Выход">&#160;</div>\
	<div id="help" title="Документация">&#160;</div>\
	<div id="butterfly" title="Модули">&#160;\
		<div>\
			<div class="bg">\
				<ul id="u-mods-cont-left" />\
				<ul id="u-mods-cont-right" />\
				<div class="clear" style="border-top:solid 1px #b2c7d5; border-bottom:solid 1px white;" />\
				<ul id="u-mods-admin" />\
				<ul id="u-mods-utils" />\
				<div class="clear" />\
			</div>\
			<div class="bottom_bg" />\
		</div>\
	</div>\
	<div id="edit">' + getLabel('js-panel-edit') + ' (F2)' + '</div>\
	<div id="save_edit">\
		<div id="save" title="Сохранить">&#160;</div>\
		<div id="edit_back" title="Отменить">&#160;</div>\
		<div id="edit_next" title="Повторить">&#160;</div>\
	</div>\
	<div id="edit_menu" title="Редактировать в админке (Shift+D)">&#160;\
		<div>\
			<ul id="u-docs-edit"/>\
			<div class="bottom_bg" />\
		</div>\
	</div>\
	<div id="last_doc">\
		Последние документы\
		<div>\
			<ul id="u-docs-recent" />\
			<div class="bottom_bg" />\
		</div>\
	</div>\
	<div id="changelog_dd">\
		История изменений\
		<div>\
			<ul id="u-changelog" />\
			<div class="bottom_bg" />\
		</div>\
	</div>\
	<div id="note">Заметка (Shift+C)</div>\
</div>';
};


jQuery(document).ready(function () {
	var placeholder = jQuery('#u-panel-holder');
	if(placeholder.size() == 0) {
		var div = document.createElement('div');
		div.id = 'u-panel-holder';
		document.body.appendChild(div);
		placeholder = jQuery('#u-panel-holder');
	}
	jQuery('html').addClass('u-eip');
	
	var panel = new uPanel({
		'placeholder':		placeholder
	});
	
	jQuery(document).keypress(function (e) {
		var code = e.charCode || e.keyCode;
		
		if(e.shiftKey && (code == 68 || code == 100 || code == 1042 || code == 1074)) {
			jQuery('#u-quickpanel #edit_menu').each(function (i, node) {
				changeClassName(node);
			});
		}
	});
});

function changeClassName(el) {
	var eCond = (uPageEditor.get().isEnabled()) ? '[id != \'edit\']' : '';
	
	if (!jQuery(el).hasClass('act')) {
		var act_arr = jQuery('#u-quickpanel .act');
		if (act_arr.size()) {
			jQuery('#u-quickpanel .act div:first').hide();
			jQuery('#u-quickpanel .act' + eCond).removeClass('act');
			if (el.id == 'edit' && !eCond)
				jQuery("#save_edit").css('display', 'none');
		}
		jQuery(el).addClass('act');
		jQuery('#u-quickpanel .act div:first').show();
		if (jQuery(el).attr('id') == 'edit')
			jQuery("#save_edit").css('display', 'block');
	}
	else {
		jQuery('#u-quickpanel .act div:first').hide();
		jQuery('#u-quickpanel .act' + eCond).removeClass('act');
		if (jQuery(el).attr('id') == 'edit')
			jQuery("#save_edit").css('display', 'none');
	}
};
