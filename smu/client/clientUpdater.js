/**
* clientUpdater
* ����� ��� ������������� ���������� ���������� �� �������
* @author ����� ������
* @ver    1.0
*/
function clientUpdater() {
	/**
	* (Private!)
	*/
	var __self = this;
	var ReqCounter	   = 0;
	var DataSource = '/smu/gw.php';
	/**
	* (Private!) ������� ����� ������ ������� (�����-���������� ����������)	
	* @return ������ ������� (� ����������� �� ��������)
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
	}
	/**
	* (Private!) ��������� GET ������ � �������� �������������� CALLBACK
	* @param _sUrl URL �������������� �������
	* @param _Callback �������, ������� ����� ������� � ������ ��������� ���������� �������
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
	}


	var onPrepareStep		= new Array();
	var onConnectionError	= new Array();
	var onWait				= new Array();
	var onLoadComplete		= new Array();
	var onServerException	= new Array();
	var onUpdaterException	= new Array();
	var onResponseFailed	= new Array();
	var onInitComplete		= new Array();
	var onDownload			= new Array();
	var onStop				= new Array();
	var onCheck				= new Array();
	var onCheckFail			= new Array();
	var	onUpdate			= new Array();
	var onUpdateFinish		= new Array();

	/**
	* (Private!) ��������� ��������� ������������ ��� ������� �������
	* @param _sEventKind  �������
	* @return ������ ������������
	*/
	var chooseHandlers = function(_sEventKind) {
		var EventHandlers = null;
		switch(_sEventKind.toUpperCase()) {
			case 'ONPREPARESTEP'		: return onPrepareStep;
			case 'ONCONNECTIONERROR'	: return onConnectionError;
			case 'ONWAIT'				: return onWait;
			case 'ONLOADCOMPLETE'		: return onLoadComplete;
			case 'ONSERVEREXCEPTION'	: return onServerException;
			case 'ONUPDATEREXCEPTION'	: return onUpdaterException;
			case 'ONRESPONSEFAILED'		: return onResponseFailed;
			case 'ONINITCOMPLETE'		: return onInitComplete;
			case 'ONSTOP'				: return onStop;
			case 'ONDOWNLOAD'			: return onDownload;
			case 'ONCHECKFAIL'			: return onCheckFail;
			case 'ONCHECK'				: return onCheck;
			case 'ONUPDATE'				: return onUpdate;
			case 'ONUPDATEFINISH'		: return onUpdateFinish;

			default : return null;
		}
	}


	/**
	* (Private!) ��������� ��������� �������
	* @param _sEventKind  �������, ����������� �������� ����������
	* @param _EventParams ��������� (���), ������������ ������������
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
	}


	var run = function(ext_params) {
		if (__self.needWait) {
			processEvents('onWait');
			__self.needWait = false;
		}

		var request = DataSource;
		if (ext_params != undefined) request += ext_params;

		if (__self.stopped) {
			processEvents('onStop');
			return false;
		};

		requestGet(request, function(response) {
			//document.body.appendChild(document.createTextNode(response.responseText));
			try {
				var r = response.responseXML;
				var root = r.getElementsByTagName('response')[0];
				var type = root.getAttribute('type');
				var errors_nl = root.getElementsByTagName('error');
				var error = errors_nl.length ? errors_nl[0] : false;
			} catch(err) {
				processEvents('onResponseFailed', response);
			}
			
			processEvents('onLoadComplete', type);

			if (error) {
				if (type == 'exception') {
					processEvents('onUpdaterException', error);
				} else {
					processEvents('onServerException', error);
				}
				return false;
			}

			if (type == 'update-init') {
				processEvents('onInitComplete', root);
				__self.needWait = true;
				return true;
			}
			if (type == 'update-download') {
				var downloaded = root.getElementsByTagName('downloaded')[0];
				processEvents('onDownload', downloaded);
				if (downloaded.getAttribute('status') == 'complete') {
					__self.needWait = true;
					processEvents('onPrepareStep', 'check-poll-response');
				}
				return run();
			}
			
			if (type == 'check-poll-response') {
				__self.needWait = true;
				var checking = root.getElementsByTagName('checking')[0];
				var result = checking.getAttribute('result');
				processEvents('onCheck', checking);
				if (result != 'fail') {
					return run();
				}
				if (result == 'success') {
					processEvents('onPrepareStep', 'poll-response');
				}
			}

			if (type == 'poll-response') {
				var status = root.getElementsByTagName('status')[0];
				var ready = status.getAttribute('ready');
				processEvents('onUpdate', status);
				if (ready == 'done') {
					__self.needWait = true;
					processEvents('onPrepareStep', 'temp-cleanup');
				}
				return run();
			}

			if (type == 'temp-cleanup') {
				__self.needWait = true;
				var status = root.getElementsByTagName('status')[0];
				var ready = status.getAttribute('ready');
				if (ready == 'done') {
					__self.needWait = true;
					processEvents('onPrepareStep', 'update-success');
				}
				return run();
			}

			if (type == 'update-success') {
				processEvents('onUpdateFinish', root);
			}
		
			
		});
	}


	this.needWait = true;

	/**
	* (Public!)
	*/

	/**
	* ��������� ����� ���������� ������� � ������
	* @param _sEventKind �������, �� ������� �������� ����������
	* @param _EvHandler  ���������� �������
	* @return ���������� ������������� �����������
	*/
	this.addEventHandler = function(_sEventKind, _EvHandler) {
		var EventHandlers = chooseHandlers(_sEventKind);
		if(EventHandlers === null) return false;
		EventHandlers[EventHandlers.length] = { active: true, handler: _EvHandler};
		return EventHandlers.length - 1;
	}
	/**
	* ������� ���������� ������� �� ������	
	* @param _sEventKind �������, � �������� ��������� ����������
	* @param _iHandlerId ������������� �����������, ����������� addEventHandler 
	*/
	this.removeEventHandler = function(_sEventKind, _iHandlerId) {
		var EventHandlers = chooseHandlers(_sEventKind);
		if(EventHandlers === null) return false;
		EventHandlers[_iHandlerId].active = false;
	}

	this.run = function(params) {
		if (!params) var params = '';
		this.stopped = false;
		return run(params);
	}

	this.stopped = false;

	this.stop = function() {
		this.stopped = true;
	}
}

