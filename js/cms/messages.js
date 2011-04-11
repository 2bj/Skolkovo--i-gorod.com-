function umiMessages () {
	var ReqCounter = 0, lastMessageTime = 0, messages = new Array(), self = this, inited = false, messagesDiv;
	
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
	
	var requestGet = function(_sUrl, _Callback) {
		var Request = createRequestObject();
		Request.onreadystatechange = function() {
										if(Request.readyState != 4) return;
										ReqCounter++;
										if(Request.status == 200) {											
											_Callback(Request);
										} else {											
											processEvents('onRequestFailed');											
										}
									};
		Request.open('GET', _sUrl, true);
		Request.send(null);
	};
	
	var checkMessageNode = function (node) {
		var messageId = node.getAttribute('id');
		var messageTime = node.getAttribute('create-time');
		var sender = null, senderId = 0, senderLogin = "system";
		
		if(sender = node.getElementsByTagName('sender').item(0)) {
			senderId = sender.getAttribute('id');
			senderLogin = sender.getAttribute('name');
		}
		
		var messageInfo = {
			'id': messageId,
			'create-time': node.getAttribute('create-time'),
			'title': node.getAttribute('title'),
			'content': node.getElementsByTagName('content').item(0).firstChild.nodeValue,
			'sender-id': senderId,
			'sender-login': senderLogin,
			'type': node.getAttribute('type'),
			'priority': node.getAttribute('priority')
		};
		
		if(messageTime > lastMessageTime) {
			messages[messageId] = messageInfo;
			notify(messageId);
		}
		
		return messageTime;
	};
	
	var notify = function (messageId) {
		var messInfo = messages[messageId];
		self.render(messInfo);
	};
	
	var init = function () {
		if(!document.body) {
			return false;
		}
		inited = true;
		
		var style = document.createElement('style');
		var css = ".umi-quick-messages { position: absolute; top: 0; right: 0; font: 12px Tahoma; color: #FFF; }";
		css += ".umi-quick-messages .message { width: 220px; padding: 15px; margin: 25px; background-color: #666; }";
		
		css += ".umi-quick-messages .header { font-weight: bold; margin-bottom: 10px; } .umi-quick-message .content { margin-bottom: 10px; }";
		css += ".umi-quick-messages a {color: #FFF;} .umi-quick-messages .sender { font-style: italic; margin-top: 10px; }";
		style.innerHTML = css;
		document.getElementsByTagName('head').item(0).appendChild(style);
		messagesDiv = document.createElement('div');
		messagesDiv.className = 'umi-quick-messages';
		document.body.appendChild(messagesDiv);
	};
	
	this.refresh = function () {
		var self = this;
		function callback () {
			self.refresh();
		}
		setTimeout(callback, 5000);
		
		if(!inited) {
			if(!init()) {
				return;
			}
		}
		
		requestGet('/umess/inbox/', function (response) {
			if(response.responseXML) {
				var messagesNodes = response.responseXML.getElementsByTagName('message');
				var maxMessTime = 0;
				for(var i = 0; i < messagesNodes.length; i++) {
					var node = messagesNodes.item(i);
					var messTime = checkMessageNode(node);
					if(messTime > maxMessTime) {
						maxMessTime = messTime;
					}
				}
				
				if(maxMessTime) {
					lastMessageTime = maxMessTime;
				}
			}
		});
	};
	
	this.render = function (info) {
		var create = function (tag) { return $(document.createElement(tag)); };
		var append = function (child, parent) { return $(parent).appendChild($(child)); };
		
		var message = create('div'), header = create('div'), content = create('div'), date = create('div'), sender = create('div');
		var dt = new Date(info['create-time'] * 1000);
		var hour = dt.getHours(), minute = dt.getMinutes(), second = dt.getSeconds();
		var monthnumber = dt.getMonth(), monthday = dt.getDate(), year = 1900 + dt.getYear();
		if(monthnumber < 10) monthnumber = "0" + monthnumber;
		if(monthday < 10) monthday = "0" + monthday;
		if(hour < 10) hour = "0" + hour;
		if(minute < 10) minute = "0" + minute;
		if(second < 10) second = "0" + second;
		
		var dtStr = year + "." + monthnumber + "." + monthday + " " + hour + ":" + minute + ":" + second;
		
		$(header).update(info.title);
		$(content).update(info.content);
		$(sender).update(dtStr + " - " + info['sender-login']);
		
		message.id = 'umi-message-' + info['id'];
		message.className = 'message priority-' + info.priority;
		message.style.display = 'none';
		header.className = 'header';
		content.className = 'content';
		sender.className = 'sender';
		
		append(header, message);
		append(content, message);
		append(sender, message);
		append(message, messagesDiv);
		
		Effect.Appear('umi-message-' + info['id'], { duration: 1.5, afterFinish: function() {
			setTimeout(function() {
				Effect.Appear('umi-message-' + info['id'], { duration: 1.5, from: 1.0, to: 0, afterFinish: function () {
					message.remove();
				}});
			}, 30000);
		}});
		
	};
};


setTimeout(function () {
	//var messages = new umiMessages();
	//messages.refresh();
}, 1500);
