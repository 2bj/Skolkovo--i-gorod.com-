function typeControl(_typeId, _options) {
	var _self  = this;
	var typeId = _typeId;
	var container = $(_options.container) || alert('container not found');
	var groups = {};
	var fields = {};
	var typesList  = [];
	var guidesList = [];
	var restrictionsList   = {};
	var restrictionsLoaded = false;

	var init = function() {
		var addButton = $("<span class='fg_add_group'><a href='#' class='add'>" + getLabel('js-type-edit-add_group') + "</a></span>");
		$("a", addButton).click( function() {
									_self.addGroup({id      : 'new',
													title   : getLabel("js-type-edit-new_group"),
													name    : '',
													visible : true});
									return false;
								} );
		addButton.appendTo(container);
		container.sortable({items: "div.fg_container",
							update : function(e, ui){
										var groupId     = ui.item.attr("umiGroupId");
										var nextGroupId = ui.item.next("div.fg_container").attr("umiGroupId") || "false";
										$.get("/admin/data/json_move_group_after/"+groupId+"/"+nextGroupId+"/"+typeId+"/");
									  }        });
		container.before("<div id='removeConfirm' style='display:none;' >\
							<div class='eip_win_head popupHeader' onmousedown=\"$('.eip_win').draggable({containment: 'window'})\">\
								<div class='eip_win_close popupClose' onclick=\"javascript:$.closePopupLayer('removeConfirm'); return false;\"> </div>\
								<div class='eip_win_title'>" + getLabel("js-type-edit-confirm_title") + "</div>\
							</div>\
							<div class='eip_win_body popupBody' onmousedown=\"$('.eip_win').draggable('destroy')\">\
								<div class='popupText'>" + getLabel("js-type-edit-confirm_text") + "</div>\
								<div class='eip_buttons'>\
									<input type='button' value='" + getLabel("js-confirm-unrecoverable-yes") + "' class='RemoveConfirmYes ok' />\
									<input type='button' value='" + getLabel("js-confirm-unrecoverable-no") + "' class='back' onclick=\"$.closePopupLayer('removeConfirm'); return false;\" />\
									<div style='clear:both;' />\
								</div>\
							</div>\
						</div>");
	};

	this.addGroup = function(_options) {
		if(_options.id) {
			var gid = 'g' + _options.id;
			groups[_options.id] = _options;
			var groupContainer =
				$("<div class=\"fg_container\">\
					<div class=\"fg_container_header\">\
						<span id='head"+gid+"title' class='left'>"+_options.title+" [" + _options.name +  "]</span>\
						<span id='" + gid + "control'>"
							+ (_options.locked ? "&nbsp;" :
							"<a href=\"#\" class=\"edit\" title='" + getLabel("js-type-edit-edit") + "' />\
							<a href=\"#\" class=\"remove\" title='" + getLabel("js-type-edit-remove") + "' />")+
						"</span>\
							<span id='" + gid + "save' style='display:none;'>\
							" + getLabel("js-type-edit-saving") + "...\
						</span>\
					</div>\
					<div class=\"group_edit\" style='display:none;'>\
						<form class='group_form'>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+gid+"title'>" + getLabel("js-type-edit-title") + "</label>\
							<input type='text' id='"+gid+"title' name='data[title]' value='" + _options.title + "' />\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+gid+"name'>" + getLabel("js-type-edit-name") + "</label>\
							<input type='text' id='"+gid+"name' name='data[name]' value='" + _options.name + "' />\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<input type='checkbox' id='"+gid+"visible' name='data[is_visible]' value='1' " + (_options.visible ? "checked" : "") + " class=\"boolean\" />\
							<label for='"+gid+"visible' class='boolean'>" + getLabel("js-type-edit-visible") + "</label>\
						</div>\
						<div style='clear:both; text-align:right'>\
							<input type='button' value='OK' class='ok button' />\
							<input type='button' value='Cancel' class='cancel button' />\
						</div>\
						</form>\
					</div>\
					<div class=\"fg_container_body\">"
						 + (_options.locked ? "" : "<span class='fg_add_field'><a href='#' class='add'>" + getLabel("js-type-edit-add_field") + "</a></span>") +
						"<ul class=\"fg_container\">\
						</ul>\
					</div>\
				   </div>");
			if(_options.locked) {
				groupContainer.addClass('locked');
			}
			if(!_options.visible) {
				groupContainer.addClass('invisible');
			}
			$("ul", groupContainer).andSelf().attr("umiGroupId", _options.id);
			groups[_options.id].container = groupContainer;
			groupContainer.appendTo(container);
			groups[_options.id].fields = {};
			$(".fg_container", groupContainer).sortable({connectWith : "ul.fg_container", dropOnEmpty: true, items: "li",
														 placeholder: "ui-sortable-field-placeholder",
														 update : function(e, ui){ 
																	var fieldId     = ui.item.attr("umiFieldId");
																	var nextFieldId = ui.item.next("li").attr("umiFieldId");
																	var isLast      = (nextFieldId != undefined) ? "false" : ui.item.parent().attr("umiGroupId");
																	$.get("/admin/data/json_move_field_after/"+fieldId+"/"+nextFieldId+"/"+isLast+"/"+typeId+"/");
																  } });
			$("a.add", groupContainer).click(function() {
											_self.addField(_options.id, {id    	  : 'new',
																		 title 	  : getLabel("js-type-edit-new_field"),
																		 typeId	  : 3,
																		 typeName : '',
																		 name  	  : '',
																	     tip      : ''});
											return false;
										});
			var okButton  = $("input.ok", groupContainer);
			var nameInput = $("#"+gid+"name", groupContainer);
			$("#"+gid+"title, #"+gid+"name", groupContainer).keyup(function(event) { okButton.attr('disabled', event.currentTarget.value.length == 0); } );
			$("#"+gid+"title", groupContainer).focus(function(event) {													
													if(!nameInput.val().length)
														$(event.currentTarget).bind('keyup', {nameField : nameInput}, universalTitleConvertCallback);
											}).blur(function(event) {
													$(event.currentTarget).unbind('keyup', universalTitleConvertCallback);
											});
			$("input.ok", groupContainer).click(
					function () {
						saveGroup(_options.id, groupContainer);
						$("div.fg_container_body, div.group_edit", groupContainer).slideToggle();
					} );
			$("input.cancel", groupContainer).click(
					function () {
						if(_options.id == 'new') {
							groupContainer.remove();
						} else {							
							$("div.fg_container_body, div.group_edit", groupContainer).slideToggle();
						}
					} );
			$("input:text", groupContainer).keydown(
					function(e) {
						if(e.keyCode == 13) {
							$("input.ok", groupContainer).click();
							e.stopPropagation();
							return false;
						}
					} );
			$("a.edit", groupContainer).click(
					function () {
						$("div.fg_container_body, div.group_edit", groupContainer).slideToggle();
						return false;
					} );
			$("a.remove", groupContainer).click(
					function () {
						$.openPopupLayer({
							name   : 'removeConfirm',
							target : 'removeConfirm',
							width  : 300
						});
						$("input.RemoveConfirmYes").click(function() {
							delete groups[_options.id];
							groupContainer.remove();
							$.get("/admin/data/json_delete_group/" + _options.id + "/" + typeId + "/");
							$.closePopupLayer( 'removeConfirm');
							return false;
						});						
						return false;
					} );
			if(_options.id == 'new') {
				var offset = groupContainer.offset();
				window.scrollTo(offset.left,offset.top);
				$("a.edit", groupContainer).hide();
				$("div.fg_container_body, div.group_edit", groupContainer).slideToggle();
			}
		}
	};

	this.addField = function(groupId, _options) {
		if(groupId && _options.id) {
			var group = groups[groupId];
			fields[_options.id]       = _options;
			group.fields[_options.id] = fields[_options.id];
			fields[_options.id].groupId = groupId;
			var fid = 'f' + _options.id;
			var fieldContainer =
				$("<li>\
					<div class=\"view\" >\
						<span id='" + fid + "info'  class=\"left\" style=\"overflow:hidden;width:85%;\" >\
							<span id='head" + fid + "title' style=\"overflow:hidden;width:35%;\" >" + _options.title + "\
								<span id='head" + fid + "required' style=\"float:none;\" >" + (_options.required ? "*" : "") + "</span>\
							</span>\
							<span id='head" + fid + "name' style=\"overflow:hidden;width:24%;\" >[" + _options.name + "]</span>\
							<span id='head" + fid + "type' style=\"overflow:hidden;width:40%;\" >(" + ((_options.id == "new")? "" : _options.typeName) + (_options.restrictionId ? (": "+_options.restrictionTitle) : "" ) + ")</span>\
						</span>\
						<span id='" + fid + "control'>"
							+ (_options.locked ? "&nbsp;" :
							"<a href=\"#\" class=\"edit\" title='" + getLabel("js-type-edit-edit") + "' />\
							<a href=\"#\" class=\"remove\" title='" + getLabel("js-type-edit-remove") + "' />") +
						"</span>\
						<span id='" + fid + "save' style='display:none;'>\
							" + getLabel("js-type-edit-saving") + "...\
						</span>\
					</div>\
					<div class=\"edit\" style=\"display:none;\">\
						<form>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+fid+"title'>" + getLabel("js-type-edit-title") + "</label>\
							<input type='text' id='"+fid+"title' name='data[title]' value='" + _options.title + "' />\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+fid+"name'>" + getLabel("js-type-edit-name") + "</label>\
							<input type='text' id='"+fid+"name' name='data[name]' value='" + _options.name + "' />\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+fid+"tip'>" + getLabel("js-type-edit-tip") + "</label>\
							<input type='text' id='"+fid+"tip' name='data[tip]' value='" + _options.tip + "' />\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+fid+"type'>" + getLabel("js-type-edit-type") + "</label>\
							<select id='"+fid+"type' name='data[field_type_id]'>\
								<option value='"+_options.typeId+"'>"+_options.typeName+"</option>\
							</select>\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<label for='"+fid+"restriction'>" + getLabel("js-type-edit-restriction") + "</label>\
							<select id='"+fid+"restriction' name='data[restriction_id]'></select>\
						</div>\
						<div style=\"width:49%;float:left;display:none;\" id='"+fid+"guideCont'>\
							<label for='"+fid+"guide'>" + getLabel("js-type-edit-guide") + "</label>\
							<select id='"+fid+"guide' name='data[guide_id]'></select>\
						</div>\
						<div style=\"width:100%;float:left;height:1px;margin:0;padding:0\">\
							<!--Dummy div just to keep layout nice -->\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<input type='checkbox' id='"+fid+"visible' name='data[is_visible]' value='1' " + (_options.visible ? "checked" : "") + " class='boolean' />\
							<label for='"+fid+"visible' class='boolean'>" + getLabel("js-type-edit-visible") + "</label>\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<input type='checkbox' id='"+fid+"indexable' name='data[in_search]' value='1' " + (_options.indexable ? "checked" : "") + " class='boolean' />\
							<label for='"+fid+"indexable' class='boolean'>" + getLabel("js-type-edit-indexable") + "</label>\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<input type='checkbox' id='"+fid+"required' name='data[is_required]' value='1' " + (_options.required ? "checked" : "") + " class='boolean' />\
							<label for='"+fid+"required' class='boolean'>" + getLabel("js-type-edit-required") + "</label>\
						</div>\
						<div style=\"width:49%;float:left;\">\
							<input type='checkbox' id='"+fid+"filterable' name='data[in_filter]' value='1' " + (_options.filterable ? "checked" : "") + " class='boolean' />\
							<label for='"+fid+"filterable' class='boolean'>" + getLabel("js-type-edit-filterable") + "</label>\
						</div>\
						<div style='clear:both; text-align:right'>\
							<input type='button' value='OK' class='ok button' />\
							<input type='button' value='Cancel' class='cancel button' />\
						</div>\
						</form>\
					</div>\
				   </li>");
			fieldContainer.attr('umiFieldId', _options.id);
			if(_options.locked) {
				fieldContainer.addClass('locked');
			}
			if(!_options.visible) {
				fieldContainer.addClass('invisible');
			}
			fields[_options.id].container = fieldContainer;
			fieldContainer.appendTo( $(".fg_container", group.container) );
			var okButton  = $("input.ok", fieldContainer);
			var nameInput = $("#"+fid+"name", fieldContainer);
			$("#"+fid+"title, #"+fid+"name", fieldContainer).keyup(function(event) { okButton.attr('disabled', event.currentTarget.value.length == 0); } );
			$("#"+fid+"title", fieldContainer).focus(function(event) {
													if(!nameInput.val().length)
														$(event.currentTarget).bind('keyup', {nameField : nameInput}, universalTitleConvertCallback);
											}).blur(function(event) {
													$(event.currentTarget).unbind('keyup', universalTitleConvertCallback);
											});
			$("input.ok", fieldContainer).click(
					function () {
						saveField(_options.id, fieldContainer);
						$("div.edit", fieldContainer).slideUp();
					} );
			$("input.cancel", fieldContainer).click(
					function () {
						if(_options.id == 'new') {
							fieldContainer.remove();
						} else {
							$("div.edit", fieldContainer).slideUp();
						}
					} );
			$("input:text", fieldContainer).keydown(
					function(e) {
						if(e.keyCode == 13) {
							$("input.ok", fieldContainer).click();
							e.stopPropagation();
							return false;
						}
					} );
			$("a.edit", fieldContainer).click( 
					function () {						
						$("div.edit", fieldContainer).slideToggle("normal", function() { loadTypesInfo(_options.id, fieldContainer); } );
						return false;
					} );
			$("a.remove", fieldContainer).click(
					function () {
						$.openPopupLayer({
							name   : 'removeConfirm',
							target : 'removeConfirm',
							width  : 300
						});
						$("input.RemoveConfirmYes").click(function() {
							delete fields[_options.id];
							delete group.fields[_options.id];
							fieldContainer.remove();
							$.get("/admin/data/json_delete_field/" + _options.id + "/" + typeId + "/");
							$.closePopupLayer('removeConfirm');
							return false;
						});
						return false;
					} );
			$("#" + fid + "type", fieldContainer).change(
					function() {
						var value = this.value;
						var typeO = $.grep(typesList, function(o) { return o.id == value;} );
						if(typeO.length && (typeO[0].dataType == "relation" || typeO[0].dataType == "optioned")) {
							$("#" + fid + "guideCont", fieldContainer).show("normal", function() { loadGuidesInfo(_options.id, fieldContainer); } );
						} else {
							$("#" + fid + "guideCont", fieldContainer).hide();
						}
						loadRestrictionsInfo(_options.id, fieldContainer);
					} );
			if(_options.id == 'new') {
				var offset = fieldContainer.offset();
				window.scrollTo(offset.left,offset.top);
				$("a.edit", fieldContainer).click();
				$("a.edit", fieldContainer).hide();
			}
		}
	};

	var saveGroup = function(id, context) {
		var gid   = "#g" + id;
		var group = groups[id];
		group.title      = $(gid + "title", context).val();
		group.name       = $(gid + "name", context).val();
		group.visible    = $(gid + "visible", context).attr('checked');

		if(group.visible)
			context.removeClass('invisible');
		else
			context.addClass('invisible');

		$(gid + "control", context).hide();
		$(gid + "save", context).show();

		$("#headg" + id + "title", context).html(group.title + " [" + group.name + "]");

		var param = $("form.group_form", context).serialize();

		if(id == 'new') {
			$.post("/admin/data/type_group_add/" + typeId + "/do/.xml?noredirect=true",
				   param,
				   function(data) {
					   var newGroupId = $("group",data).attr('id');
					   $("*[id]" , context).each( function() { this.id = this.id.replace(/new/, newGroupId); } );
					   $("#g" + newGroupId + "control", context).show();
					   $("#g" + newGroupId + "save", context).hide();
					   $("a.edit", context).show();
					   group.id = newGroupId;
					   groups[newGroupId] = group;
				   });
		} else {
			$.post("/admin/data/type_group_edit/" + id + "/" + typeId + "/do",
				   param,
				   function(data) {
					   $("#g" + id + "control", context).show();
					   $("#g" + id + "save", context).hide();
				   });
		}
	}

	var saveField = function(id, context) {
		var fid   = "#f" + id;
		var field = fields[id];
		field.title      = $(fid + "title", context).val();
		field.name       = $(fid + "name", context).val();
		field.tip        = $(fid + "tip", context).val();
		field.typeId     = $(fid + "type", context).val();
		field.visible    = $(fid + "visible", context).attr('checked');
		field.required   = $(fid + "required", context).attr('checked');
		field.indexable  = $(fid + "indexable", context).attr('checked');
		field.filterable = $(fid + "filterable", context).attr('checked');
		var typeO = $.grep(typesList, function(o) { return o.id == field.typeId;} );
		if(typeO.length && typeO[0].dataType == "relation") {
			field.guideId = $(fid + "guide", context).val();
		} else {
			field.guideId = 0;
		}

		if(field.visible)
			context.removeClass('invisible');
		else
			context.addClass('invisible');

		$(fid + "control", context).hide();
		$(fid + "save", context).show();

		fid = "#headf" + id;
		$(fid + "title", context).html(field.title);
		$(fid + "name", context).html("[" + field.name + "]");
		$(fid + "type", context).html("(" + (field.typeName = $.grep(typesList, function(o) { return o.id == field.typeId;} )[0].name) + ")" );
		$(fid + "required", context).html(field.required ? "*" : "");

		var param = $("form", context).serialize();

		if(id == 'new') {
			$.post("/admin/data/type_field_add/" + field.groupId + "/" + typeId + "/do/.xml?noredirect=true",
				   param,
				   function(data) {
					   var newFieldId = $("field",data).attr('id');					   
					   $("*[id]" , context).each( function() { this.id = this.id.replace(/new/, newFieldId); } );
					   $("#f" + newFieldId + "control", context).show();
					   $("#f" + newFieldId + "save", context).hide();
					   field.id = newFieldId;
					   fields[newFieldId] = field;
					   groups[field.groupId].fields[newFieldId] = field;
					   if(typeO[0].dataType == "relation") {
						   field.guideId = $("field",data).attr('guide-id');
						   guidesList    = [];
						   loadGuidesInfo(newFieldId, context);
					   }
					   $("a.edit", context).show();
				   });
		} else {
			$.post("/admin/data/type_field_edit/" + id + "/" + typeId + "/do/.xml?noredirect=true",
				   param,
				   function(data) {
					   $("#f" + id + "control", context).show();
					   $("#f" + id + "save", context).hide();
					   if(typeO[0].dataType == "relation") {
						   field.guideId = $("field",data).attr('guide-id');
						   guidesList    = [];
						   loadGuidesInfo($("field",data).attr('id'), context);
					   }
				   });
		}
	};

	var loadTypesInfo = function(id, context) {
		var select = $("#f" + id + "type", context);		
		if(typesList.length) {
			if(select.get(0).options.length > 1) return;
			var options = '';			
			var value   = select.attr('value');
			for(var i=0; i<typesList.length; i++) {
				var selected = (parseInt(typesList[i].id) == parseInt(value)) ? "selected" : "";
				options += "<option value='" + typesList[i].id + "' " + selected +">" + typesList[i].name + "</option>";
			}
			select.html(options);
			select.attr("disabled", false);
			select.change();
		} else {
			select.attr("disabled", true);
			$.post("/udata/system/fieldTypesList/", {}, function(data){ parseTypesInfo( data, id, context ); });
		}
	};

	var loadGuidesInfo = function(id, context) {
		var select = $("#f" + id + "guide", context);
		select.attr("disabled", true);
		if(guidesList.length) {
			var options = "<option value=''></option>";
			var value   = fields[id].guideId;
			for(var i=0; i<guidesList.length; i++) {
				var selected = (parseInt(guidesList[i].id) == parseInt(value)) ? "selected" : "";
				options += "<option value='" + guidesList[i].id + "' " + selected +">" + guidesList[i].name + "</option>";
			}
			select.html(options);
			select.attr("disabled", false);
		} else {
			$.post("/udata/system/publicGuidesList/", {}, function(data){ parseGuidesInfo( data, id, context ); });
		}
	}

	var loadRestrictionsInfo = function(id, context) {
		var select = $("#f" + id + "restriction", context);
		var typeId  = $("#f" + id + "type", context).val();
		select.attr("disabled", true);
		if(restrictionsLoaded) {			
			var value   = fields[id].restrictionId;
			var options = '<option value="0" ' + (!value ? 'selected' : '') + '> </option>';
			if(restrictionsList[typeId])
			for(var i=0; i<restrictionsList[typeId].length; i++) {
				var selected = (parseInt(restrictionsList[typeId][i].id) == parseInt(value)) ? "selected" : "";
				options += "<option value='" + restrictionsList[typeId][i].id + "' " + selected +">" + restrictionsList[typeId][i].title + "</option>";
			}
			select.html(options);
			if(restrictionsList[typeId] && restrictionsList[typeId].length)
				select.attr("disabled", false);
		} else {			
			$.post("/udata/data/getRestrictionsList/", {}, function(data){ parseRestrictionsInfo( data, id, context ); });
		}
	}

	var parseTypesInfo = function( data, id, context ) {
		var items = $("item", data); 
		for(var i=0; i<items.length; i++) {
			var itm = $(items[i]);
			typesList[typesList.length] = {id       : itm.attr("id"),
			                               name     : itm.text(),
										   dataType : itm.attr("data-type"),
										   multiple : itm.attr("is-multiple")};
		}
		loadTypesInfo(id, context);
	};

	var parseGuidesInfo = function( data, id, context ) {
		var items = $("item", data);
		for(var i=0; i<items.length; i++) {
			var itm = $(items[i]);
			guidesList[guidesList.length] = {id   : itm.attr("id"),
			                                 name : itm.text() };
		}
		loadGuidesInfo(id, context);
	};

	var parseRestrictionsInfo = function( data, id, context ) {
		var items = $("item", data);
		for(var i=0; i<items.length; i++) {
			var itm = $(items[i]);
			var typeId = itm.attr("field-type-id");
			if(!restrictionsList[typeId]) restrictionsList[typeId] = [];
			restrictionsList[typeId][restrictionsList[typeId].length] =
										{id    : itm.attr("id"),
										 name  : itm.attr("name"),
			                             title : itm.text() };
		}
		restrictionsLoaded = true;
		loadRestrictionsInfo(id, context);
	};

	var universalTitleConvertCallback = function(event) {
		event.data.nameField.val(transliterateRu(event.currentTarget.value).replace(/\s+/g, "_").replace(/[^A-z0-9_]+/g, "").toLowerCase());
	}

	init();
}