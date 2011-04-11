/**
* SettingsStore
* Класс предоставляет интерфейс для сохранения пользовательских предпочтений в профиле пользователя
* @author Сергей <lyxsus> Антонинко
* @ver 1.0
*/

SettingsStore.instance = null;

SettingsStore.getInstance = function () {
	if(!SettingsStore.instance) {
		SettingsStore.instance = new SettingsStore();
	}
	return SettingsStore.instance;
};

function SettingsStore() {
	/**
	* Список всех доступных записей
	* @access private
	*/
	var keys = window.settingsStoreData || {};

	var __self = this;
	/**
	* Списки обработчиков событий
	* @access private
	*/
	var onLoadComplete       = new Array();

	
	this.loaded = window.settingsStoreData ? true : false;
	/**
	* Получить запись по ключу
	* @access public
	* @param String key ключ записи
	* @param Array tags полуить только те записи, которые соответствуют тегам в массиве tags
	* @return Mixed значение записи
	*/
	this.get = function (key, target_tag) {
		target_tag = checkTagsArray(target_tag);
		
		if(keys[key]) {
			return (keys[key][target_tag]) ? keys[key][target_tag] : false;
		} else {
			return false;
		}
	};
	
	/**
	* Внести новое значение или изменить существующее
	* @access public
	* @param String key ключ значения
	* @param Mixed value значение, должно быть ортогональным
	* @param Array tags пометить запись ключами
	*/
	this.set = function (key, value, filter_tags) {
		if(!key) return false;
		filter_tags = checkTagsArray(filter_tags);
		
		var sUrl = "/admin/users/saveUserSettings/?key=" + key + "&value=" + value;
		
		if(filter_tags) {
			for(var i = 0; i < filter_tags.length; i++) {
				sUrl += "&tags[]=" + filter_tags[i];
			}
		} else {
			filter_tags = {};
		}
		
		var Callback = function (request) {};
		requestGet(sUrl, Callback);
		
		for(var i = 0; i < filter_tags.length; i++) {
			var tag = filter_tags[i];
			
			if(!keys[key]) {
				keys[key] = {};
			}
			
			if(value) {
				keys[key][tag] = value;
			} else {
				keys[key][tag] = undefined;
			}
		}
	};
	
	/**
	* Получить список ключей
	* @access public
	* @param Array tags полуить только те ключи, которые соответствуют тегам в массиве tags
	* @return Array список ключей
	*/
	this.list = function (target_tags) {
		target_tags = checkTagsArray(target_tags);
		var result = new Array();
		
		for(key in keys) {
			var values = keys[key];
			
			var value = false;
			for(var i in target_tags) {
				var tag = target_tags[i];
				
				for(var valueTag in values) {
					if(valueTag == tag) {
						value = values[valueTag];
					}
				}
			}
			
			if(value) {
				result[key] = value;
			}
		}
		
		return result;
	};
	
	this.callback = function (func) {
		if(typeof func == "function") {
			callback = func;
		}
		return this;
	};
	
	/**
	* Загрузить данные с сервера
	* @access private
	*/
	this.load = function () { 
		if (this.loaded) return true;
		setTimeout(function(){
		var sUrl = "/admin/users/loadUserSettings/?r="+Math.random();
		var Callback = function (request) {
			__self.loaded = true;
			parseXmlDom(request.responseXML);
			processEvents('onLoadComplete');
		};
		requestGet(sUrl, Callback);
		}, 50);
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
		if(this.loaded && _sEventKind.toUpperCase() == 'ONLOADCOMPLETE') _EvHandler();
		return EventHandlers.length - 1;
	};

	/**
	* (Private!) Запускает обработку событий
	* @param _sEventKind  событие, обработчики которого вызываются
	* @param _EventParams параметры (хэш), передаваемые обработчикам
	*/
	var processEvents = function(_sEventKind, _EventParams) {
		var EventHandlers = chooseHandlers(_sEventKind);
		if(EventHandlers === null) return false;
		for(var i in EventHandlers) {
			if(EventHandlers[i].active) {
				EventHandlers[i].handler(_EventParams);
			}
		}
	};

	/**
	* (Private!) Подбирает хранилище обработчиков для данного события
	* @param _sEventKind  событие
	* @return массив обработчиков
	*/
	var chooseHandlers = function(_sEventKind) {
		var EventHandlers = null;
		switch(_sEventKind.toUpperCase()) {
			case 'ONLOADCOMPLETE'       : return onLoadComplete;
			default : return null;
		}		
	};

	/**
	* Получить гарантировано корректный список тегов
	* @param Array|String|Mixed tags список тегов
	* @access private
	* @return Array список тегов
	*/
	var checkTagsArray = function (tags) {
		var typeofTagsVar = typeof tags;
		
		if(typeofTagsVar == "object") {
			if(tags.length > 0) {
				return tags;
			} else {
				tags.push('common');
				return tags;
			}
		} else if (typeofTagsVar == "string") {
			return new Array(tags);
		} else if(typeofTagsVar == "undefined") {
			return new Array('common');
		} else {
			return false;
		}
	};
	
	/**
	* Создает новый объект запроса (кросс-браузерная реализация)	
	* @access private
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
	* Выполняет GET запрос и вызывает соответсвующий CALLBACK
	* @param _sUrl URL запрашиваемого ресурса
	* @param _Callback функция, которая будет вызвана в случае успешного завершения запроса
	* @access private
	*/
	var requestGet = function(_sUrl, _Callback) {
		var Request = createRequestObject();
		Request.onreadystatechange = function() {
			if(Request.readyState != 4) return;
			if(Request.status == 200) {
				_Callback(Request);
			} else {
				processEvents('onRequestFailed');
			}
		};
		Request.open('GET', _sUrl, true);
		Request.send(null);
	};
	
	/**
	* Обработать данные из XML во внутреннее представление
	* @param xmldom XML DOM из Ajax'а
	* @access private
	*/
	var parseXmlDom = function(xmldom) {
		var data = xmldom.getElementsByTagName('item');
		
		for(var i = 0; i < data.length; i++) {
			var entry = data[i];
			
			var key = entry.getAttribute('key'); 
			
			keys[key] = {};
			
			var childs = entry.childNodes;
			var value = "", tag = "";
			for(var j = 0; j < childs.length; j++) {
				var node = childs[j];
				
				if(node.nodeName == "value") {
					value = node.firstChild.nodeValue;
					tag = node.getAttribute('tag');
					
					keys[key][tag] = value;
					continue;
				}
			}
		}
	};

	if(this.loaded) {
		processEvents('onLoadComplete');
	}
	
};

$(document).ready(function() {
	SettingsStore.getInstance().load();
});