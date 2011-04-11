/**
* dataSet
* Класс организует передачу данных между сервером и клиентом
* @author Игнат <Leeb> Толчанов
* @ver    1.0
* @param  _sModuleName  имя модуля, предоставляющего данные и некоторую функциональность
* @param  _bSuspendInit true - отложить инициализацию до явного вызова Init, false - немедленная инициализация
*/
function dataSet(_sModuleName, _bSuspendInit, _sInitParam) {
	/**
	* (Private!)
	* Основные данные
	*/
	var ModuleName    = _sModuleName;
	var InitParam     = (_sInitParam != undefined) ? _sInitParam : "";
	var LoadMethod     = '';
	var DefaultFilter  = null;
	var StoredFilters  = new Array();
	var Available      = false;
	var Inited         = false;
	var MethodList     = new Array();
	var CommonFields   = new Array();
	var CommonTypeId   = 0;
	var FieldsStoplist = new Array();
	var DefaultFields  = "";
	var LoadedTree     = new Array();
	var ReqCounter	   = 0;
	/**
	* (Private!)
	* Списки обработчиков событий
	*/
	var onInitComplete       = new Array();
	var onBeforeLoad 		 = new Array();	
	var onAfterLoad  		 = new Array();
	var onBeforeExecute 	 = new Array();
	var onAfterExecute  	 = new Array();
	var onBeforeRefresh		 = new Array();	
	var onAfterRefresh		 = new Array();
	var onAfterPieceLoad     = new Array();
	var onRequestFailed	     = new Array();	
	/**
	* Выполняет инициализацию (однократно)
	* @return true, если уже инициализирован, и false в противном случае
	*/
	this.init = function() {
		if(Inited) return true;
		Inited    = true;
		var onLoadType   = function(_Type) {
			if(_Type.responseXML) {
				CommonFields = _Type.responseXML.getElementsByTagName('group');
			}
			Available = true;
			if(!processEvents('onInitComplete')) return false;
		};
		var onLoadConfig = function(_Conf) {
			var Methods = _Conf.responseXML.getElementsByTagName('method');
			for(var i=0; i<Methods.length; i++) {
				var MethodDOM  = Methods[i];
				if(MethodDOM.getAttribute('forload') == 'true') {
					LoadMethod = MethodDOM.childNodes[0].nodeValue;
					continue;
				}
				var MethodDesc = new Object();
				for(var j=0; j<MethodDOM.attributes.length; j++){
					var Attribute = MethodDOM.attributes[j];
					if(Attribute.nodeName == "aliases") continue;
					MethodDesc[Attribute.nodeName] = Attribute.nodeValue; 
				}
				MethodDesc['name'] = MethodDOM.childNodes[0].nodeValue;
				var aliasesString = MethodDOM.getAttribute('aliases');
				if(aliasesString) {
					MethodDesc['aliases'] = aliasesString.split(',');					
					for(var k=0; k < MethodDesc.aliases.length; k++)
						MethodDesc.aliases[k] = MethodDesc.aliases[k].replace(/^\s+|\s+$/, '');
				} else {
					MethodDesc['aliases'] = [];
				}
				MethodList.push( MethodDesc );
			}
			
			var Excluded = _Conf.responseXML.getElementsByTagName('exclude');
			if(Excluded.length) {
				for(var i=0; i<Excluded.length; i++) {
					if(Excluded[i].childNodes.length) {
						FieldsStoplist.push(Excluded[i].childNodes[0].nodeValue);
					}
				}				
			}
			
			var Columns = _Conf.responseXML.getElementsByTagName('default');
			if(Columns.length && Columns[0].childNodes.length) {
				DefaultFields = Columns[0].childNodes[0].nodeValue;				
			}

			var Types = _Conf.responseXML.getElementsByTagName('type');
			if (Types.length) {
				for(var i=0; i<Types.length; i++) {
					if(!Types[i].getAttribute('common')) continue;
					var v = Types[i].getAttribute('common').toLowerCase(); 
					if(v == "1" || v == "true") {
						CommonTypeId = Types[i].getAttribute('id');
						var sUrl = '/utype/'+CommonTypeId+'/';
						requestGet(sUrl, onLoadType);
						break;
					} else if (v == 'custom') {
						CommonTypeId = Types[i].getAttribute('id');
						var sUrl = CommonTypeId;
						requestGet(sUrl, onLoadType);
					}
				}
			} else {
				Available = true;
				if(!processEvents('onInitComplete')) return false;
			}
		};
		var sUrl = '/admin/' + ModuleName + '/dataset_config.xml' + (InitParam.length ? ('?param=' + InitParam) : '');
		requestGet(sUrl, onLoadConfig);
		return Inited;
	};
	/**
	* Выполняет загрузку элементов согласно переданому фильтру
	* @param _Filter фильтр - хэш, определяющий выборку элементов
	*/
	this.load = function(_Filter) {
		if(!Available) return false;
		if(!processEvents('onBeforeLoad')) return false;

		var Callback = function(_Req) {
			var paging  = new Object();
			var Objects = ParseDOM(_Req.responseXML, false, paging);
			var Params = {
				'objects' : Objects,
				'filter'  : _Filter,
				'paging'  : paging
			};
			if((typeof(Objects) == 'string') || (Objects === null)) Params.error = Objects;
			Available = true;
			if(!processEvents('onAfterLoad', Params)) return false;
		};

		var sUrl  = '/admin/' + ModuleName + '/' + LoadMethod + '.xml' + assembleQueryString(_Filter, true);
		requestGet(sUrl, Callback);
	};


	/**
	* Обновляет загруженное с сервера дерево
	* @param _Branches загружать по родителю или по id, в случае отсутствия кэшированых фильтров
	*/
	this.refresh = function(_Branches) {
		if(!Available) return false;
		if(!processEvents('onBeforeRefresh')) return false;
		
		if(StoredFilters.length) {
			var sUrl         = '/admin/' + ModuleName + '/' + LoadMethod + '.xml';
			var iFilterIndex = 0;
			
			var ContinuousCallback = function(_Req, _Filter) {
				var paging  = new Object();
				var Objects = ParseDOM(_Req.responseXML, false, paging);
				
				var Params = {
					'objects' : Objects,
					'filter'  : _Filter,
					'paging'  : paging
				};
				
				if((typeof(Objects) == 'string') || (Objects === null)) Params.error = Objects;

				processEvents('onAfterPieceLoad', Params);
				iFilterIndex++;
				if(iFilterIndex >= StoredFilters.length) {
					Available = true;
					if(!processEvents('onAfterRefresh',   {'objects' : LoadedTree})) return false;
				} else {
					requestGet(sUrl + assembleQueryString(StoredFilters[iFilterIndex]), ContinuousCallback, StoredFilters[iFilterIndex]);
				}
			};
			
			Available = false;
			requestGet(sUrl + assembleQueryString(StoredFilters[iFilterIndex]), ContinuousCallback, StoredFilters[iFilterIndex]);
			
		} else {
			var SimpleCallback = function(_Req, _Filter) {
				var paging  = new Object();
				var Objects = ParseDOM(_Req.responseXML, false, paging);			
				
				var Params = {
					'objects' : Objects,
					'filter'  : new filter(),
					'paging'  : paging
				};
				
				if((typeof(Objects) == 'string') || (Objects === null)) Params.error = Objects;
				
				Available = true;
				processEvents('onAfterPieceLoad', Params);
				processEvents('onAfterRefresh',   {'objects' : LoadedTree});
				
			};
			var aIDs  = new Array();
			var Field = '';
			if(_Branches == undefined || _Branches == false) 
				Field = 'id';
			else
				Field = 'rel';
			for(var i=0; i<LoadedTree.length; i++) {
				aIDs.push(LoadedTree[i][Field]);
			}
			Available  = false;
			var sUrl   = '/admin/' + ModuleName + '/' + LoadMethod + '.xml?' + Field + '=' + aIDs.join(',');		
			LoadedTree = new Array();  // Don't forget to cleanup
			requestGet(sUrl, SimpleCallback);
		}
	};
	/**
	* Проверяет доступность некоторого метода
	* @param _sMethodName имя метода, доступность которого для данного модуля проверяется
	* @param _returnName  true - возвращать реальное имя метода (если передан имя алиаса)
	* @return true, если доступен, или false, если не доступен
	*/
	this.isMethodSupported = function(_sMethodName, _returnName) {
		var methodName = _sMethodName.toUpperCase();
		var returnName = (_returnName != undefined && _returnName == true) ? true : false;
		for(var i in MethodList) {
			if (typeof(MethodList[i]) === 'function') continue;
			if(MethodList[i].name.toUpperCase() == methodName) {								
				return returnName ? MethodList[i].name : true;
			}
			for(var j=0; j < MethodList[i].aliases.length; j++) {
				if(MethodList[i].aliases[j].toUpperCase() == methodName) {
					return returnName ? MethodList[i].name : true;					
				}
			}
		}
		return false;
	};
	/**
	* Возвращает список доступных для данного модуля методов
	* @return массив строк (имен методов)
	*/
	this.getMethodsList = function() {
		return MethodList;
	};
	/**
	* Возвращает список полей общего для объектов типа
	* @return массив DOMElement
	*/
	this.getCommonFields = function() {
		return CommonFields;
	};
	/**
	*
	*/
	this.getDefaultFields = function() {
		return DefaultFields;
	};
	/**
	*
	*/
	this.getFieldsStoplist = function() {
		return FieldsStoplist;
	};
	/**
	*
	*/
	this.getCommonTypeId = function() {
		return CommonTypeId;
	};
	/**
	* Выполняет указаный метод
	* @param _sMethodName имя метода
	* @param _ParamHash   параметры метода
	*/
	this.execute = function(_sMethodName, _ParamHash) {
		if(!Available) return false;
		var methodName = this.isMethodSupported(_sMethodName, true);
		if(!methodName) return false;

		var Params = {
			'method' : _sMethodName,
			'params' : _ParamHash,
			'objects' : new Array()
		};

		if(!processEvents('onBeforeExecute', Params)) return false;

		var Callback = function(_Req) {
			Control.enabled = true;
			var paging  = new Object();
			var Objects = ParseDOM(_Req.responseXML, true, paging);
			updateTree(Objects);
			Params.objects = Objects;
			Params.paging  = paging;
			
			if((typeof(Objects) == 'string') || (Objects === null)) Params['error'] = Objects;

			Available = true;
			if(!processEvents('onAfterExecute', Params)) return false;
		};
		
		var currentModule = getModuleForMethod(methodName);
		var sUrl   = window.pre_lang + '/admin/' + currentModule + '/' + methodName + '.xml';
		var aQuery = new Array();
		for(var PropName in _ParamHash) {
			if(_ParamHash[PropName] instanceof Array) {
				for(var i=0; i<_ParamHash[PropName].length; i++) {
					aQuery.push(PropName + '[]=' + _ParamHash[PropName][i]);
				}
			} else {
				aQuery.push(PropName + '=' + _ParamHash[PropName]);
			}
		}
		Available = false;
		sUrl 	  = sUrl + '?' + aQuery.join('&');		
		requestGet(sUrl, Callback);
	};
	/**
	* Возвращает уже загруженое дерево
	* @return дерево элементов/объектов
	*/
	this.getLoadedTree = function() {
		return LoadedTree;
	};
	/**
	* Возвращает доступность dataSet-а
	*/
	this.isAvailable = function() {
		return Available;
	};
	/**
	* Удаляет сохраненные фильтры
	*/
	this.clearFiltersCache = function() {
		StoredFilters = new Array();
	};
	/**
	* Устанавливает фильтр по-умолчанию, который применяется ко всем выборкам
	* @param _Filter фильтр
	*/
	this.setDefaultFilter = function(_Filter) {
		DefaultFilter = _Filter;	
	};
	/**
	* Возвращает фильтр по-умолчанию
	* @return фильтр
	*/
	this.getDefaultFilter = function() {
		return DefaultFilter;
	};
	/**
	* Добавляет новый обработчик события в список
	* @param _sEventKind событие, на которое вешается обработчик
	* @param _EvHandler  обработчик события
	* @return внутренний идентификатор обработчика
	*/
	this.addEventHandler = function(_sEventKind, _EvHandler) {
		var EventHandlers = chooseHandlers(_sEventKind);
		if(EventHandlers === null) return false;
		EventHandlers[EventHandlers.length] = { active: true, handler: _EvHandler};
		return EventHandlers.length - 1;
	};
	/**
	* Удаляет обработчик события из списка	
	* @param _sEventKind событие, с которого снимается обработчик
	* @param _iHandlerId идентификатор обработчика, возращаемый addEventHandler 
	*/
	this.removeEventHandler = function(_sEventKind, _iHandlerId) {
		var EventHandlers = chooseHandlers(_sEventKind);
		if(EventHandlers === null) return false;
		EventHandlers[_iHandlerId].active = false;
	};
	/**
	* (Private!) Определяет модуль для указаного метода
	* @param _sMethodName реальное имя метода (не алиас)
	* @return имя модуля
	*/
	var getModuleForMethod = function(_sMethodName) {
		var methodName = _sMethodName.toUpperCase();
		for(var i=0; i<MethodList.length; i++) {			
			if(MethodList[i].name.toUpperCase() == methodName && MethodList[i].module) {								
				return MethodList[i].module;
			}
		}
		return ModuleName;
	};
	/**
	* (Private!) Запускает обработку событий
	* @param _sEventKind  событие, обработчики которого вызываются
	* @param _EventParams параметры (хэш), передаваемые обработчикам
	*/
	var processEvents = function(_sEventKind, _EventParams) {
		if(!Inited) return false;
		var HandlerResult = true;
		var EventHandlers = chooseHandlers(_sEventKind);
		if(EventHandlers === null) return false;
		for(var i in EventHandlers) {
			if(EventHandlers[i].active) {
				HandlerResult = HandlerResult && (EventHandlers[i].handler(_EventParams) !== false);
			}
		}
		return HandlerResult;
	};
	/**
	* (Private!) Подбирает хранилище обработчиков для данного события
	* @param _sEventKind  событие
	* @return массив обработчиков
	*/
	var chooseHandlers = function(_sEventKind) {
		var EventHandlers = null;
		switch(_sEventKind.toUpperCase()) {
			case 'ONINITCOMPLETE'       : return onInitComplete;
			case 'ONBEFORELOAD'         : return onBeforeLoad;
			case 'ONAFTERLOAD'          : return onAfterLoad;
			case 'ONBEFOREEXECUTE' 		: return onBeforeExecute;
			case 'ONAFTEREXECUTE'  		: return onAfterExecute;
			case 'ONBEFOREREFRESH'      : return onBeforeRefresh;
			case 'ONAFTERREFRESH'       : return onAfterRefresh;
			case 'ONAFTERPIECELOAD'		: return onAfterPieceLoad;
			case 'ONREQUESTFAILED'      : return onRequestFailed;
			default : return null;
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
	var requestGet = function(_sUrl, _Callback, _Filter) {
		var Request = createRequestObject();
		Request.onreadystatechange = function() {
										if(Request.readyState != 4) return;
										ReqCounter++;
										if(Request.status == 200) {											
											_Callback(Request, _Filter);
										} else {											
											processEvents('onRequestFailed');											
										}
									};
		Request.open('GET', _sUrl, true);
		Request.send(null);
	};	
	/**
	* (Private!) Формирует строку запроса по переданному фильтру
	* @param _Filter фильтр - хэш, определяющий выборку элементов
	* @param _Store true - кэшировать переданный фильтр, false - в противном случае
	* @return строку запроса
	*/
	var assembleQueryString = function(_Filter, _Store) {
		var sQString = '';
		if(_Filter instanceof Object) {
			if(!DefaultFilter.Full) {
				_Filter.setViewMode(false);
			}
			
			sQString = _Filter.getQueryString( DefaultFilter );
			if(_Store != undefined && _Store === true) StoredFilters.push(_Filter);
		} else if(_Filter instanceof Object) {
			var Pieces = new Array(); 
			if(_Filter.id != undefined) {
				var Param;
				if(_Filter.id instanceof Array) {
					Param = _Filter.id;
				} else {
					Param = new Array();
					Param.push(_Filter.id);
				}
				Pieces.push('id=' + Param.join(','));
			}
			if(_Filter.rel != undefined) {
				var Param;
				if(_Filter.rel instanceof Array) {
					Param = _Filter.rel;
				} else {
					Param = new Array();
					Param.push(_Filter.rel);
				}
				Pieces.push('rel=' + Param.join(','));
			}
			if(Pieces.length) {
				sQString = '?' + Pieces.join('&');
				if(_Store != undefined && _Store === true) StoredFilters.push(_Filter);
			}
		}
		return sQString + "&r=" + Math.random();
	};
	/**
	* (Private!) Обрабатывает DOM и размещает его в массив в соответствии с требованиями
	* @param _XMLDOM XML DOM с объектами/элементами
	* @return массив объектов
	*/
	var ParseDOM = 	function(_XMLDOM, _bIgnoreTree, pagingParams) {
		var Objects = new Array();
		var DataNode = _XMLDOM.getElementsByTagName('data');
		if(!DataNode.length) return Objects;
		else DataNode = DataNode[0];
		var Data    = DataNode.childNodes;
		for(var i=0; i<Data.length; i++) {			
			var Node = Data[i];
			if(Node.nodeName == 'error') {
				return Node.firstChild.nodeValue;
			}
			if(Node.nodeName != 'page' && Node.nodeName != 'object' && Node.nodeName != 'type' && Node.nodeName != 'response') continue;
			var o = new Object();
			for(var j=0; j<Node.attributes.length; j++){
				var Attribute = Node.attributes[j];
				o[Attribute.nodeName] = Attribute.nodeValue;
			}
			WalkDOM(o, Node.childNodes);
			Objects.push(o);
			if(_bIgnoreTree == undefined || _bIgnoreTree === false) LoadedTree.push(o);
		}
		if(pagingParams != undefined && (pagingParams instanceof Object)) {
			pagingParams.total  = parseInt(DataNode.getAttribute('total'))  || Objects.length;
			pagingParams.offset = parseInt(DataNode.getAttribute('offset')) || 0;
			pagingParams.limit  = parseInt(DataNode.getAttribute('limit'))  || Objects.length;
		}
		return Objects;
	};
	/**
	* (Private!) Обрабатывает не корневые элементы DOM
	* @param _Acceptor хэш-приемник результата
	* @param DOM 
	*/
	var WalkDOM =  function(_Acceptor, DOM) {
		if(DOM.length == 1 && DOM[0].nodeType == 3) {
			_Acceptor['_value'] = DOM[0].nodeValue;
			return;
		}
		for(var i=0; i<DOM.length; i++) {
			var Node = DOM[i];
			
			var o = new Object();
			if( Node.nodeType != 1 ) {
				o = Node.nodeValue;
			} else if(!Node.attributes.length && Node.childNodes.length == 1 && Node.childNodes[0].nodeType == 3) {
				o = Node.childNodes[0].nodeValue;
			} else {				
				for(var j=0; j<Node.attributes.length; j++){
					var Attribute = Node.attributes[j];
					o[Attribute.nodeName] = Attribute.nodeValue;
				} 			
				WalkDOM(o, Node.childNodes);
			}
			if(_Acceptor[Node.nodeName] == undefined) {
				_Acceptor[Node.nodeName] = o;
			} else {
				if(_Acceptor[Node.nodeName] instanceof Array) {
					_Acceptor[Node.nodeName].push(o);
				} else {
					var Tmp = new Array();
					Tmp.push(_Acceptor[Node.nodeName]);
					Tmp.push(o);
					_Acceptor[Node.nodeName] = Tmp;
				}
			}
		}		
	};
	/**
	* (Private!) Обновляет элементы в дереве из переданного массива
	* @param _UpdateHashes
	*/
	var updateTree = function(_UpdateHashes) {
		if (!(_UpdateHashes instanceof Array)) return;
		for(var i=0; i<_UpdateHashes.length; i++) {
			for(var j=0; j<LoadedTree.length; j++) {
				if(_UpdateHashes[i].id == LoadedTree[j].id) {
					for(var item in _UpdateHashes[i]) {
						LoadedTree[j][item] = _UpdateHashes[i][item];
					}
					break;
				}
			}
		}
	};	
	/**
	* Инициализация
	*/
	if((typeof(_bSuspendInit) == 'undefined') || (_bSuspendInit == false)) {
		this.init();
	}
};