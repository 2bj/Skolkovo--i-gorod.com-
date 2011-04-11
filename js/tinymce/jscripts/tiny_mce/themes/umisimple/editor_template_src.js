/**
 * $Id: editor_template_src.js 920 2008-09-09 14:05:33Z spocke $
 *
 * This file is meant to showcase how to create a simple theme. The advanced
 * theme is more suitable for production use.
 *
 * @author Leeb
 * @copyright Copyright © 2010, UmiSoft, All rights reserved.
 */

(function() {
	var DOM = tinymce.DOM;

	// Tell it to load theme specific language pack(s)
	tinymce.ThemeManager.requireLangPack('umisimple');

	tinymce.create('tinymce.themes.UmiSimpleTheme', {
		init : function(ed, url) {
			var t = this, states = ['Bold', 'Italic', 'Underline', 'JustifyLeft', 'JustifyCenter', 'JustifyRight',  'InsertUnorderedList', 'InsertOrderedList'], s = ed.settings;

			t.editor = ed;
			

			ed.onInit.add(function() {
				ed.onNodeChange.add(function(ed, cm) {
					tinymce.each(states, function(c) {
						cm.get(c.toLowerCase()).setActive(ed.queryCommandState(c));
					});
				});

				ed.dom.loadCSS(url + "/skins/" + s.skin + "/content.css");
			});

			DOM.loadCSS((s.editor_css ? ed.documentBaseURI.toAbsolute(s.editor_css) : '') || url + "/skins/" + s.skin + "/ui.css");
		},

		renderUI : function(o) {
			var t = this, n = o.targetNode, ic, b, tb, ed = t.editor, cf = ed.controlManager, sc;

			n = DOM.insertAfter(DOM.create('span', {id : ed.id + '_container', 'class' : 'mceEditor ' + ed.settings.skin + 'UmiSimpleSkin'}), n);
			n = sc = DOM.add(n, 'table', {cellPadding : 0, cellSpacing : 0, 'class' : 'mceLayout'});
			n = b  = DOM.add(n, 'tbody');


			// Create toolbar container
			n = DOM.add(DOM.add(b, 'tr', {'class' : 'first'}), 'td', {'class' : 'mceToolbar mceFirst'});

			// Create toolbar
			tb = t.toolbar = cf.createToolbar("tools1");
			tb.add(cf.createButton('bold', {title : 'umisimple.bold_desc', cmd : 'Bold'}));
			tb.add(cf.createButton('italic', {title : 'umisimple.italic_desc', cmd : 'Italic'}));
			tb.add(cf.createButton('underline', {title : 'umisimple.underline_desc', cmd : 'Underline'}));

			tb.add(cf.createButton('justifyleft', {title : 'umisimple.justifyleft_desc', cmd : 'JustifyLeft'}));
			tb.add(cf.createButton('justifycenter', {title : 'umisimple.justifycenter_desc', cmd : 'JustifyCenter'}));
			tb.add(cf.createButton('justifyright', {title : 'umisimple.justifyright_desc', cmd : 'JustifyRight'}));

			tb.add(cf.createButton('insertunorderedlist', {title : 'umisimple.bullist_desc', cmd : 'InsertUnorderedList'}));
			tb.add(cf.createButton('insertorderedlist', {title : 'umisimple.numlist_desc', cmd : 'InsertOrderedList'}));

			tb.add(cf.createButton('link', {title : 'umisimple.link_desc', cmd : 'mceLink'}));
			tb.add(cf.createButton('unlink', {title : 'umisimple.unlink_desc', cmd : 'unlink'}));
			tb.add(cf.createButton('image', {title : 'umisimple.image_desc', cmd : 'mceImage'}));

			tb.add(cf.createButton('cleanup', {title : 'umisimple.cleanup_desc', cmd : 'umiCleanup'}));

			var paste = tb.add(cf.createButton('clipboardpaste', {title : '', click : function(){} }));

			tb.renderTo(n);

			// Create iframe container
			n = DOM.add(b, 'tr', {'class' : 'last'});
			n = ic = DOM.add(DOM.add(n, 'td', {'class' : 'mceLast'}), 'div', {'class' : 'mceIframeContainer'});

			var toolbox = jQuery("#"+tb.id);
			var tip = jQuery("<div class='wysiwyg_tip'>Для вставки из буфера обмена нажмите Ctrl+V</div>");
			jQuery("#" + paste.id).mouseenter(function() {
				var offset = toolbox.offset();
				jQuery(document.body).append(tip);
				tip.css({
					position : 'absolute',
					display  : 'none',
					top      : (offset.top - parseInt(tip.outerHeight()) - 2) + "px",
					left	 : offset.left + "px",
					width    : (parseInt(toolbox.parent().innerWidth()) - 10) + "px"
				}).fadeIn(400);
			}).mouseleave(function(){
				tip.fadeOut(400, function(){ tip.remove(); });
			});

			return {
				iframeContainer : ic,
				editorContainer : ed.id + '_container',
				sizeContainer : sc,
				deltaHeight : -20
			};
		},

		execCommand : function(cmd, ui, val) {
			var f = this['_' + cmd];

			if (f) {
				f.call(this, ui, val);
				return true;
			}

			return false;
		},

		_mceImage : function(ui, val) {
			var ed = this.editor;
			
			// Internal image object like a flash placeholder
			if (ed.dom.getAttrib(ed.selection.getNode(), 'class').indexOf('mceItem') != -1)
				return;

			ed.windowManager.open({
				url : tinymce.baseURL + '/themes/umisimple/image.htm',
				width : 355 + parseInt(ed.getLang('umisimple.image_delta_width', 0)),
				height : 275 + parseInt(ed.getLang('umisimple.image_delta_height', 0)),
				inline : true
			}, {
				theme_url : tinymce.baseURL + '/themes/umisimple'
			});
		},

		_mceLink : function(ui, val) {
			var ed = this.editor;
			
			ed.windowManager.open({
				url : tinymce.baseURL + '/themes/umisimple/link.htm',
				width : 310 + parseInt(ed.getLang('umisimple.link_delta_width', 0)),
				height : 200 + parseInt(ed.getLang('umisimple.link_delta_height', 0)),
				inline : true
			}, {
				theme_url : tinymce.baseURL + '/themes/umisimple'
			});
		},

		_umiCleanup : function(ui, val) {
			var ed   = this.editor;
			var html = ed.getContent();

			html = html.replace(/<![\s\S]*?--[ \t\n\r]*>/ig, ' ');
			html = html.replace(/(<|&lt;)!--[\w\W\n]*?--(>|&gt;)/mig, '');
			html = html.replace(/<\/?(title|style|font|meta)\s*[^>]*>/ig, '');
			html = html.replace(/\s*mso-[^:]+:[^;""]+;?/ig, '');
			html = html.replace(/<\/?o:[^>]*\/?>/ig, '');
			html = html.replace(/ style=['"]?[^'"]*['"]?/ig, '');


			html = html.replace(/ class=['"]?[^'">]*['"]?/ig, '');

			html = html.replace(/<span\s*[^>]*>\s*&nbsp;\s*<\/span>/ig, '');
			html = html.replace(/<span\s*[^>]*>/ig, '');
			html = html.replace(/<\/span\s*[^>]*>/ig, '');
			
			// Glue
			html = html.replace(/<\/(b|i|s|u|strong|center)>[\t\n]*<\1[^>]*>/gi, "");
			html = html.replace(/<\/(b|i|s|u|strong|center)>\s*<\1[^>]*>/gi, " ");
			// Cut epmty
			html = html.replace(/<(b|i|s|u|strong|center)[^>]*>[\s\t\n\xC2\xA0]*<\/\1>/gi, "");
			// Cut trash symbols
			html = html.replace(/(\t|\n|\s){2,}/gi, " ");

			if(jQuery.browser.safari) {
				html = html.replace(/\bVersion:\d+\.\d+\s+StartHTML:\d+\s+EndHTML:\d+\s+StartFragment:\d+\s+EndFragment:\d+\s*\b/gi, "");
			}			

			ed.setContent(html);
			tinyMCE.execCommand("mceCleanup", ui, val);
		},

		getInfo : function() {
			return {
				longname : 'UMI Simple theme',
				author : 'UmiSoft',
				authorurl : 'http://www.umi-cms.ru/',
				version : "1.0"
			}
		}
	});

	tinymce.ThemeManager.add('umisimple', tinymce.themes.UmiSimpleTheme);
})();