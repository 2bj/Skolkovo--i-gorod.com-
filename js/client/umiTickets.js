var Mozilla = (navigator.appName.indexOf("Netscape") != -1);

function umiTickets () {
	var th = (typeof window.onload == "function") ? window.onload : function () {};
	var __self = this;

	window.onload = function () {
		th();
		__self.init();
	};
};

umiTickets.self = null;

umiTickets.getInstance = function () {
	if(!umiTickets.self) {
		umiTickets.self = new umiTickets();
	}
	return umiTickets.self;
};


umiTickets.prototype.tickets = new Array();
umiTickets.prototype.userId = null;
umiTickets.prototype.userLogin = null;
umiTickets.prototype.userFIO = null;
umiTickets.prototype.is_loaded = false;

umiTickets.prototype.ox = 0;
umiTickets.prototype.oy = 0;

umiTickets.prototype.tmpx = 0;
umiTickets.prototype.tmpy = 0;
umiTickets.prototype.ticketsAllowed = false;


umiTickets.prototype.createTicket = function (x, y, width, height) {
	if(!this.is_loaded) return false;
	this.addTicket(false, this.userId, this.userLogin, this.userFIO, x, y, width, height, new String("Новая заметка"));
};


umiTickets.prototype.addTicket = function (ticketId, userId, userLogin, userFIO, x, y, width, height, message) {
	if(!ticketId) {
		ticketId = 0;
	}

	var ticket = this.tickets[ticketId] = new umiTicket(ticketId, userId, userLogin, userFIO, x, y, width, height, message);
	ticket.renderTicket();

	if(ticketId == 0) {
		var __self = this;

		var handler = function (res) {
			__self.tickets[res.ticketId] = __self.tickets[0];
			ticket.id = res.ticketId;
		};
		lLib.getInstance().makeRequest("/content/json_add_ticket/?x=" + x + "&y=" + y + "&width=" + width + "&height=" + height + "&z=123", handler);
	}
};


umiTickets.prototype.removeTicket = function (ticketId, skipJSONRequest) {
	var ticket;
	if(ticket = this.tickets[ticketId]) {
		var obj = ticket.containerDiv;
		if(obj) {
			obj.parentNode.removeChild(obj);
		}

		var obj = ticket.ghostDiv;
		if(obj) {
			obj.parentNode.removeChild(obj);
		}

		this.tickets[ticketId] = undefined;

		var handler = function (res) {
			//void ?
		};

		if(!skipJSONRequest) {
			lLib.getInstance().makeRequest("/content/json_del_ticket/?ticket_id=" + ticketId, handler);
		}


		return true;
	} else {
		return false;
	}
};


umiTickets.prototype.init = function () {
	var __self = this;
	var handler = function (res) {
		__self.__onLoad(res);
	};
	lLib.getInstance().makeRequest("/content/json_get_tickets/?", handler);
};


umiTickets.prototype.__onLoad = function (response) {
	var i, l = response.tickets.length;
	
	this.userId = response.userId;
	this.userLogin = response.userLogin;
	this.userFIO = response.userFIO;

	for(i = 0; i < l; i++) {
		var ticket_info = response.tickets[i];
		this.addTicket(ticket_info[0], ticket_info[1], ticket_info[2], ticket_info[3], ticket_info[4], ticket_info[5], ticket_info[6], ticket_info[7], ticket_info[8].replace(/\\n/g, "\n"));
	}
	
	this.is_loaded = true;
};


umiTickets.prototype.handleTicket = function (x, y) {
	this.ox = x;
	this.oy = y;
	this.moveHandler = document.onmousemove;
	this.mouseUpHandler = document.onmouseup;

	var ghostDiv = this.ghostDiv = this.createGhost();

	var __self = this;
	document.onmousemove = function (e) {
		__self.moveHandler(e);
		__self.resizeGhost(lMouseX, lMouseY);
		__self.resetAllSelections();
	};

	document.onmouseup = function () {
		__self.createTicket(__self.ox, __self.oy, __self.tmpx, __self.tmpy);

		document.onmousemove = __self.moveHandler;
		document.onmouseup = __self.mouseUpHandler;


		ghostDiv.parentNode.removeChild(ghostDiv);
	};
};


umiTickets.prototype.createGhost = function () {
	var ghostDiv = document.createElement("div");
	ghostDiv.style.width = "1px";
	ghostDiv.style.height = "1px";
	ghostDiv.style.border = "red 1px dashed";
	ghostDiv.style.position = "absolute";
	ghostDiv.style.left = this.ox + "px";
	ghostDiv.style.top = this.oy + "px";
	ghostDiv.style.backgroundColor = "#DDD";
	ghostDiv.style.zIndex = new String("10010");
	if(Mozilla) {
		ghostDiv.style.MozOpacity = "0.3";
	} else {
		ghostDiv.style['filter'] = "alpha(opacity = 30)";
	}
	document.body.appendChild(ghostDiv);

	return ghostDiv;
};

umiTickets.prototype.resizeGhost = function (width, height) {
	if(!this.ghostDiv) this.createGhost();
	this.ghostDiv.style.width = width - this.ox + 'px';
	this.ghostDiv.style.height = height - this.oy + 'px';
	this.tmpx = width;
	this.tmpy = height;
};


umiTickets.prototype.resetAllSelections = function () {
	try {
		document.selection.empty();
		window.getSelection().removeAllRanges();
	} catch(e) { }
}


umiTickets.prototype.beginCreatingTicket = function () {
	if(!this.ticketsAllowed) {
		return false;
	}
	
	var h = (typeof document.onmousedown == "function") ? document.onmousedown : function () {};

	document.onmousedown = function (event) {
		var x = Event.pointerX(event);
		var y = Event.pointerY(event);

			
		if(true) {
			if (document.documentElement && document.documentElement.scrollTop && document.documentElement.scrollLeft) {
				y += document.documentElement.scrollTop;
				x += document.documentElement.scrollLeft;
			} else {
				y += document.body.scrollTop;
				x += document.body.scrollLeft;
			}
		}

		umiTickets.getInstance().handleTicket(x, y);

		document.onmousedown = h;
	};
};

umiTickets.prototype.deleteAll = function () {
	var i;
	for(i in this.tickets) {
		var ticketId = i;
		this.removeTicket(ticketId, true);
	}
}

umiTickets.getInstance();