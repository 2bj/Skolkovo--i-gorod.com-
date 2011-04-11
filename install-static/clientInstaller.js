/**
* clientUpdater
* Класс для пошаговой установки системы
* @author Антонинко Сергей
* @ver    1.0
*/

function clientInstaller () {
	var self = this;
	var ReqCounter	   = 0;
	var eventsStore = new Array();

	/**
	* (Private!) Подбирает хранилище обработчиков для данного события
	* @param _sEventKind  событие
	* @return массив обработчиков
	*/
	var chooseHandlers = function(_sEventKind) {
		var EventHandlers = null;
		var eventKindId = _sEventKind.toUpperCase();
		
		if(eventsStore[eventKindId]) {
			return eventsStore[eventKindId];
		} else {
			eventsStore[eventKindId] = new Array();
			return eventsStore[eventKindId];
		}
	};
	
	/**
	* (Private!) Запускает обработку событий
	* @param _sEventKind  событие, обработчики которого вызываются
	* @param _EventParams параметры (хэш), передаваемые обработчикам
	*/
	var processEvents = function(_sEventKind, _EventParams) {
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
	* (Private!) Создает новый объект запроса (кросс-браузерная реализация)	
	* @return объект запроса (в зависимости от браузера)
	*/
	var createRequestObject = function() {
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
			ReqCounter++;
			if(Request.status == 200) {
				_Callback(Request);
			} else {
				processEvents('onConnectionError', Request.status);
			}
		};

		_sUrl += (_sUrl.indexOf('?') === -1 ? "?" : "&") + 'rq=' + Math.random();


		Request.open('GET', _sUrl, true);
		Request.send(null);
	};
	
	/**
	* (Private!) Запускает обработку событий
	* @param _sEventKind  событие, обработчики которого вызываются
	* @param _EventParams параметры (хэш), передаваемые обработчикам
	*/
	var processEvents = function(_sEventKind, _EventParams) {
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
	
	var run = function () {
		switch(self.currentStep) {
			case 0: {
				processEvents("showLicenseAgreement");
				break;
			}
			
			case 1: {
				checkSettings();
				break;
			}
			
			case 2: {
				checkLicenseKey();
				break;
			}
			
			case 3: {
				choosePackage();
				break;
			}
			
			case 4: {
				databaseSettings();
				break;
			}
			
			case 5: {
				installSystem();
				break;
			}
			
			case 6: {
				choosePassword();
				break;
			}
			
			case 7: {
				chooseDemoSite();
				break;
			}
			
			default: {
				alert("Unkown step #" + self.currentStep);
				return false;
			}
		}
	};
	
	var checkSettings = function () {
		processEvents("checkSettings");
		processEvents("onWait");
		requestGet("gw.php?do=check-settings", function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			var failSettings = new Array();
			for(var i = 0; i < root.childNodes.length; i++) {
				var node = root.childNodes.item(i);
				if(node.nodeType != 1) continue;
				if(node.getAttribute('status') != "ok") {
					failSettings[failSettings.length] = node.tagName;
				}
			}
			
			processEvents('checkSettings', failSettings);
		});
	};
	
	var checkLicenseKey = function () {
		processEvents('checkLicenseKey');
	};
	
	var choosePackage = function () {
		processEvents('choosePackage');
	};
	
	var databaseSettings = function () {
		processEvents('databaseSettings');
	};
	
	var installSystem = function (position) {
		if(!position) {
			var params = {'total': 0, 'recieved': 0, 'descr': 0};
			processEvents('installSystem', params);
			position = self.position;
		}
		
		var url = "gw.php?do=install-core";
		url += "&mysql-host=" + self.mysqlHost;
		url += "&mysql-login=" + self.mysqlLogin;
		url += "&mysql-password=" + self.mysqlPassword;
		url += "&mysql-dbname=" + self.mysqlDbname;
		url += "&use-xmldriver=" + (self.useXMLDriver ? 1 : 0);
		url += "&package=" + self.packageName;
		url += "&pos=" + parseInt(position);
		
		
		requestGet(url, function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			var status = root.getElementsByTagName('status')[0];
			if(parseInt(status.getAttribute('done')) == 1) {
				self.currentStep++;
				self.run();
				return;
			}
			
			var params = {
				'total': status.getAttribute('total'),
				'done': status.getAttribute('done'),
				'recieved': status.getAttribute('position'),
				'descr': (status.firstChild ? status.firstChild.nodeValue : "")
			};
			
			
			processEvents('installSystem', params);
			self.position = status.getAttribute('position');
			installSystem(self.position);
		});
	};
	
	var choosePassword = function () {
		processEvents("choosePassword");
	};
	
	var chooseDemoSite = function () {
		processEvents("chooseDemoSite");
		processEvents("onWait");
		
		var url = "gw.php?do=get-demo-sites";
		requestGet(url, function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			var siteNodes = root.getElementsByTagName('site');
			var sites = new Array;
			for(var i = 0; i < siteNodes.length; i++) {
				var node = siteNodes.item(i);
				sites.push({
					'name': node.getAttribute('name'),
					'photo': node.getAttribute('photo'),
					'descr': node.firstChild.nodeValue
				});
			}
			processEvents('chooseDemoSite', sites);
			
		});
	};
	
	var cleanupPages = function () {
		processEvents("onWait");
		processEvents('cleanupPages');
	};
	
	var finalizeInstallation = function () {
		processEvents("onWait");
		requestGet("gw.php?do=finalize-installation", function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			window.location = "/";
		});
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
	
	this.run = function(params) {
		if (!params) var params = '';
		this.stopped = false;
		return run(params);
	};

	this.stopped = false;
	this.currentStep = 0;

	this.licenseInfo = {};
	this.packageName = "";
	this.useXMLDriver = false;
	this.mysqlHost = "localhost";
	this.mysqlLogin = "umi";
	this.mysqlPassword = "umi";
	this.mysqlDbname = "umi";
	this.position = 0;

	this.stop = function() {
		this.stopped = true;
	};
	
	this.checkLicenseKey = function (keycode, domain, ip) {
		var url = "http://udod.umihost.ru/updatesrv/initInstallation/";
		url += "?keycode=" + keycode;
		url += "&domain=" + domain;
		url += "&ip=" + ip;
		url += "&requestId=" + (++ReqCounter);
		var scriptNode = document.createElement("script");
		scriptNode.charset = "utf-8";
		scriptNode.src = url;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	};
	
	this.processEvents = function (eventKey, params) {
		processEvents(eventKey, params);
	};
	
	this.setLicenseInfo = function (info) {
		this.licenseInfo = info;
	};
	
	this.getPackagesList = function () {
		processEvents("onWait");
		requestGet("gw.php?do=packages-list", function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			var packages = root.getElementsByTagName('package');
			var params = new Array;
			for(var i = 0; i < packages.length; i++) {
				var node = packages.item(i);
				params.push(node.firstChild.nodeValue);
			}
			processEvents('choosePackage', params);
		});
	};
	
	this.choosePackage = function (packageName) {
		this.packageName = packageName;
		this.currentStep++;
		this.run();
	};
	
	this.tryMysql = function () {
		processEvents("onWait");
		var url = "gw.php?do=check-mysql";
		url += "&mysql-host=" + this.mysqlHost;
		url += "&mysql-login=" + this.mysqlLogin;
		url += "&mysql-password=" + this.mysqlPassword;
		url += "&mysql-dbname=" + this.mysqlDbname;
		
		requestGet(url, function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			self.currentStep++;
			self.run();
		});
	};
	
	this.saveSv = function (login, password) {
		processEvents("onWait");
		
		var url = "gw.php?do=save-sv";
		url += "&sv-login=" + encodeURIComponent(login);
		url += "&sv-password=" + encodeURIComponent(password);
		url += "&keycode=" + encodeURIComponent(self.licenseInfo['domain_keycode']);
		url += "&fname=" + encodeURIComponent(self.licenseInfo['first_name']);
		url += "&lname=" + encodeURIComponent(self.licenseInfo['last_name']);
		url += "&email=" + encodeURIComponent(self.licenseInfo['email']);
		url += "&license_type=" + encodeURIComponent(self.licenseInfo['license_type']);
		url += "&license_codename=" + encodeURIComponent(self.licenseInfo['license_codename']);
		
		requestGet(url, function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			self.currentStep++;
			self.run();
		});
	};
	
	this.installDemoSite = function (sitename) {
		if(!sitename) {
			window.location = "/";
		}
		
		var url = "gw.php?do=install-site";
		url += "&sitename=" + sitename;
		
		requestGet(url, function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			var status = root.getElementsByTagName('status')[0];
			var params = {
				'proc': status.getAttribute('proc'),
				'descr': status.firstChild.nodeValue,
				'sitename': sitename
			};
			
			if(params['proc'] == 100) {
				params['done'] = 1;
				processEvents('cleanupPages');
				return;
			}
			
			processEvents('chooseDemoSite', params);
		});
	};
	
	this.cleanupPages = function () {
		var url = "gw.php?do=cleanup-pages";
		
		requestGet(url, function (response) {
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			if (error) {
				processEvents('onException', error);
				return false;
			}
			
			var status = root.getElementsByTagName('status')[0];
			var params = {
				'proc': status.getAttribute('proc')
			};
			
			if(params['proc'] == 100) {
				params['done'] = 1;
				finalizeInstallation();
				return;
			}
			
			processEvents('cleanupPages', params);
		});
	};
	
	this.finalizeInstallation = function () {
		finalizeInstallation();
	};
};