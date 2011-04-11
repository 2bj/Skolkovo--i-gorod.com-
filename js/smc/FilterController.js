/**
* filterController
* Класс обеспечивает отрисовку полей для фильтрации содержимого
* @author Игнат <Leeb> Толчанов (ignat.tolchanov@umisoft.ru)
* @ver    1.0
* @param  _oControll    объект-контролл, к которому прикрепляется фильтр
* @param  _iTypeId      Идентификатор типа, по которому производится фильтрация
* @param  _bSuspendInit Отложенная инициализация
*/
function filterController(_oControll, _iTypeId, _bSuspendInit, _oContainerEl, _Params) {
	var __self 		  = this;
	var quickSearch   = null;
	var quickSearchContainer = null;
	var formContainer = null;
	var logicContainer = null;
	var radioLogicAnd = null;
	var radioLogicOr  = null;
	var form		  = null;
	var addSelect     = null;
	var modeButton    = null;
	var expandButton  = null;
	var targetsList   = null; 	
	var TypeId        = _iTypeId;
	var ControlInst   = null;
	var errorCount    = 0;
	var tipShowTime   = 5000;
	var UsedFields    = new Object();
	var UsedInputs    = new Object();
	var fcId          = _oControll.id + '_fc';
	var iconsPath     = null;
	var guideCache    = new Object();
	var currentParent = null;
	var quickMode     = true;
	var containerEl   = _oContainerEl;	
	
	var nativeModeChange = (_Params && _Params.nativeAdvancedMode);
	
	var DrawFieldFilter = function(_Field, _Placer, _Params) {		
		if(_Field != 'name') {
			if(_Params && _Params[1] === 'static') return;
			var id    = fcId + '_' +'id_' + _Field.fieldName;
			if(!_Field.dataType) {
				_Field.dataType = "string";
			}
			var input = createInputByDataType(_Field.dataType, id, _Field.fieldName, _Field.guideId, false);
			if(input) {
				UsedFields[_Field.fieldName] = _Field;
				UsedInputs[_Field.fieldName] = input;
				if (_Params && _Params[0]) {
					input.style.width = _Params[0];
				}
				_Placer.appendChild( input );
			} else {
				//alert(_Field.dataType + " | " + id + " | " + _Field.fieldName + " | " + _Field.guideId);
			}
		}
	};
	
	var onRemoveColumn = function(_Field) {
		if(_Field != 'name') {
			delete UsedFields[_Field.fieldName];			
			delete UsedInputs[_Field.fieldName];
		}
	};

	this.control   = null;
	/**
	*
	*/
	this.getId = function() {
		return fcId;
	};
	/**
	*
	*/
	this.changeMode = function() {
		if(quickMode) {
			quickMode = false;
			formContainer.style.display 	   = 'block';
			quickSearchContainer.style.display = 'none';
			modeButton.childNodes[0].nodeValue = getLabel('js-filter-normal-mode');
		} else {
			quickMode = true;
			formContainer.style.display        = 'none';
			quickSearchContainer.style.display = '';
			modeButton.childNodes[0].nodeValue = getLabel('js-filter-extended-mode');
		}
		Control.recalcItemsPosition();
	};
	var applyOnEnterQuickSearch = function(e) {
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		if(KeyID == 13) __self.applyFilter();		
	};
	var applyOnEnterEvent = function(e) {
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		if(KeyID == 13) {
			if(nativeModeChange)
				__self.applyFilter();
			else
				__self.applyFilterAdvanced();
		}
	};
	var applyOnChangeEvent = function(e) {
		if(nativeModeChange) {
			
		} else {
			__self.applyFilterAdvanced();			
		}
	};
	/**
	*
	*/
	this.applyFilterAdvanced = function() {
		if(errorCount > 0) return;
		var oFilter = new filter();		
		for(var name in UsedInputs) {
			if(UsedInputs[name].tagName.toLowerCase() == 'select') {
				var value = UsedInputs[name].options[UsedInputs[name].selectedIndex].value;
				if(value != -2) { 
					oFilter.setPropertyEqual(name, value);					
				}
			} else {
				switch(UsedInputs[name].type) {
					case 'button'   : break;
					case 'checkbox' : oFilter.setPropertyEqual(name, UsedInputs[name].checked ? 1 : 0); break;
					case 'text'     : {
						var type = UsedFields[ name ].dataType;
						switch(type) {
							case 'tags' : {
									var values = UsedInputs[name].value.split(',');
									for(var j=0; j<values.length; j++)
										values[j] = values[j].replace(/^\s+|\s+$/, '');
									if(values.length)
										oFilter.setPropertyLike(name, values);
									break;
								}
							case 'float':
							case 'price':
							case 'counter':
							case 'int': {
								var value = UsedInputs[name].value.replace(/^\s+|\s+$/, '');
								if(!value.length) break;
								if(value[0] == "<") {
									oFilter.setPropertyLess(name, value.replace(/[^\d.]*/, '') );
								} else if(value[0] == ">"){
									oFilter.setPropertyGreater(name, value.replace(/[^\d.]*/, '') );
								} else {
									value = value.split("-");
									if(value.length>1)
										oFilter.setPropertyBetween(name, value[0].replace(/[^\d.]*/, ''), value[1].replace(/[^\d.]*/, ''));
									else
										oFilter.setPropertyEqual(name, value[0].replace(/[^\d.]*/, ''));
								}
								break;
							}
							case 'date': {
								var pieces  = [];
								var value   = UsedInputs[name].value;
								if(UsedInputs[name].isEmpty != undefined && UsedInputs[name].isEmpty == true) break;
								if(value.length > 0) {
									var index     = -1;
									var lastindex = value.indexOf('-');
									if((index = value.indexOf('<')) != -1) {
										oFilter.setPropertyLess(name, (lastindex != -1) ? value.substring(index+1, lastindex-1) : value.substring(index+1));
									} else if((index = value.indexOf('>')) != -1) {
										oFilter.setPropertyGreater(name, (lastindex != -1) ? value.substring(index+1, lastindex-1) : value.substring(index+1));										
									} else {
										if(lastindex != -1) {
											pieces = value.split(/\s-\s/);									
										}
										if(pieces.length == 2) {
											oFilter.setPropertyBetween(name, pieces[0], pieces[1]);										
										} else {
											oFilter.setPropertyEqual(name, value);
										}
									}
								}								
								break;
							}
							case "relation":
								if(UsedInputs[name].value.length) 
									oFilter.setPropertyEqual(name, UsedInputs[name].value);
								break;
							default:
								if(UsedInputs[name].value.length) 
									oFilter.setPropertyLike(name, UsedInputs[name].value);
						}
						break;
					}
					default : 
						if(UsedInputs[name].value.length)
							oFilter.setPropertyEqual(name, UsedInputs[name].value);
				}
			}
			
		}				
		oFilter.setConditionModeOr( false );		
		ControlInst.applyFilter(oFilter);		
	};
	/**
	* Применяет фильтр к контроллу
	*/
	this.applyFilter = function() {
		var oFilter = new filter();
		if(quickMode) {
			var value = quickSearch.value.replace(/^\s*|\s*$/, "");
			if(value.length == 0) {
				if(!(ControlInst.flatMode || ControlInst.objectTypesMode || ControlInst.defaultRootMode)) 
					oFilter.setParentElements(0);
			} else {
				if(/^".*"$|^'.*'$/.test(value)) {
					value = value.substr(1, value.length-2);
				} else {
					value = value.split(" ");
				}			
				oFilter.setAllTextSearch(value);
			}
			oFilter.setConditionModeOr(true);			
		} else {
			var inputs  = formContainer.getElementsByTagName('input');
			for(var i=0; i<inputs.length; i++) {
				switch(inputs[i].type) {
					case 'button'   : break;
					case 'checkbox' : oFilter.setPropertyEqual(inputs[i].name, inputs[i].checked ? 1 : 0); break;
					case 'text'     : {
						var type = UsedFields[ 'row_' + inputs[i].id ].field.getElementsByTagName('type')[0].getAttribute('data-type');
						switch(type) {
							case 'tags' : {
									var values = inputs[i].value.split(',');
									for(var j=0; j<values.length; j++)
										values[j] = values[j].replace(/^\s+|\s+$/, '');
									oFilter.setPropertyEqual(inputs[i].name, values);
									break;
								}
							case 'float':
							case 'price':
							case 'int': {
								var value = inputs[i].value.replace(/^\s+|\s+$/, '');
								if(value[0] == "<") {
									oFilter.setPropertyLess(inputs[i].name, value.replace(/[^\d.]*/, '') );
								} else if(value[0] == ">"){
									oFilter.setPropertyGreater(inputs[i].name, value.replace(/[^\d.]*/, '') );
								} else {
									value = value.split("-");
									if(value.length>1)
										oFilter.setPropertyBetween(inputs[i].name, value[0].replace(/[^\d.]*/, ''), value[1].replace(/[^\d.]*/, ''));
									else
										oFilter.setPropertyEqual(inputs[i].name, value[0].replace(/[^\d.]*/, ''));
								}
								break;
							}
							case 'date': {
								var pieces  = [];
								var value   = inputs[i].value;
								if(inputs[i].isEmpty != undefined && inputs[i].isEmpty == true) break;
								if(value.length > 0) {
									var index     = -1;
									var lastindex = value.indexOf('-');
									if((index = value.indexOf('<')) != -1) {
										oFilter.setPropertyLess(inputs[i].name, (lastindex != -1) ? value.substring(index+1, lastindex-1) : value.substring(index+1));
									} else if((index = value.indexOf('>')) != -1) {
										oFilter.setPropertyGreater(inputs[i].name, (lastindex != -1) ? value.substring(index+1, lastindex-1) : value.substring(index+1));										
									} else {
										if(lastindex != -1) {
											pieces = value.split(/\s-\s/);									
										}
										if(pieces.length == 2) {
											oFilter.setPropertyBetween(inputs[i].name, pieces[0], pieces[1]);										
										} else {
											oFilter.setPropertyEqual(inputs[i].name, value);
										}
									}
								}								
								break;
							}
							case "relation": {
								oFilter.setPropertyLike(inputs[i].name, inputs[i].value);
								break;
							}
							default: oFilter.setPropertyLike(inputs[i].name, inputs[i].value);
						}
						break;
					}
					default : oFilter.setPropertyEqual(inputs[i].name, inputs[i].value);
				}
				
			}
			inputs = formContainer.getElementsByTagName('select');
			for(var i=0; i<inputs.length; i++) {
				if(inputs[i].id == 'select_'+fcId) continue;
				var values = new Array();
				for(var j=0; j<inputs[i].options.length; j++) {
					if(inputs[i].options[j].selected) values.push(inputs[i].options[j].value);
				}
				oFilter.setPropertyEqual(inputs[i].name, values);
			}
			if(nativeModeChange)			
				oFilter.setConditionModeOr( !radioLogicAnd.checked );
			else
				oFilter.setConditionModeOr( true );
		}
		ControlInst.applyFilter(oFilter);
	};	
	/**
	* (Private!)
	*/
	var createDeleteRowCallback = function(_RowId) {
		return function() {
			var Row = document.getElementById(_RowId);
			if(Row) {
				Row.parentNode.removeChild(Row);
				UsedFields[_RowId].used = false;
				while(addSelect.childNodes.length) addSelect.removeChild(addSelect.firstChild);				
				var usedIDs   = new Array();
				var usedCount = 0;				
				for(var i in UsedFields) {
					if(UsedFields[i].used) {
						usedIDs.push( UsedFields[i].field.getAttribute('id') );
						usedCount++;
					} else {
						var option   = document.createElement('option');
						option.value = i;
						option.appendChild( document.createTextNode( UsedFields[i].field.getAttribute('title') ) );
						addSelect.appendChild( option );
						var usedIDs = new Array();						
					}
				}								
				SettingsStore.getInstance().set(fcId, usedIDs.join(','), currentParent ? "" + currentParent : "default");				
				if(usedCount > 1) {
					logicContainer.style.display = '';
				} else {
					logicContainer.style.display = 'none';
				}
				// IE Fix!
				addSelect.style.display = 'none';
				addSelect.style.display = '';
				// ------
			}
			Control.recalcItemsPosition();
		}
	};
	/**
	* (Private!)
	*/
	var addField = function() {
		if(!addSelect.options.length) return;
		var id  = addSelect.options[addSelect.selectedIndex].value;
		var row = buildFormRow(UsedFields[id].field);
		if(row) {
			UsedFields[id].used  = true;
			formContainer.getElementsByTagName('table')[0].tBodies[1].appendChild(row);
			addSelect.removeChild( addSelect.options[addSelect.selectedIndex] );
			var usedIDs = new Array();
			for(var i in UsedFields) {
				if(UsedFields[i].used)
					usedIDs.push( UsedFields[i].field.getAttribute('id') );
			}
			SettingsStore.getInstance().set(fcId, usedIDs.join(','), currentParent ? "" + currentParent : "default");
			if(usedIDs.length > 1) {
				logicContainer.style.display = '';
			} else {
				logicContainer.style.display = 'none';			
			}
			Control.recalcItemsPosition();
			// IE Fix!
			addSelect.style.display = 'none';
			addSelect.style.display = '';
			// ------
		}
	};
	/**
	* (Private!)
	*/
	var createFieldTip = function(Field, Message) {
		var element = Field;
		var p = {x: element.offsetLeft || 0, y:element.offsetTop || 0};
		while (element = element.offsetParent) {
			p.x += element.offsetLeft;
			p.y += element.offsetTop;
		}
		p.x += Field.offsetWidth;
		p.y += Field.offsetHeight;
		var id  = 'tip_' + fcId + Math.random();
		var tip = document.createElement('div');
		tip.id  = id;
		tip.className      = 'fcTip';
		tip.style.zIndex   = 50;
		tip.style.position = 'absolute';
		tip.style.left     = p.x + 'px';
		tip.style.top      = p.y + 'px'; 
		tip.appendChild( document.createTextNode(Message) );
		document.body.appendChild(tip);
		setTimeout( function(){ tip.parentNode.removeChild(tip); }, tipShowTime );
	};
	/**
	* (Private!)
	*/
	var createValidator = function(_Input, _DataType) {
		var re      = null;
		var message = '';
		switch(_DataType) {
			case 'int' :
				re = new RegExp("^[<>]?[ ]?\\d*( ?- ?\\d*)?$");
				message = getLabel('js-filter-enter-natural-number');
				break;
			case 'float' :
				re = new RegExp("^[<>]?[ ]?\\d*[\\.]*\\d*( ?- ?\\d*[\\.]*\\d*)?$");
				message = getLabel('js-filter-enter-float-number');
				break;
			case 'date' :
				re = /(^[<>]{1}.*)|(^(((\d\d?[.]\d\d?([.]\d\d(\d\d)?)?)?((\s+|^\s*)\d\d?:\d\d)?)|позавчера|вчера|сегодня|завтра|послезавтра)?(\s*-\s*(((\d\d?[.]\d\d?([.]\d\d(\d\d)?)?)?(\s+\d\d?:\d\d)?)|позавчера|вчера|сегодня|завтра|послезавтра))?)$/i;
				break;
		}		
		var vCallback = function() { 			
			if(_Input) { 
				var pos = _Input.className.indexOf('_error');
				if(!re.test(_Input.value)) {
					if(pos < 0) {
						_Input.className += '_error';						
						errorCount++;	
					}
				} else {
					if(pos >= 0) {
						_Input.className = _Input.className.substr(0, pos);						
						errorCount--;
					}
				}
			}
		};
		return vCallback;
	};
	/**
	* (Private!)
	*/
	var loadGuide = function(_Select, _GuideId) {
		if(guideCache[_GuideId] == undefined) {
			var callback = function(_XML) {
				if(!_XML.responseXML.getElementsByTagName('empty').length) {
					var objects = _XML.responseXML.getElementsByTagName('object');
					var guide   = [];//new Object();
					if(!nativeModeChange) guide.push({id:-2,value:''});
					for(var i = 0; i < objects.length; i++) {
						guide.push({id: objects[i].getAttribute('id'), value: objects[i].getAttribute('name')});
					}
					guideCache[_GuideId] = guide;					
				} else {
					guideCache[_GuideId] = "empty";
				}
				loadGuide(_Select, _GuideId);
			};
			var url      = '/admin/data/guide_items_all/' + _GuideId + '.xml?allow-empty';
			requestGet(url, callback);
			return;
		}
		if(guideCache[_GuideId] !== "empty") {
			for(var j in guideCache[_GuideId]) {
				var option = document.createElement('option');
				option.value = guideCache[_GuideId][j].id;
				option.appendChild( document.createTextNode( guideCache[_GuideId][j].value ) );
				_Select.appendChild(option);
			}
		} else {
			var name   = _Select.name;
			var id     = _Select.id;
			var input  = createInputByDataType('string', id, name, _GuideId, false);
			var parent = _Select.parentNode;
			parent.removeChild(_Select);
			parent.appendChild(input);
			if(UsedInputs[name]) UsedInputs[name] = input;
		}
	};
	var addEvent = function(el, event, callback) {
		if(typeof(el[event]) == 'function') {
			var h = el[event];
			el[event] = function(e) { h(e); callback(e); }
		} else {
			el[event] = callback;			
		}
	};
	/**
	* (Private!)
	*/
	var buildInput = function(_Attributes) {
		var input   = document.createElement('input');
		if(_Attributes instanceof Object) {
			for(i in _Attributes) {
				input.setAttribute(i, _Attributes[i]);				
			}
		}		
		return input;
	};
	/**
	* (Private!)
	*/
	var createInputByDataType = function(_DataType, _Id, _Name, _GuideId, _DisallowMultiple) {
		var input = null;
		switch(_DataType) {
			case 'string':
			case 'wysiwyg':
			case 'text':
			case 'password':
			case 'tags':			
				input = buildInput({ 'type': 'text',     'class' : 'fcStringInput',  'name': _Name, 'id' : _Id });
				input.className = 'fcStringInput'; // IE Fix!				
				break;
			case 'date':
				input = buildInput({ 'type': 'text',     'class' : 'fcStringInput',  'name': _Name, 'id' : _Id });
				input.className = 'fcStringInput'; // IE Fix! 
				input.onkeyup   = createValidator(input, 'date');
				var helpString  = getLabel('js-filter-date-format');//'дд.мм.гггг чч:мм';
				input.value   	= helpString;
				input.isEmpty 	= true;
				input.onfocus 	= function() { if(this.isEmpty) { this.value = ''; this.isEmpty = false; } };
				input.onblur  	= function() { if(this.value.length == 0) {this.value = helpString; this.isEmpty = true; } };
				break;
			case 'boolean':
				var bool_no = '0';
			case 'file': 
			case 'img_file':
			case 'swf_file':
				var no_value = bool_no || '-1';				
				if(!nativeModeChange){
					input = document.createElement('select');
					input.className = 'fcSelectInput'; // IE Fix!
					input.name      = _Name;
					input.id        = _Id;
					input.multiple  = false;
					var yes     = document.createElement('option');
					var no 	    = document.createElement('option');
					var nothing = document.createElement('option');
					yes.value     = '1';
					no.value      = no_value;
					nothing.value = '-2';
					
					var yesLabel = (_DataType == 'boolean') ? getLabel('js-value-yes') : getLabel('js-value-file-yes');
					var noLabel = getLabel('js-value-no');
					
					yes.appendChild( document.createTextNode(yesLabel) );
					no.appendChild( document.createTextNode(noLabel) );
					nothing.appendChild( document.createTextNode(' ') );
					input.appendChild(nothing);
					input.appendChild(yes);
					input.appendChild(no);
					break;
				}				
				input = buildInput({ 'type': 'checkbox', 'class' : 'fcBooleanInput', 'name': _Name, 'id' : _Id });
				input.className = 'fcBooleanInput';			
				break;
			case 'int':
			case 'counter':
				input = buildInput({ 'type': 'text',   'class' : 'fcStringInput',  'name': _Name, 'id' : _Id });
				input.className = 'fcStringInput'; // IE Fix!
				input.onkeyup = createValidator(input, 'int');				
				break;
			case 'float':
			case 'price':
				input = buildInput({ 'type': 'text',   'class' : 'fcStringInput',  'name': _Name, 'id' : _Id });
				input.className = 'fcStringInput'; // IE Fix!
				input.onkeyup = createValidator(input, 'float');				
				break;
			case 'relation':
				input = document.createElement('select');
				input.className = 'fcSelectInput'; // IE Fix!
				input.name      = _Name;
				input.id        = _Id;
				input.multiple  = (_DisallowMultiple != undefined && _DisallowMultiple == false) ? false : true;
				loadGuide(input, _GuideId);
				break;
		}
		if(input) {			
			addEvent(input, 'onkeyup', applyOnEnterEvent);
			if(input.tagName.toLowerCase() == 'select') input.onchange = applyOnChangeEvent;
		}
		return input;				
	};
	/**
	*
	*/
	var buildFormRow = function(_Field) {
		var type  = _Field.getElementsByTagName('type')[0];
		var input = null;
		var name  = _Field.getAttribute('name');
		var id    = fcId + '_' +'id_' + name;
		var rowId = 'row_' + id;
		
		input = createInputByDataType(type.getAttribute('data-type'), id, name, _Field.getAttribute('guide-id'));
		
		if(input == null) return null;		

		var row        = document.createElement('tr');
		var titleCell  = document.createElement('td');
		var valueCell  = document.createElement('td');
		var deleteCell = document.createElement('td');

		var label = document.createElement('label');
		label.setAttribute('for', id);
		label.appendChild(document.createTextNode(_Field.getAttribute('title')));

		titleCell.className = 'fcTitleCell';
		titleCell.appendChild(label);

		valueCell.className = 'fcValueCell';
		valueCell.appendChild(input);

		var deleteLink 	     = document.createElement('img');
		deleteLink.className = 'fcDeleteImage';
		deleteLink.src 	 	 = iconsPath + 'field_delete.png';
		deleteLink.alt 		 = getLabel('js-filter-remove-field');
		deleteLink.title   	 = getLabel('js-filter-remove-field');
		deleteLink.onclick 	 = createDeleteRowCallback(rowId);

		deleteCell.className = 'fcDeleteCell';
		deleteCell.appendChild(deleteLink);

		row.id = rowId;
		row.appendChild(titleCell);
		row.appendChild(valueCell);
		row.appendChild(deleteCell);
		return row;
	};	
	var buildFields = function() {
		if(!nativeModeChange) return;
		while(form.tBodies[1].childNodes.length) form.tBodies[1].removeChild(form.tBodies[1].firstChild);
		while(addSelect.childNodes.length) addSelect.removeChild(addSelect.firstChild);		
		var usedCount = 0;
		for(var i in UsedFields) {
			if(UsedFields[i].used) {
				var row = buildFormRow(UsedFields[i].field);
				if(row) {
					form.tBodies[1].appendChild(row);
					usedCount++;
				}				
			} else {
				var option   = document.createElement('option');
				option.value = i;
				option.appendChild( document.createTextNode( UsedFields[i].field.getAttribute('title') ) );
				addSelect.appendChild( option );
			}
		}
		addSelect.disabled = false;
		
		if(logicContainer) {
			if(usedCount > 1) {
				logicContainer.style.display = '';
			} else {
				logicContainer.style.display = 'none';			
			}
		}
		
		Control.recalcItemsPosition();
	};
	/**
	* (Private!)
	*/
	var buildFilterForm = function(_TypeDOM) {
		if(nativeModeChange) {
			var modeContainer = document.createElement('div');
			modeButton        = document.createElement('a');
			modeButton.href   = "javascript:filterController.getInstanceById('" + fcId + "').changeMode();";
			modeContainer.className = 'fcModeContainer';
			modeContainer.appendChild(modeButton);
			modeButton.appendChild( document.createTextNode(getLabel('js-filter-extended-mode')) );
		}

		quickSearchContainer = document.createElement('div');
		quickSearchContainer.className = 'fcContainer';
		quickSearch      = buildInput({ 'type': 'text', 'class' : 'fcQuicksearchInput',  'name': 'quicksearch', 'id' : fcId+'_id_quicksearch' });		
		var searchButton = buildInput( { 'type':'button', 'value':getLabel('js-filter-do') } );
		quickSearch.className  = 'fcQuicksearchInput';
		searchButton.className = 'fcApplyButton';
		searchButton.onclick   = __self.applyFilter;
		quickSearch.onkeyup    = applyOnEnterQuickSearch;
		quickSearchContainer.appendChild(quickSearch);
		quickSearchContainer.appendChild(searchButton);
		
		if(nativeModeChange) {
			formContainer   = document.createElement('div');
			form            = document.createElement('table');
			form.className  = "fcTable";
			form.appendChild(document.createElement('tbody'));
			form.appendChild(document.createElement('tbody'));
			form.appendChild(document.createElement('tbody'));
			var addRow    = document.createElement('tr');
			var dscrCell  = document.createElement('td');
			var addCell   = document.createElement('td');
			var btnCell   = document.createElement('td');
			var addImage  = document.createElement('img');
			addSelect 	  = document.createElement('select');
	
			addSelect.className  = 'fcAddSelect';
			addSelect.id         = 'select_' + fcId;
			
			// IE Fix!
			addSelect.style.width = "100%";
	
			addImage.className = 'fcAddImage';
			addImage.src 	   = iconsPath + 'field_add.png';
			addImage.alt 	   = getLabel('js-filter-add-field');
			addImage.title     = getLabel('js-filter-add-field');
			addImage.onclick   = addField;		
			
			addCell.className  = 'fcFreeFieldsCell';
			btnCell.className  = 'fcAddCell';
			dscrCell.appendChild( document.createTextNode(getLabel('js-filter-fields-list')) );
	
			addCell.colSpan   = 1;
			addCell.appendChild(addSelect);
			btnCell.appendChild(addImage);
			addRow.appendChild(dscrCell);
			addRow.appendChild(addCell);
			addRow.appendChild(btnCell);
			form.tBodies[0].appendChild(addRow);
			
			var emptyRow  = document.createElement('tr');
			var emptyCell = document.createElement('td');
			emptyCell.colSpan   = 3;
			emptyCell.innerHTML = '&nbsp;';		
			emptyRow.appendChild( emptyCell );
			form.tBodies[0].appendChild(emptyRow);
	
			addRow.className = 'fcAddRow';	
			
			var logicRow    = document.createElement('tr');
			var logicCell   = document.createElement('td');
			logicCell.colSpan   = 3;
			logicCell.className = 'fcLogicCell';
			
			    logicContainer = document.createElement('div');
			    radioLogicAnd  = buildInput({ 'type': 'radio', 'class' : 'fcLogicInput', 'value' : 'and', 'name': fcId + '_logic', 'id' : fcId + '_logic_and', 'checked' : true, 'selected': true});
			    radioLogicOr   = buildInput({ 'type': 'radio', 'class' : 'fcLogicInput', 'value' : 'or',  'name': fcId + '_logic', 'id' : fcId + '_logic_or'});
			var logicTitle     = document.createElement('span');
			var labelLogicAnd  = document.createElement('label');
			var labelLogicOr   = document.createElement('label');
			var lineLogicAnd   = document.createElement('span');
			var lineLogicOr    = document.createElement('span');
			logicTitle.className = 'fcLogicTitle';
			logicTitle.appendChild( document.createTextNode(getLabel('js-filter-search-matches')) );
			logicContainer.appendChild( logicTitle );	
			
			//------- IE Fix -------
			radioLogicAnd.style.border = "0";
			radioLogicOr.style.border  = "0";
			//----------------------
			
			labelLogicAnd.className	= 'fcLogicLabel';
			labelLogicAnd.htmlFor   = fcId + '_logic_and';
			lineLogicAnd.className  = 'fcLogicLine';
			labelLogicAnd.appendChild( document.createTextNode(getLabel('js-filter-with-all-fields')) );
			lineLogicAnd.appendChild( labelLogicAnd );
			lineLogicAnd.appendChild( radioLogicAnd );		
			logicContainer.appendChild( lineLogicAnd );
			lineLogicOr.className  = 'fcLogicLine';
			labelLogicOr.className	= 'fcLogicLabel';
			labelLogicOr.htmlFor	= fcId + '_logic_or';
			labelLogicOr.appendChild( document.createTextNode(getLabel('js-filter-one-at-least')) );
			lineLogicOr.appendChild( labelLogicOr );
			lineLogicOr.appendChild( radioLogicOr );
			logicContainer.appendChild( lineLogicOr );			
			
			logicCell.appendChild(logicContainer);
			logicRow.appendChild(logicCell);
			form.tBodies[2].appendChild(logicRow);		
	
			var applyRow    = document.createElement('tr');
			var applyCell   = document.createElement('td');
			applyButton = buildInput( { 'type':'button', 'value':getLabel('js-filter-do') } );		
			applyButton.onclick   = __self.applyFilter;
			applyButton.className = 'fcApplyButton';
			applyCell.colSpan   = 3;
			applyCell.className = 'fcApplyCell';
			applyCell.appendChild( applyButton );
			applyRow.appendChild( applyCell );
			form.tBodies[2].appendChild(applyRow);		
			
			formContainer.className = 'fcContainer';
			formContainer.style.display = 'none';
			formContainer.appendChild(form);
		}
		var targets 	 = document.createElement('div');
		var targetsTitle = document.createElement('span');
			targetsList  = document.createElement('span');
		targetsTitle.appendChild( document.createTextNode(getLabel('js-filter-current-rubrics')) );
		targets.appendChild(targetsTitle);
		targets.appendChild(targetsList);
		targets.className = 'fcTargetContainer';
		putEmptyTarget();
		
		var splitter = 	document.createElement('div');
		splitter.style.clear = 'both';
		splitter.innerHTML   = '&nbsp;';
		
		if (containerEl) {			
			containerEl.appendChild(quickSearchContainer);
			if(nativeModeChange) { 
				containerEl.appendChild(modeContainer);
				containerEl.appendChild(formContainer);
			}
			containerEl.appendChild(targets);
		} else {
			containerEl = document.createElement("div");
			containerEl.className = "filter-container";
			containerEl.appendChild(quickSearchContainer);
			if(nativeModeChange) {
				containerEl.appendChild(modeContainer);
				containerEl.appendChild(formContainer);
			}
			containerEl.appendChild(targets);			
			ControlInst.container.parentNode.insertBefore(containerEl, ControlInst.container);
		}
		var clearBlock = document.createElement('div');
		clearBlock.className = 'clear';
		ControlInst.container.parentNode.insertBefore(clearBlock, ControlInst.container);
		if(nativeModeChange) {
			radioLogicAnd.checked = true;	
			buildFields();
		}	
	};
	/**
	* (Private!) Создает новый объект запроса (кросс-браузерная реализация)
	* @return объект запроса (в зависимости от браузера)
	*/
	var createRequestObject = function()
	{
		if (window.XMLHttpRequest) {
			try {
				return new XMLHttpRequest();
			} catch (e){}
		} else if (window.ActiveXObject) {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e){}
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e){}
		}
		return null;
	};
	/**
	* (Private!) Выполняет GET запрос и вызывает соответсвующий CALLBACK
	* @param _sUrl URL запрашиваемого ресурса
	* @param _Callback функция, которая будет вызвана в случае успешного завершения запроса
	*/
	var requestGet = function(_sUrl, _Callback) {
		var Request = createRequestObject();
		Request.onreadystatechange = function() {
										if(Request.readyState != 4) return;
										if(Request.status == 200) {
											_Callback(Request);
										} else {
											errorHandler('Request failed');
										}
									};
		Request.open('GET', _sUrl, true);
		Request.send(null);
	};
	/**
	* Выполняет инициализыцию
	*/
	this.init = function() {
		if(nativeModeChange) {
			var Callback = function(_Req) {
				var fields = _Req.responseXML.getElementsByTagName('field');
				parseFields(fields);
				buildFilterForm(_Req.responseXML);
			};
			var tmp = ControlInst.dataSet.getCommonTypeId();
			if(tmp > 0) TypeId = tmp;
			if(TypeId)
				sUrl = '/utype/' + TypeId + '/';
			else
				sUrl = '/utype/dominant/' + TypeId + '/';
			requestGet(sUrl, Callback);
		} else {
			buildFilterForm(null);			
		}
	};
	var parseFields = function(_FieldNodes) {
		var fields        = _FieldNodes;
		var excludeTypes  = ['symlink'];
		var dataType      = null;
		var skipField     = false;
		var stringIDs     = SettingsStore.getInstance().get(fcId, (currentParent) ? ""+currentParent : "default");
		var usedIDs       = (stringIDs === false) ? new Array() : stringIDs.split(',');
		var used	      = false;
		var stoplist	  = ControlInst.dataSet.getFieldsStoplist();		
		for(var i=0; i<fields.length; i++) {
			var name  = fields[i].getAttribute('name');                       
			skipField = false;
			dataType  = fields[i].getElementsByTagName('type')[0].getAttribute('data-type');
			for(var j = 0; j < stoplist.length; j++) {
				if(name == stoplist[j]) { 
					skipField = true;
					break;
				}
			}
			for(var j = 0; j < excludeTypes.length && !skipField; j++) {
				if(dataType == excludeTypes[j]) {
					skipField = true;
					break;
				}
			}			
			if(!skipField) {
				var id  = 'row_' + fcId + '_id_' + fields[i].getAttribute('name');
				var fid = fields[i].getAttribute('id');
				used    = false;
				for(var k=0; k < usedIDs.length; k++) {
					if(fid == usedIDs[k]){
						used = true;
						break;
					}
				}
				UsedFields[id] = {'used':used, 'field':fields[i]};    				
			}			
		}		
	};
	/**
	* (Private!) Вызывается при возникновении какой-либо ошибки
	* @param _Description описание ошибки
	*/
	var errorHandler = function(_Description) {
		// ToDo: error out
	};
	/**
	*
	*/
	var singleType   = false;
	var removeTarget = function() {
		var id = this.id.substr( (fcId + '_link_').length );
		delete ControlInst.targetsList[id];		
		onTargetSelect({});
		return false;
	};
	var putTarget = function(_Id, _Name) {
		var link = document.createElement('a');
		link.className = 'fcTarget';
		link.id      = fcId + '_link_' + _Id;
		link.href    = "#";
		link.title   = getLabel('js-filter-delete-category');
		link.onclick = removeTarget;
		link.appendChild( document.createTextNode(_Name) );
		if(targetsList.childNodes.length)
			targetsList.appendChild( document.createTextNode(', ') );
		targetsList.appendChild(link);
	};
	var putEmptyTarget = function() {
		targetsList.parentNode.style.display = 'none';
	};
	var onTargetSelect = function(_Items) {		
		var singleTypeCurrent = false;
		var itemId  = null;
		var counter = 0;
		while(targetsList.firstChild) targetsList.removeChild( targetsList.firstChild );
		for(var i in ControlInst.targetsList) { 
			counter++; 
			itemId = ControlInst.targetsList[i].id;			
			putTarget(ControlInst.targetsList[i].id, ControlInst.targetsList[i].name);
		}
		if(!counter) putEmptyTarget();
		else         targetsList.parentNode.style.display = '';
		if(nativeModeChange) {
			if(counter == 1) {
				sUrl = '/utype/dominant/' + itemId + '/';
			    singleTypeCurrent = true;
			    currentParent     = itemId;
			} else {
				sUrl = '/utype/' + TypeId + '/';
				singleTypeCurrent = false;
				currentParent     = null;
			}
			if(singleType != singleTypeCurrent) {
				UsedFields = new Object();
				addSelect.disabled = true;
				requestGet(sUrl, 
							function(_Req) { 
								if(_Req.responseXML) {
									var fields = _Req.responseXML.getElementsByTagName('field'); 
									if(fields.length) parseFields(fields); 
									buildFields();
								}
							});
				singleType = singleTypeCurrent;
			}
		}
	};
	/**
	* Инициализация
	*/
	if(!(_oControll == undefined || _iTypeId == undefined)) {
		filterController.instances[filterController.instances.length] = this;
		ControlInst  = _oControll;
		this.control = ControlInst;
		TypeId    = !_iTypeId ? 0 : _iTypeId;
		iconsPath = ControlInst.iconsPath;
		if(!nativeModeChange) {
			ControlInst.onDrawFieldFilter = DrawFieldFilter;
			ControlInst.onRemoveColumn    = onRemoveColumn;
		}
		ControlInst.setTargetSelectCallback(onTargetSelect);
		if(_bSuspendInit == undefined || _bSuspendInit == false)
			this.init();
		else
			ControlInst.dataSet.addEventHandler('onInitComplete', this.init);
	}
};

filterController.instances = new Array();

filterController.getInstanceById = function(sId) {
	for (var i = 0; i < filterController.instances.length; i++) {
		if (filterController.instances[i].getId() === sId) return filterController.instances[i];
	}
	return null;
};