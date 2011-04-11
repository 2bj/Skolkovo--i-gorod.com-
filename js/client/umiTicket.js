var Mozilla = (navigator.appName.indexOf("Netscape") != -1);

function umiTicket (id, userId, userLogin, userFIO, x, y, width, height, message) {
	this.id = id;
	this.userId = userId;
	this.userLogin = userLogin;
	this.userFIO = userFIO;
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.width = parseInt(width);
	this.height = parseInt(height);

	this.message = message;
};

umiTicket.prototype.id = null;
umiTicket.prototype.userId = null;
umiTicket.prototype.userLogin = null;
umiTicket.prototype.userFIO = null;
umiTicket.prototype.x = null;
umiTicket.prototype.y = null;
umiTicket.prototype.width = null;
umiTicket.prototype.height = null;

umiTicket.prototype.message = null;




umiTicket.prototype.renderTicket = function () {
	var ghostWidth = this.width - this.x;
	var ghostHeight = this.height - this.y;

	//TODO
	var containerDiv = this.containerDiv = document.createElement("div");

	containerDiv.style.zIndex		= new String(110 + ((this.id) ? this.id : 0));
	containerDiv.style.position		= "absolute";
	containerDiv.style.left			= (-5 + ghostWidth + this.x) + "px";
	containerDiv.style.top			= (-5 + ghostHeight + this.y) + "px";
	containerDiv.style.border		= "#000 1px solid";
	containerDiv.style.backgroundColor	= "#FFFFE1";
	containerDiv.style.padding		= "5px";
	containerDiv.style.color		= "#000";
	containerDiv.style.fontFamily		= "Verdana";
	containerDiv.style.fontSize		= "11px";
	containerDiv.style.fontWeight		= "normal";
	containerDiv.style.textDecoration	= "none";
	containerDiv.style.letterSpacing	= "-1px";
	containerDiv.style.margin		= "0px";
	containerDiv.style.width		= "auto";
	containerDiv.style.height		= "auto";
	containerDiv.style.textAlign		= "left";




	var authorString = (this.userFIO) ? (this.userFIO + " (" + this.userLogin + ")") : (this.userLogin);
	var authorDiv = document.createElement("div");

	authorDiv.style.color			= "#000";
	authorDiv.style.fontFamily		= "Verdana";
	authorDiv.style.fontSize		= "11px";
	authorDiv.style.fontWeight		= "bold";
	authorDiv.style.textDecoration		= "none";
	authorDiv.style.letterSpacing		= "-1px";
	authorDiv.style.margin			= "0px";
	authorDiv.style.marginBottom		= "5px";
	authorDiv.style.width			= "auto";
	authorDiv.style.height			= "auto";
	authorDiv.style.textAlign		= "left";


	authorDiv.appendChild( document.createTextNode( authorString ) );




	var messageDiv = this.messageDiv = document.createElement("div");
	messageDiv.innerHTML = "<div style='font-family: Verdana; font-size: 11px; font-weight: normal; text-align: left; color: #000;'>" + this.message.replace(/\n/g, "<br />") + "</div>";


	var settingsDiv = this.settingsDiv = document.createElement("div");
	settingsDiv.style.width			= "150px";
	settingsDiv.style.height		= "auto";
	settingsDiv.style.margin		= "0px";
	settingsDiv.style.marginTop		= "10px";
	settingsDiv.style.textAlign		= "left";


	var editLink = this.editLink = document.createElement("a");
	editLink.style.color			= "#138ECC";
	editLink.style.fontFamily		= "Verdana";
	editLink.style.fontSize			= "11px";
	editLink.style.fontWeight		= "normal";
	editLink.style.textDecoration		= "underline";
	editLink.style.cursor			= "pointer";
	editLink.style.letterSpacing		= "-1px";
	editLink.style.margin			= "0px";
	editLink.style.marginLeft		= "0px";
	editLink.style.marginRight		= "5px";
	editLink.style.textAlign		= "left";

	editLink.appendChild( document.createTextNode("Редактировать") );


	var delLink = this.delLink = document.createElement("a");
	delLink.style.color			= "#138ECC";
	delLink.style.fontFamily		= "Verdana";
	delLink.style.fontSize			= "11px";
	delLink.style.fontWeight		= "normal";
	delLink.style.textDecoration		= "underline";
	delLink.style.cursor			= "pointer";
	delLink.style.letterSpacing		= "-1px";
	delLink.style.margin			= "0px";
	delLink.style.marginLeft		= "0px";
	delLink.style.marginRight		= "5px";
	delLink.style.textAlign		= "left";

	delLink.appendChild( document.createTextNode("Удалить заметку") );


//	settingsDiv.appendChild(editLink);
	settingsDiv.appendChild(delLink);


	containerDiv.appendChild(authorDiv);
	containerDiv.appendChild(messageDiv);
	containerDiv.appendChild(settingsDiv);

	document.body.appendChild(containerDiv);


	var ghostDiv = this.ghostDiv = document.createElement("div");
	ghostDiv.style.width = "1px";
	ghostDiv.style.height = "1px";
	ghostDiv.style.border = "red 1px dashed";
	ghostDiv.style.position = "absolute";
	ghostDiv.style.left = this.x + "px";
	ghostDiv.style.top = this.y + "px";
	ghostDiv.style.width = ghostWidth + "px";
	ghostDiv.style.height = ghostHeight + "px";
	ghostDiv.style.backgroundColor = "#DDD";
	ghostDiv.style.zIndex = new String(110 + ((this.id) ? this.id : 0));
	this.setAlpha(ghostDiv, 30);
	document.body.appendChild(ghostDiv);
	this.setAlpha(containerDiv, 15);

	this.attachEvents();
};


umiTicket.prototype.attachEvents = function () {
	var __self = this;


	this.editLink.onclick = this.messageDiv.onclick = function () {	//ondblclick
		if(!__self.txtMode) {
			__self.switchMode();
		}
	};


	this.delLink.onclick = function () {
		umiTickets.getInstance().removeTicket(__self.id);
	};


	this.containerDiv.onmouseover = function () {
		__self.setAlpha(this, 100);
	};

	this.containerDiv.onmouseout = function () {
		if(!__self.txtMode) {
			__self.setAlpha(this, 15);
		}
	};
};


umiTicket.prototype.switchMode = function () {
	var obj = this.messageDiv.firstChild;
	var width = obj.offsetWidth, height = obj.offsetHeight;
	obj.parentNode.removeChild(obj);

	//TODO: edit mode
	var textArea = document.createElement("textarea");
	textArea.style.backgroundColor	= "#FFFFE1";
	textArea.style.padding		= "0px";
	textArea.style.color		= "#000";
	textArea.style.fontFamily	= "Verdana";
	textArea.style.fontSize		= "11px";
	textArea.style.fontWeight	= "normal";
	textArea.style.textDecoration	= "none";
	textArea.style.letterSpacing	= "-1px";
	textArea.style.margin		= "0px";
	textArea.style.width		= width + "px";
	textArea.style.height		= height + "px";
	textArea.style.border		= "0px";

	textArea.value = this.message;
	this.messageDiv.appendChild(textArea);

	textArea.focus();
	textArea.select();

	this.txtMode = true;
	this.setAlpha(this.containerDiv, 100)
	var __self = this;
	textArea.onblur = function () {
		__self.txtMode = false;
		__self.message = this.value;

		var obj = __self.containerDiv;
		obj.parentNode.removeChild(obj);

		var obj = __self.ghostDiv;
		obj.parentNode.removeChild(obj);


		__self.renderTicket();

		var handler = function (res) {
			//void ?
		};

		lLib.getInstance().makeRequest("/content/json_update_ticket/?ticket_id=" + __self.id + "&message=" + __self.message.replace(/\n/g, "\\n"), handler);
	};
};


umiTicket.prototype.setAlpha = function (obj, alpha) {
	if(Mozilla) {
		obj.style.MozOpacity = alpha / 100;
	} else {
		obj.style['filter'] = "alpha(opacity = " + alpha + ")";
	}
	obj.style.opacity = alpha / 100;
}