	var mce_lang = typeof(interfaceLang) !== 'undefined' ? interfaceLang : 'ru';


	window.mceCommonSettings = {
		// General options
		mode : "none",
		theme : "umi",
		language : mce_lang,
		width : "100%",
		plugins : "safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,imagemanager",

		inlinepopups_skin : 'butterfly',
/*
		// Theme options
		theme_umi_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
		theme_umi_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_umi_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		theme_umi_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",

*/

		toolbar_standart : "imagemanager,fontsettings,tablesettings,|,"
		+"cut,copy,paste,|,pastetext,pasteword,|,selectall,cleanup,|,"
		+ "undo,redo,|,"
		+ "link,unlink,anchor,image,media,|,"
		+ "charmap,code",

		toolbar_tables : "table,delete_table,|,col_after,col_before,row_after,row_before,|,delete_col,delete_row,|,split_cells,merge_cells,|,row_props,cell_props",
		
		toolbar_fonts: "formatselect,fontselect,fontsizeselect,|,"
		+ "bold,italic,underline,|,"
		+ "justifyleft,justifycenter,justifyright,justifyfull,|,"
		+ "bullist,numlist,outdent,indent,|,"
		+ "forecolor,backcolor,|,"
		+ "sub,sup",


		theme_umi_toolbar_location : "top",
		theme_umi_toolbar_align : "left",
		theme_umi_statusbar_location : "bottom",
		theme_umi_resize_horizontal : false,
		theme_umi_resizing : true,

		// Example content CSS (should be your site CSS)
		content_css : "css/example.css",

		// Callbacks
		file_browser_callback : "umiFileBrowserCallback",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "js/template_list.js",
		external_link_list_url : "js/link_list.js",
		external_image_list_url : "js/image_list.js",
		media_external_list_url : "js/media_list.js"
	}

	var umiTreeLink = function(field_name, url, type, win) {
        var domain_floated    = window.domain_floated;
        var domain_floated_id = window.domain_floated_id;
        var lang_id           = window.lang_id;		
		var sTreeLinkUrl = "/js/tinymce/jscripts/tiny_mce/themes/umi/treelink.html?domain="+domain_floated+"&domain_id=" + domain_floated_id + "&lang="+lang+"&lang_id="+lang_id;
		tinyMCE.activeEditor.windowManager.open({
			url    : sTreeLinkUrl,
			width  : 525,
			height : 308,
			inline         : true,
			scrollbars	   : false,
			resizable      : false,
			maximizable    : false,
			close_previous : false
		}, {
			window    : win,
			input     : field_name,
			editor_id : tinyMCE.selectedInstance.editorId
		});
		return false;
	}
	
	var umiFileManager = function(field_name, url, type, win) {
		var input = win.document.getElementById(field_name);
		if(!input) return false;
		var qs    = [];
		qs.push("id=" + field_name);
		switch(type) {
			case "image" : qs.push("image=1"); break;
			case "media" : qs.push("media=1"); break;			
		}
		if(input.value.length) {			
			var folder = input.value.substr(0, input.value.lastIndexOf('/'));
			qs.push("folder=." + folder);
			qs.push("file=" + input.value);
		}
		$.openPopupLayer({
			name   : "Filemanager",
			title  : "Файловый менеджер",
			width  : 660,
			height : 460,
			url    : "/styles/common/other/filebrowser/umifilebrowser.html?" + qs.join("&")
		});
		return false;
	}

	window.umiFileBrowserCallback = function(field_name, url, type, win) {		
		switch (type) {
			case "file"  : umiTreeLink(field_name, url, type, win); break;
			case "image" :
			case "media" : umiFileManager(field_name, url, type, win); break;
		}
		return false;
	}


/*
	window.mceCommonSettings = {
		mode : "none",
//		strict_loading_mode: true,  
		language : mce_lang,
		theme: "advanced",
		plugins : "imanager,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,zoom,media,paste,arearesize",
		theme_umi_toolbar_location : "top",
		theme_umi_toolbar_align : "left",

		toolbar_standart : "imanager,fontsettings,tablesettings,|,"
		+"cut,copy,paste,|,pastetext,pasteword,|,selectall,cleanup,|,"
		+ "undo,redo,|,"
		+ "link,unlink,anchor,image,media,|,"
		+ "charmap,code",

		toolbar_tables : "table,delete_table,|,col_after,col_before,row_after,row_before,|,delete_col,delete_row,|,split_cells,merge_cells,|,row_props,cell_props",
		
		toolbar_fonts: "formatselect,fontselect,fontsizeselect,|,"
		+ "bold,italic,underline,|,"
		+ "justifyleft,justifycenter,justifyright,justifyfull,|,"
		+ "bullist,numlist,outdent,indent,|,"
		+ "forecolor,backcolor,|,"
		+ "sub,sup",

		valid_elements : "+a[id|style|rel|rev|charset|hreflang|dir|lang|tabindex|accesskey|type|name|href|target|title|class|onfocus|onblur|onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup],-strong/-b[class|style],-small,-em/-i[class|style],-strike[class|style],-u[class|style],#p[id|style|dir|class|align],-ol[id|class|style],-ul[id|class|style],-li[id|class|style],br,img[id|dir|lang|longdesc|usemap|style|class|src|onmouseover|onmouseout|border|alt=|title|hspace|vspace|width|height|align],-sub[style|class],-sup[style|class],-blockquote[dir|style],-table[border=0|cellspacing|cellpadding|width|height|class|align|summary|style|dir|id|lang|bgcolor|background|bordercolor],-tr[id|lang|dir|class|rowspan|width|height|align|valign|style|bgcolor|background|bordercolor],tbody[id|class],thead[id|class],tfoot[id|class],#td[id|lang|dir|class|colspan|rowspan|width|height|align|valign|style|bgcolor|background|bordercolor|scope],-th[id|lang|dir|class|colspan|rowspan|width|height|align|valign|style|scope],caption[id|lang|dir|class|style],-div[id|dir|class|align|style],-span[id|style|class|align],-pre[class|align|style],address[class|align|style],-h1[id|style|dir|class|align],-h2[id|style|dir|class|align],-h3[id|style|dir|class|align],-h4[id|style|dir|class|align],-h5[id|style|dir|class|align],-h6[id|style|dir|class|align],hr[class|style],-font[face|size|style|id|class|dir|color],dd[id|class|title|style|dir|lang],dl[id|class|title|style|dir|lang],dt[id|class|title|style|dir|lang],cite[title|id|class|style|dir|lang],abbr[title|id|class|style|dir|lang],acronym[id|title|class|style|dir|lang],del[title|id|class|style|dir|lang|datetime|cite],ins[title|id|class|style|dir|lang|datetime|cite]",

		convert_urls : true,
		relative_urls : false,
		urlconverter_callback : "umiUrlConverter",
		convert_fonts_to_spans : true,
		cleanup : true,
		remove_linebreaks: false,

//		entity_encoding : "numeric",

		extended_valid_elements : "script[type=text/javascript|src|languge|lang],map[*],area[*],umi:*[*],input[*],noindex",

		oninit: "onTinyMCEInit",

		theme_umi_styles : "Table=my-table;Table Cell=my-table-cell;Table Row=my-table-row",

		file_browser_callback : "umiExtCallbacks"

	}
	
	window.umiUrlConverter = function(url, node, on_save) {
		var dl = document.location, start, portPart, urlParts, baseUrlParts, tmpUrlParts, curl;
		var prot = dl.protocol, host = dl.hostname, port = dl.port;

		url = unescape(url);

		// Pass through file protocol
		if (prot == "file:")
			return url;

		var sHref = document.location.href;
		url = tinyMCE.regexpReplace(url, sHref, '');		

		if (url.indexOf('%') !== -1) return url;

		// Something is wrong, remove weirdness
		url = tinyMCE.regexpReplace(url, '(http|https):///', '/');

		// Mailto link or anchor (Pass through)
		if (url.indexOf('mailto:') != -1 || url.indexOf('javascript:') != -1 || /^[ \t\r\n\+]*[#\?]/.test(url))
			return url;


		// Fix relative/Mozilla
		if (!tinyMCE.isIE && !on_save && url.indexOf("://") == -1 && url.charAt(0) != '/')
			return tinyMCE.settings.base_href + url;

		// Handle relative URLs
		if (on_save && tinyMCE.getParam('relative_urls')) {
			curl = tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href, url);
			if (curl.charAt(0) == '/')
				curl = tinyMCE.settings.document_base_prefix + curl;

			urlParts = tinyMCE.parseURL(curl);
			tmpUrlParts = tinyMCE.parseURL(tinyMCE.settings.document_base_url);

			// Force relative

			if (urlParts.host == tmpUrlParts.host && (urlParts.port == tmpUrlParts.port))
				return tinyMCE.convertAbsoluteURLToRelativeURL(tinyMCE.settings.document_base_url, curl);
		}		

		// Handle absolute URLs
		if (!tinyMCE.getParam('relative_urls')) {
			urlParts = tinyMCE.parseURL(url);
			baseUrlParts = tinyMCE.parseURL(tinyMCE.settings.base_href);

			// Force absolute URLs from relative URLs
			//url = tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href, url);

			// If anchor and path is the same page
			if (urlParts.anchor && urlParts.path == baseUrlParts.path)
				return "#" + urlParts.anchor;
		}

		// Remove current domain
		if (tinyMCE.getParam('remove_script_host')) {			
			start = "";
			portPart = "";

			if (port !== '')
				portPart = ":" + port;

			start = prot + "//" + host + portPart + "/";

			if (url.indexOf(start) == 0)
				url = url.substring(start.length-1);
		}		

		return url;
	}

	var umiTreeLink = function(field_name, url, type, win) {
        var domain_floated = window.domain_floated;
        var domain_floated_id = window.domain_floated_id;
        
        var lang_id = window.lang_id;
		// newer writing style of the TinyMCE developers for tinyMCE.openWindow
		var sTreeLinkUrl = "/tinymce/jscripts/tiny_mce/themes/umi/treelink.html?domain="+domain_floated+"&domain_id=" + domain_floated_id + "&lang="+lang+"&lang_id="+lang_id;
		tinyMCE.openWindow({
			file : sTreeLinkUrl,
			width : 525,
			height : 280,
			close_previous : "no"
		}, {
			window : win,
			input : field_name,
			resizable : "yes",
			inline : "yes",  // This parameter only has an effect if you use the inlinepopups plugin!
			editor_id : tinyMCE.selectedInstance.editorId
		});
		return false;
}


	window.umiExtCallbacks = function(field_name, url, type, win) {
		//alert("Field_Name: " + field_name + "\nURL: " + url + "\nType: " + type + "\nWin: " + win); // debug/testing
		switch (type) {
			case "file" : umiTreeLink(field_name, url, type, win);
			case "image" : return;
		}
		return false;
	}


	var onTinyMCEInit = function () {

		tinyMCE.modalDlg = null;

		tinyMCE.openWindow = function(template, args) {

			var html, width, height, x, y, resizable, scrollbars, url, name, win, modal, features;

			args = !args ? {} : args;

			args.mce_template_file = template.file;
			args.mce_width = template.width;
			args.mce_height = template.height;
			tinyMCE.windowArgs = args;

			html = template.html;
			if (!(width = parseInt(template.width)))
				width = 320;

			if (!(height = parseInt(template.height)))
				height = 200;

			// Add to height in M$ due to SP2 WHY DON'T YOU GUYS IMPLEMENT innerWidth of windows!!

			height += 10;
			
			if (template.file.charAt(0) != '/' && template.file.indexOf('://') == -1)
				url = tinyMCE.baseURL + "/themes/" + tinyMCE.getParam("theme") + "/" + template.file;
			else
				url = template.file;


			// Replace all args as variables in URL
			for (name in args) {
				if (typeof(args[name]) == 'function')
					continue;

				url = tinyMCE.replaceVar(url, name, escape(args[name]));
			}

			var oTime = new Date();
			var oWindow = new umiWindow(width, height);


			
			if (typeof tinyMCE.arrDialogs == 'undefined') tinyMCE.arrDialogs = new Array();

			tinyMCE.arrDialogs[tinyMCE.arrDialogs.length] = oWindow.oWin;

			tinyMCE.modalDlg = oWindow.oWin;

			if (html) {
				tinyMCE.modalDlg.setHTMLContent(html);			
			} else {
				if(tinyMCE.isRealIE) {
					var inst = tinyMCE.selectedInstance;
					var book = inst.selection.getBookmark(true); 
					window.restoreSelectionBookmark = function () {
						inst.selectionBookmark = book;
					};
				}

				tinyMCE.modalDlg.setURL(url);
			}
			tinyMCE.modalDlg.showCenter(true);
		}

		tinyMCE.closeWindow = function(win) {
			if (tinyMCE.modalDlg) {
				tinyMCE.modalDlg.close();
				tinyMCE.modalDlg.destroy();
				tinyMCE.arrDialogs[tinyMCE.arrDialogs.length-1] = null;
				tinyMCE.arrDialogs = tinyMCE.arrDialogs.compact();
				tinyMCE.modalDlg = tinyMCE.arrDialogs.last();
			}
		}

	}


*/