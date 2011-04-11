/**
* editableCell
* Класс для создания редактируемых ячеек контрола Таблица
* @author Антон Прусов
* @ver    1.0
*/


var editableCell = function(_TableItem, _Cell, _PropInfo) {
	/**
	* (Private properties)
	*/
	var __self = this;
	var PropInfo = _PropInfo;
	var PropName = _PropInfo.fieldName || _PropInfo.name;
	var PropId = _PropInfo.id;
	var Item = _TableItem;
	var FlatMode = Item.control.flatMode;
	var editControl = null;

	var OldValue = "";
	var OldCellContent = "";
	var DataType = _PropInfo['dataType'] || '';
	/**
	* (Static properties)
	*/
	/* Public properties */
	this.element = _Cell;
	this.prepareSaveData = function() {
		 if (editControl) __self.save(editControl.value);
	};
	/**
	* (Private methods)
	*/

	var __constructor = function() {
		if (jQuery.inArray(DataType, editableCell.ignoreDataTypes) != -1) return false;
		if (jQuery.inArray(PropName, editableCell.ignorePropNames) != -1) return false;

		if (!editableCell.helper) {
			editableCell.helper = document.createElement('div');
			editableCell.helper.className = 'c-helper';
			$(editableCell.helper).css({
				position : 'absolute',
				width: '16px',
				height: '16px',
				background: 'url(/images/cms/admin/mac/tree/edit.png)',
				display : 'none',
				cursor: 'pointer'
			});
			document.body.appendChild(editableCell.helper);

			$(editableCell.helper).bind('mouseover', function() {
				editableCell.hideHelper = false;
			});

			$(editableCell.helper).bind('mouseout', function() {
				editableCell.handleCell = false;
				editableCell.helper.style.display = 'none';
			});

			$(editableCell.helper).bind('click', function() {
				editableCell.helper.style.display = 'none';

				var hc = editableCell.handleCell;
				var ac = editableCell.activeCell;
				if (hc) {
					// save last active cell
					if (ac) ac.prepareSaveData();
					hc.makeEditable();
				}
			});
		}


		$(__self.element).bind('mouseover', function() {
			if (!Control.enabled) return false;
			editableCell.hideHelper = false;
			var ac =  editableCell.activeCell;
			if (ac && ac == __self) return;
			editableCell.handleCell = __self;

			var pos = $(_Cell).position();
			var cpos = $(Item.control.initContainer).position();
			cpos.left -= Item.control.initContainer.scrollLeft;
			$(editableCell.helper).css({
				top : pos.top + cpos.top + 3,
				left : pos.left + cpos.left + this.offsetWidth - 16,
				display : 'block'
			});
		});


		$(__self.element).bind('mouseout', function(evnt) {
			editableCell.hideHelper = true;
			var hc = __self;
			setTimeout(function() { 
				if (editableCell.hideHelper) editableCell.helper.style.display = 'none';
			}, 10);
		});
	};

	this.makeEditable = function() {
		editableCell.activeCell = __self;
		editableCell.handleCell = false;
		__getData();
	};

	var __getData = function() {
		var sDataSrc = '/admin/content/get_editable_region/' + Item.id+"/" + PropName + '.xml';
		if (FlatMode) sDataSrc += '?is_object=1';

		$.ajax({
			type: "GET",
			url: sDataSrc,
			dataType: "xml",
			success: function(data, status){
				__onGetData(data);
			},
			error : function (rq, status, err) {
				__onGetDataError(err);
			}
		});
	};

	var __reportError = function(err) {
		editableCell.activeCell = false;
		editableCell.handleCell = false;
		$.jGrowl(err, { header: getLabel('js-error-header') });
	};

	var __onGetData = function(oXMLResponse) {
		Item.control.container.style.background = '#FFF';

		var arrEls = oXMLResponse.getElementsByTagName("property");
		if (typeof(arrEls[0]) !== 'undefined') {
			sType = arrEls[0].getAttribute('type') || "";
		}

		var errs = oXMLResponse.getElementsByTagName("error");
		if (errs.length) {
			__reportError(errs[0].firstChild.nodeValue);
			return false;
		}

		if (PropName == 'name') {
			sType = 'name';
		}

		var vals = oXMLResponse.getElementsByTagName('value');
		var val = false;

		switch (sType) {
			case 'wysiwyg' :
			case 'text' :
			case 'string':
			case 'int' :
			case 'price':
			case 'float':
			case 'tags':
			case 'date':
			case 'counter':
				if (vals.length) {
					val = vals[0].firstChild ? vals[0].firstChild.nodeValue : '';
				}
				if(!val) {
					val = '';
				}
				__makeEditableStringFld(val);
			break;
			case 'boolean':
				if (vals.length) {
					val = vals[0].firstChild ? vals[0].firstChild.nodeValue : '';
				}
				__makeEditablBooleanFld(val);
			break;
			case 'relation' :
				var vals = oXMLResponse.getElementsByTagName('item');
				__makeEditableRelationFld(vals, arrEls[0].getAttribute('multiple') == 'multiple');
			break;

			case 'name' :
				var vals = oXMLResponse.getElementsByTagName('name');
				if (vals.length) {
					val = vals[0].firstChild ? vals[0].firstChild.nodeValue : '';
				}
				__makeEditableStringFld(val);
			break;
			default: 
				__reportError(getLabel("js-edcell-unsupported-type"));
				return false;
			break;
		}

		Control.recalcItemsPosition();
	};

	var __onSetData = function(oXMLResponse, sResponseTxt) {
		var el = $('div', __self.element);

		var errs = oXMLResponse.getElementsByTagName("error");
		if (errs.length) {
			__reportError(errs[0].firstChild.nodeValue);
			__self.restore();
			return false;
		}

		var arrEls = oXMLResponse.getElementsByTagName("property");
		if (typeof(arrEls[0]) !== 'undefined') {
			sType = arrEls[0].getAttribute('type') || "";
		}

		if (PropName == 'name') {
			sType = 'name';
		}


		var vals = oXMLResponse.getElementsByTagName('value');
		var val = '';

		switch (sType) {
			case 'wysiwyg' :
			case 'text' :
			case 'string':
			case 'int' :
			case 'price':
			case 'float':
			case 'tags':
			case 'date':
			case 'counter':
				var vals = oXMLResponse.getElementsByTagName('value');
				if (vals.length) {
					val = vals[0].firstChild ? vals[0].firstChild.nodeValue : '';
				}
				el.html(val);
				OldValue = val;
			break;
			case 'boolean':
				if (vals.length) {
					val = vals[0].firstChild ? vals[0].firstChild.nodeValue : '';
				}
				
				el.html(val ? '<img alt="" style="width:13px;height:13px;" src="/images/cms/admin/mac/tree/checked.png" />' : '');
				OldValue = val;
			break;
			case 'relation' :
				var vals = oXMLResponse.getElementsByTagName('item');
				if (vals.length) {
					for (var i = 0; i < vals.length; i++) {
						val += vals[i].getAttribute('name');
						if (i < vals.length - 1) val += ', ';
					}
				}
				el.html(val);
				OldValue = val;
			break;

			case 'name' :
				var vals = oXMLResponse.getElementsByTagName('name');
				if (vals.length) {
					val = vals[0].firstChild ? vals[0].firstChild.nodeValue : '';
				}

				el.html(OldCellContent);
				var anchor = $('a', __self.element);
				anchor.html(val);
				OldValue = val;
			break;
			default: 
				__reportError(getLabel("js-edcell-unsupported-type"));
				return false;
			break;
		}

		$.jGrowl(getLabel('js-property-saved-success'));
		OldCellContent = $('div', __self.element).html();
		Control.recalcItemsPosition();
	};

	var __makeEditableStringFld = function(sVal) {
		OldValue = sVal;
		var el = __self.element;
		OldCellContent = $('div', __self.element).html();

		editControl = document.createElement('input');
		editControl.setAttribute('type', 'text');
		editControl.value = sVal;
		editControl.className = 'editableCtrl';

		editControl.onblur = function() {
			__self.prepareSaveData();
			return true;
		};

		editControl.onkeydown = function(evnt) {
			var iKCode = window.event ? window.event.keyCode : evnt.which;
			if (iKCode == 27) __self.restore();
			if (iKCode == 13) __self.prepareSaveData();
			return true;
		};
		
		var el = $('div', __self.element);
		el.html('');
		el.append(editControl);
		editControl.focus();
	};


	var __makeEditableRelationFld = function(vals, multiple) {
		var el = $('div', __self.element);
		OldCellContent = el.html();

		editControl = document.createElement('select');
		editControl.id = 'relationSelect' + Item.id + PropName;
		editControl.className = 'editableCtrl';

		if (multiple) {
			editControl.multiple = true;
			editControl.size = 3;
		} else {
			editControl.onchange = function() {
				__self.save(this.value, true);
				return true;
			};
		}

		for (var i = 0; i < vals.length; i++) {
			var val = vals[i];
			var o = document.createElement('option');
			o.value = val.getAttribute('id');
			o.selected = true;
			o.innerHTML = val.getAttribute('name');
			editControl.appendChild(o);
		}

		var el = $('div', __self.element);
		el.html('');
		el.append(editControl);

		// create relations input
		var relInput = document.createElement('input');
		relInput.id = 'relationInput' + Item.id + PropName;
		relInput.className = 'relInput';

		var el = $('div', __self.element);
		//el.append('<input type="hidden" id="relationButton' + Item.id + PropName + '" />'); // Disabled
		el.append('<br />');
		el.append(relInput);
		relInput.focus();

		new relationControl(PropInfo.guideId, Item.id + PropName);


		__self.prepareSaveData = function() {
			if (editControl.multiple) {
				var aVals = [];
				for (var i = 0; i < editControl.options.length; i++) {
					if (editControl.options[i].selected) aVals.push(editControl.options[i].value);
				}
				__self.save(aVals);
			} else {
				__self.save(editControl.value);
			}
		};
		
		$(relInput).add($(editControl)).keydown(function(evnt) {
			var iKCode = evnt.keyCode;
			if (iKCode == 27) __self.restore();
			if (iKCode == 13)  __self.prepareSaveData();
			return true;
		});	
	};

	var __makeEditablBooleanFld = function(val) {
		var el = $('div', __self.element);
		OldCellContent = el.html();

		editControl = document.createElement('input');
		editControl.type = 'checkbox';
		editControl.checked = val;
		editControl.className = 'editableCtrl check';

		editControl.onchange = function() {
			__self.save(this.checked ? 1 : 0, true);
			return true;
		};

		$(editControl).keydown(function(evnt) {
			var iKCode = evnt.keyCode;
			if (iKCode == 27) __self.restore();
			if (iKCode == 13)  __self.prepareSaveData();
			return true;
		});

		var el = $('div', __self.element);
		el.html('');
		el.append(editControl);
		editControl.focus();
	};


	var __onGetDataError = function(oException) {
		__reportError(getLabel('js-edcell-get-error') + oException);
	};


	var __setData = function(content) {
		var sDataSrc = '/admin/content/save_editable_region/' + Item.id + "/" + PropName + '.xml';
		if (FlatMode) sDataSrc += '?is_object=1';


		$.ajax({
			type: "POST",
			url: sDataSrc,
			dataType: "xml",
			success: function(data, status){
				__onSetData(data, status);
			},
			data : ({
				'data[]' : content
			}),
			error : function (rq, status, err) {
				__onSetDataError(err);
			},
			complete: function (rq, status) {
				if (editableCell.activeCell == __self) editableCell.activeCell = false;
				if (!editableCell.activeCell) Item.control.container.style.background = 'none';
				if (editableCell.handleCell == __self) editableCell.handleCell = false;
			}
		});
	};


	var __onSetDataError = function(oException) {
		__reportError(getLabel('js-edcell-save-error') + oException);
	};

	this.save = function(newValue, force) {
		editableCell.activeCell = false;

		if (!force && OldValue == newValue) {
			this.restore();
			return false;
		}
		__setData(newValue);
	};

	this.restore = function() {
		editableCell.activeCell = false;
		var div = $('div', __self.element);
		div.html(OldCellContent);
		Item.control.container.style.background = 'none';
		Control.recalcItemsPosition();
	};

	this.getEditControl = function() {
		return editControl;
	};

	__constructor();
};

editableCell.activeCell = false;
editableCell.handleCell = false;
editableCell.helper = false;
editableCell.hideHelper = false;

editableCell.ignoreDataTypes = ['wysiwyg'];
editableCell.ignorePropNames = [];