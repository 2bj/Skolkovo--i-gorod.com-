// Events binding
$(document).ready(function() {
	$('a.unrestorable').click(function (e) {
		var link = $(e.target).attr('href');
		
		openDialog({
			'title': getLabel('js-delete-confirm'),
			'text': getLabel('js-confirm-unrecoverable-del'),
			'OKText': getLabel('js-confirm-unrecoverable-yes'),
			'cancelText': getLabel('js-confirm-unrecoverable-no'),
			'OKCallback': function () {
				window.location = link;
			}
		});
		
		return false;
	});


	// Bind modules menu show method to the Butterfly button
	var toggleMenuVisibility = function() {
		var el = $("#butterfly");
		if (!el.hasClass('act')) {
			el.addClass('act');
			$('div:first', el).show(0);
			$(document).bind('click', {}, toggleMenuVisibility );
			Control.enabled = false;
		} else {
			$('div:first', el).hide(0);
			el.removeClass('act');
			$(document).unbind('click', toggleMenuVisibility );
			Control.enabled = true;
		}
		return false;
	}
	$("#butterfly").click(toggleMenuVisibility);
	$("#butterfly > div").click(function(event){ event.stopPropagation(); });
	
	// Init dock
	
	SettingsStore.getInstance().addEventHandler("onloadcomplete", function() {
		var modules = SettingsStore.getInstance().get("dockItems");
		if(modules) {
			modules = modules.split(";");
			var div = $("#dock div:first");
			for(var i=0; i<modules.length; i++) {
				if(!modules[i].length) continue;
				var title = getLabel("module-" + modules[i]);
				div.append("<a href=\""+window.pre_lang+"/admin/"+modules[i]+"/\" title=\"" + title + "\" xmlns:umi=\"http://www.umi-cms.ru/TR/umi\" umi:module=\""+modules[i]+"\"><img title=\"" + title + "\" src=\"/images/cms/admin/mac/icons/medium/"+modules[i]+".png\" alt=\"" + title + "\" />" + title + "</a>");
			}
		}
	});
	
	
	$("#dock > img").click(function() {
		var div    = $("#dock div:first");
		var img    = $("#dock > img:first");
		var height = div.get(0).offsetHeight;
		div.slideToggle(0, function() {
							if(height) {
								img.attr("src", "/images/cms/admin/mac/common/doc_open.png");
								SettingsStore.getInstance().set("dockState", "closed");
							} else {
								img.attr("src", "/images/cms/admin/mac/common/doc_close.png");
								SettingsStore.getInstance().set("dockState", "opened");
							}						
						});
	});
	
	function updateDockStore() {
		var modules = [];
		$("#dock div:first a").each( function() { modules[modules.length] = $(this).attr('umi:module'); } );
		SettingsStore.getInstance().set("dockItems", modules.join(";"));	
	}
	
	// Make dock items sortable and menu items draggable to dock
	var outItem = null;
	
	$("#dock div:first").sortable({
		containment : 'window',
		tolerance  : 'pointer',
		revert     : false,
		placeholder: 'ui-state-highlight',
		deactivate : function (event, ui) {
						if(ui.helper) return;
						var e = $(ui.item);
						var i = $("img", e)[0];
						i.src = i.src.replace(/\/small\//, "/medium/");
						updateDockStore();
					 },
		out  : function(event, ui) { outItem = ui.item; },
		over : function() { outItem = null; },
		beforeStop : function() { if(outItem) { $(outItem).remove(); outItem = null; updateDockStore(); } },
		stop : function() { if(SettingsStore.getInstance().get("dockState") == "closed") { $("#dock div:first").slideUp(0, function() { $("#dock > img:first").attr("src", "/images/cms/admin/mac/common/doc_open.png"); }); } }
	}
	).disableSelection().slideUp(0);
	
	$("#butterfly a").draggable({
		connectToSortable : "#dock div:first",
		containment : 'document',
		helper : 'clone',
		revert : 'invalid',
		start   : function(event, ui) {
			var e      = $(ui.helper[0]);
			var module = e.attr('umi:module');
			$("#dock div:first a").filter( function() { return $(this).attr('umi:module') == module; } ).remove();
			e.addClass('drag');
			var i = $("img", e)[0];
			i.src = i.src.replace(/\/small\//, "/medium/");
			e.empty();
			e.append(i);
			$("#dock div:first").slideDown(0);
		}
	}).disableSelection();
	
	SettingsStore.getInstance().addEventHandler("onloadcomplete", function() {
		if(SettingsStore.getInstance().get("dockState") == "opened") {
			$("#dock div:first").slideDown(0, function() {
					$("#dock > img:first").attr("src", "/images/cms/admin/mac/common/doc_close.png");
			});
		}
	});
	
	//----------------------------------------------------
	// Properties group
	$("div.properties-group .header").click(function(){
		var group = $(this).parent();
		group.children(".content").toggle(0);
		if(group.children(".content:visible").size()) {
			setCookie(group.attr("name"), null);
		} else {
			setCookie(group.attr("name"), "1");
		}
	}).each(function() {
		var group = $(this).parent();
		if(getCookie(group.attr("name"))) {
			group.children(".content").hide(0);
		}
	});

	//----------------------------------------------------
	// Extended fields
	var extendedFieldsContainer = $("div.extended_fields");
	$("a.extended_fields_expander").click(function(){
		if(!getCookie("expandExtendedFields")||extendedFieldsContainer.css("display")=="none") {
			extendedFieldsContainer.css("display","");
		} else {
			extendedFieldsContainer.css("display","none");
		}
		if(extendedFieldsContainer.css("display") == "none") {
			setCookie("expandExtendedFields", null);
			$(this).text(getLabel("js-fields-expand"));
		} else {
			setCookie("expandExtendedFields", "1");
			$(this).text(getLabel("js-fields-collapse"));
		}
	});
	if(getCookie("expandExtendedFields")) {
		extendedFieldsContainer.css("display","");
		$("a.extended_fields_expander").text(getLabel("js-fields-collapse"));
	} else {
		extendedFieldsContainer.css("display","none");
		$("a.extended_fields_expander").text(getLabel("js-fields-expand"));
	}
	
	//----------------------------------------------------
	// Help panel
	if($("#info_block .content").attr("title") == "") {
		$("#head .help").hide();
	}
	$("#info_block .content").one("helpopen", {}, function() {
		var e   = $(this);
		var url = e.attr("title").substr(1);
		e.attr("title", "");
		$.get(url, {}, function(data){
			data = data.substr(data.indexOf('<body>') + 6);
			data = data.substr(0, data.indexOf('</body>'));
			
			e.html( data );
		});
	});	
	$("#head .help").click(function(){
		$("#info_block").toggle(0, function() {
			var e = $(this);
			if(e.css("display") != "none") {
				$("#content").removeClass("content-expanded");
				$(".content", e).trigger("helpopen");
				setCookie("help_" + window.location.pathname.replace(/\//gi, "_"), "1");
			} else {
				$("#content").addClass("content-expanded");
				setCookie("help_" + window.location.pathname.replace(/\//gi, "_"), null);
			}
			Control.recalcItemsPosition();
		});
	});
	if(getCookie("help_" + window.location.pathname.replace(/\//gi, "_")) !== null) {
		$("#head .help").click();
	}
	//----------------------------------------------------
	// Common controls initialization
	
	// Relations
	$("div.relation").each(function() {
		var e = $(this);
		new relationControl(e.attr("umi:type"), e.attr("id"), (e.attr("umi:empty") === "empty") );
	});
	// Symlink
	$("div.symlink").each(function() {
		var e = $(this);
		var l = $("ul", e);
		var s = new symlinkControl(e.attr("id"), "content", [],
						   { inputName      : e.attr("name"),
							 fadeColorStart : [255, 255, 225],
							 fadeColorEnd   : [255, 255, 255] });
		$("li", e).each(function(){
			var li = $(this);
			s.addItem(li.attr("umi:id"), li.text(), [li.attr("umi:module"), li.attr("umi:method")], li.attr("umi:href"));
		});
		l.remove();
	});
	// Files
	$("div.file").each(function() {
		var e = $(this);
		var defaultFolder = './images/cms/data';
		var options = {inputName : e.attr("name")};
		switch( e.attr("umi:field-type") ) {
			case "file"       :
			case "swf_file"   : defaultFolder = './files'; break;
			case "video_file" : options.videosOnly = true; defaultFolder = './files/video'; break;
			case "img_file"   : {
					options.imagesOnly = true;
					switch( e.attr("umi:name") ) {
						case "header_pic" : defaultFolder = './images/cms/headers'; break;
						case "menu_pic_a" :
						case "menu_pic_ua": defaultFolder = './images/cms/menu'; break;
					}
			}
		}	
		var c = new fileControl( e.attr("id"), options);
		c.setFolder(defaultFolder, true);
		c.setFolder(e.attr("umi:folder"));
		c.add(e.attr("umi:file"), true);
	});
	// Date
	$.datepicker.setDefaults($.extend({showOn			: 'button',
										buttonImage     : '/styles/common/other/calendar/icons_calendar_buttrefly.png',
										buttonImageOnly : true,
										duration		: 0,
										dateFormat		: 'yy-mm-dd'}, $.datepicker.regional["ru"]));
	$("div.datePicker").each(function(){
		$("input", $(this)).datepicker({dateFormat: 'yy-mm-dd'});
	});
	// Tags
	window.returnNewTag = function(inputId, tag, link) {
		var input = $("#" + inputId);
		if($(link).hasClass('disabledTag')) {
			$(link).removeClass('disabledTag');
			var tagList = input.val().split(",");
			var result  = [];
			for(var i=0; i<tagList.length; i++) {
				tagList[i] = tagList[i].replace(/^\s*/, "").replace(/\s*$/, "");
				if(tagList[i] !== tag) {
					result.push(tagList[i]);
				}
			}
			input.val( result.join(", ") );
		} else {
			$(link).addClass('disabledTag');
			input.val( input.val() + ", " + tag );
		}
	};
	$("a.tagPicker").each(function(){
		var e = $(this);
		e.click(function(){
			$.openPopupLayer({
				name   : "TagsCloud",
				title  : "Облако тегов",
				width  : 400,
				height : 200,
				url    : window.pre_lang + "/admin/stat/get_tags_cloud/" + e.attr('id').replace(/^link/,"") + "/"
			});
		});
	});
	// WYSIWYG
	$("textarea.wysiwyg").each(function (i, n) {
		tinyMCE.execCommand('mceAddControl', false, $(n).attr('id'));
	});
	// Permissions
	$("#permissionsContainer").each(function () {
		var e = $(this);
		var p = new permissionsControl(e.attr("id"));
		$("ul>li", e).each(function() {
			var li = $(this);
			p.add(li.attr("umi:id"), li.text(), li.attr("umi:access"));
		});
		$("ul", e).remove();
	});
	// Optioned
	$("table.optioned").each(function () {
		var e = $(this);
		new relationControl($("select", e).attr("umi:guide"), e.attr("id"));
		$("a.add", e).click(function() {
			var s  = $("select", e).get(0);
			if(s.selectedIndex == -1) return false;
			var i  = $("tr", e).size()+10;
			var tr = "<tr>";
			tr = tr + "<td>" + s.options[s.selectedIndex].text + "<input type=\"hidden\" name=\"" + $(s).attr("umi:name") + "["+i+"][rel]\" value=\""+s.options[s.selectedIndex].value+"\" /></td>";
			$("tfoot input[type=text]", e).not(":first").each(function(){
				var v = $(this).val();
				tr = tr + "<td class=\"center\">" + 
							"<input type=\"text\" name=\"" + $(s).attr("umi:name") + "["+i+"]["+$(this).attr("umi:type")+"]\" value=\""+v+"\" />"+
							"<input type=\"hidden\" name=\"" + $(s).attr("umi:name") + "["+i+"]["+(($(this).attr("umi:type")=="int")?"float":"int")+"]\" value=\"1\" />"+
							"</td>";
				$(this).val("");
			});
			tr = tr + "<td class=\"center\"><a href=\"#\" class=\"remove\"><img src=\"/images/cms/admin/mac/table/ico_del.gif\" /></a></td>";
			tr = tr + "</tr>";
			$("tbody", e).append(tr);
			return false;
		});
		$("a.remove", e).live('click', function() {
			$(this).parents("tr:first").remove();
			return false;
		});
	});
	
	$('.smc-fast-add').click(function () {
		var control = Control.getInstanceById($(this).attr('ref'));
		var link = $(this).attr('href') + 'fast.xml';

		if(control) {
			$.get(link, null, function () {
				control.dataSet.refresh();
			});
		}
		return false;
	});	
	// Type Selector
	$("div.imgButtonWrapper a").filter(function(){ return $(this).attr("umi:type"); }).each(function() {
		var e = $(this);
		if(e.attr("umi:prevent-default") == "true") { 
			var f = function(){return false;};
			e.bind({ click : f, mousedown : f, mouseup : f });
		}
		var p = $("<ul xmlns:umi=\"http://www.umi-cms.ru/TR/umi\" class=\"type_select\"></ul>");
		p.css({display : "none", position : "absolute", "z-index" : 100500});
		$.get("/utype/child/" + e.attr("umi:type"), {}, function(response) {
			$("type", response).each(function(){
				var type = $(this);
				$(p).append("<li><a href='#' umi:type-id='"+ type.attr("id")+"' title='" + type.attr("title") + "'>" + type.attr("title") + "</a></li>");
			});
		});		
		p.appendTo("body");
		e.add(p).bind({
			mouseover : function() {
				Control.enabled = false;
				var offset = e.offset();
				p.css({display : "block",
						top    : offset.top + e.height(),
						left   : offset.left,
						width : e.innerWidth()});
				e.addClass("type_select_active");
				$("a", p).each(function(){ 
					var basehref = e.attr("href");  
					var a = $(this); 
					var li = a.parent();
					var width = parseInt(li.innerWidth()) - parseInt(li.css("padding-left")) - parseInt(li.css("padding-right"));
					a.attr("href", basehref + (basehref.indexOf("?") >= 0 ? "&" : "?") + "type-id=" + a.attr("umi:type-id"));					
					a.css("width", width);
				});
			},
			mouseout  : function() {
				p.css("display", "none");
				e.removeClass("type_select_active");
				Control.enabled = true;
			}
		});
	});	
	
	$('input.discount-type-id').bind('click', function () {
		var discountTypeId = $(this).attr('value');
		
		$('div.discount-params input').attr('disabled', true);
		$('div.discount-params').css('display', 'none');
		
		$('div.discount-params#' + discountTypeId + ' input').attr('disabled', false);
		$('div.discount-params#' + discountTypeId + '').css('display', '');
	});
	// Sync name/alt-name/H1 fields
	if(window.is_page) {
		var iname = $("input:text[name=name]");
		var ialt  = $("input:text[name=alt-name]");
		var ih1   = $("input:text[name$=\[h1\]]");
		var callback = null;
		if(window.is_new) {
			callback = function() {
				ialt.val(transliterateRu(this.value.toLowerCase()).replace(/\s+/g, "_").replace(/[^A-z0-9_]+/g, ""));
				ih1.val(this.value);
			};
		} else {
			callback = function() {
				ih1.val(this.value);
			};
		}
		iname.focus(function() {
						if(window.is_new || (ih1.val() === iname.val()))
							$(this).bind("keyup", callback);
					})
		     .blur(function() { $(this).unbind("keyup", callback); });
	}
});

//-----------------------------------------------------------------------------
// Confirm windows helpers
//-----------------------------------------------------------------------------
function openDialog(options) {
	var confirmId    = Math.round( Math.random() * 100000 );
	var _opt = {
				name        : 'macConfirm' + confirmId,
				title       : "",
				text        : "",
				width       : 300,
				closeButton : true,
				stdButtons  : true,
				OKText      : "OK",
				cancelText  : getLabel("js-cancel"),
				OKCallback	   : null,
				cancelCallback : null
	};
	$.extend(_opt, options);
	var skin =
"<div class=\"eip_win_head popupHeader\" onmousedown=\"jQuery('.eip_win').draggable({containment: 'document'})\">\n\
	"+(_opt.closeButton?"<div class=\"eip_win_close popupClose\" onclick=\"javascript:jQuery.closePopupLayer('macConfirm"+confirmId+"')\">&#160;</div>":"")+"<div class=\"eip_win_title\">"+_opt.title+"</div>\n\
</div>\n\
<div class=\"eip_win_body popupBody\" onmousedown=\"jQuery('.eip_win').draggable('destroy')\">\n\
	<div class=\"popupText\">"+_opt.text+"</div>\n"+
	(_opt.stdButtons ?
	"<div class=\"eip_buttons\">\n\
		<input type=\"button\" class=\"primary ok\" value=\""+_opt.OKText+"\"  onclick=\"confirmButtonOkClick('"+_opt.name+"', "+confirmId+")\" />\n\
		<input type=\"button\" class=\"back\" value=\""+_opt.cancelText+"\" onclick=\"confirmButtonCancelClick('"+_opt.name+"', "+confirmId+")\" />\n\
		<div style=\"clear: both;\"/>\
	</div>" : "" ) +
"</div>";
	window['macConfirm'+confirmId+'OKC']     = _opt.OKCallback;
	window['macConfirm'+confirmId+'CancelC'] = _opt.cancelCallback;
	var param = {
		name : _opt.name,
		width : _opt.width,
		data : skin,
		closeable : _opt.closeButton
	};
	jQuery.openPopupLayer(param);
}

function closeDialog(name) {
	if(name)
		jQuery.closePopupLayer(name);
	else
		jQuery.closePopupLayer();
}

function confirmButtonOkClick(confirmName, confirmId) {
	var closeAllow = true;
	var callback   = window['macConfirm'+confirmId+'OKC'];
	if(callback) closeAllow = callback();
	if(closeAllow !== false) jQuery.closePopupLayer(confirmName);
}

function confirmButtonCancelClick(confirmName, confirmId) {
	var closeAllow = true;
	var callback = window['macConfirm'+confirmId+'CancelC'];
	if(callback) closeAllow = callback();
	if(closeAllow !== false) jQuery.closePopupLayer(confirmName);
}
//-----------------------------------------------------------------------------
// Tree/table confirms
//-----------------------------------------------------------------------------
function createConfirm(dataSetObject) {
	return function(arrData) {
		var Method = arrData['method'];
		var Params = arrData['params'];
		var hItem = Params['handle_item'];
		if (Params['allow']) return true;

		var dlgTitle = "";
		var dlgContent = "";
		var dlgOk = "";
		var dlgCancel =  getLabel('js-cancel');

		Control.enabled = false;
		ContextMenu.allowControlEnable = false;

		switch (Method) {
			case "tree_delete_element" :
				if(Control.HandleItem.control.flatMode) {
					dlgTitle = getLabel('js-del-object-title');
					dlgContent = getLabel('js-del-object-shured');
				} else if (Control.HandleItem.control.objectTypesMode) {
					dlgTitle = getLabel('js-del-object-type-title');
					dlgContent = getLabel('js-del-object-type-shured');
				} else {
					dlgTitle = getLabel('js-del-title');
					dlgContent = getLabel('js-del-shured');
				}

				dlgOk = getLabel('js-del-do');
			break;
			case "tree_copy_element" :

				if (!hItem.hasChilds) return true;

				if (Params['clone_mode']) {
					// real copy
					dlgTitle = getLabel('js-copy-title');
					dlgContent = getLabel('js-copy-shured');
					dlgOk = getLabel('js-copy-do');
				} else {
					// virtual copy
					dlgTitle = getLabel('js-vcopy-title');
					dlgContent = getLabel('js-vcopy-shured');
					dlgOk = getLabel('js-copy-do');
				}

				dlgContent += '<br/><br /><input type="checkbox" id="copy-all" />&nbsp;<label for="copy-all">' +  getLabel('js-copy-all') +'</label>';

			break;
			case "tree_move_element" :
				dlgTitle = getLabel('js-move-title');
				dlgContent = getLabel('js-move-shured');
				dlgOk = getLabel('js-move-do');
			break;
			default:
				return true;
			break;
		}

		dlgContent = '<div class="confirm">' + dlgContent + '</div>';

		openDialog({
			title      : dlgTitle,
			text	   : dlgContent,
			OKText     : dlgOk,
			cancelText : dlgCancel,			
			OKCallback: function () {				
				Params['allow'] = true;
				if (Method == "tree_copy_element") {
					Params['copy_all'] = $('#copy-all').attr("checked") ? 1 : 0;
				}
				dataSetObject.execute(Method, Params);
				Control.enabled = true;
				ContextMenu.allowControlEnable = true;
			},
			cancelCallback: function() {
				Control.enabled = true;
				ContextMenu.allowControlEnable = true;
			}
		});

		return false;
	}
}
