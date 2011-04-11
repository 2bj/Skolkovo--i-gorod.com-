function fileControl(name, options) {
	var _self      = this;
	var container  = document.getElementById('fileControlContainer_' + name);
	var select     = null;
	var inputName  = options.inputName  || name;
	var imagesOnly = options.imagesOnly || false;
	var videosOnly = options.videosOnly || false;
	var cwd        = '.';
	var defaultCwd = '.';
	var loaded     = false;

	var construct = function() {
		select    = document.createElement('select');
		container.appendChild(select);

		select.onmouseover = function () { if(!loaded) loadListing(); };

		window['fileControlSelect_' + name] = select;

		select.id      = 'fileControlSelect_' + name;
		select.name    = inputName;
		select.control = _self;
		select.className = 'fileControlSelect';

		var option = document.createElement('option');
		option.innerHTML = '';
		option.value     = '';
		option.selected  = true;
		select.appendChild(option);

		var img   = document.createElement('img');
		img.src   = "/images/cms/browse_folder.png";
		var a     = document.createElement('a');
		a.href	  = 'javascript:void(0);';
		a.onclick = function() { showFileBrowser(select.id, defaultCwd, imagesOnly, videosOnly); };
		a.appendChild(img);

		container.appendChild(a);
	};

	var showFileBrowser = function(selectId, folder, imageOnly, videoOnly) {
		var qs    = 'id='+selectId;
		var index = 0;
		var file  = cwd.replace(/^\.\//, "/") + ((index = select.value.lastIndexOf('/')) != -1 ? select.value.substr(index) : select.value );
		qs = qs + '&file=' + file;
		if(folder) {
			qs = qs + '&folder=' + folder;
		}
		if(imageOnly) {
			qs = qs + '&image=1';
		}
		if(videoOnly) {
			qs = qs + '&video=1';
		}
		$.openPopupLayer({
			name   : "Filemanager",
			title  : "Файловый менеджер",
			width  : 660,
			height : 460,
			url    : "/styles/common/other/filebrowser/umifilebrowser.html?"+qs
		});		
	};

	this.clearItems = function() {
		while(select.options.length) {
			select.options[0].parentNode.removeChild(select.options[0]);
		}
		var option = document.createElement('option');
		option.innerHTML = '';
		option.value     = cwd + '/';
		option.selected  = true;
		select.appendChild(option);
		loaded = false;
	};

	var loadListing = function() {
		loaded = true;
		$.ajax({url      : "/admin/data/getfilelist/?folder=" + base64encode(cwd.substr(1)) + (imagesOnly ? "&showOnlyImages=1" : "" ) + (videosOnly ? "&showOnlyVideos=1" : "" ),
				type     : "get",
				complete : function(r, t) { _self.updateItems(r); } });

	};

	this.updateItems = function(response) {
		var files = response.responseXML.getElementsByTagName('file'); 		
		if(!select.options.length) {
			this.add(null, true);
		}
		for(var i=0; i<files.length; i++) {
			this.add(files[i].getAttribute('name'));
		}
		if($.browser.msie) {
			var d = select.style.display;
			select.style.display = 'none';
			select.style.display = d;
		}
	};

	this.setFolder = function(name, isDefault) {
		if(cwd != name) {
			cwd = name;
			this.clearItems();
		}
		if(isDefault != undefined && isDefault) {
			defaultCwd = name;
		}
	};

	this.add = function(name, selected) {
		if(name && !name.length) return;
		if(!name) name = '';
		if(name.lastIndexOf("/") != -1) {
			this.setFolder(name.substr(0, name.lastIndexOf("/")));
			name = name.substr(name.lastIndexOf("/") + 1);			
		}
		for(var i=0; i<select.options.length; i++) {
			if(select.options[i].innerHTML == name) {
				if(selected) select.options[i].selected = selected;
				return;
			}
		}
		var option = document.createElement('option');
		option.innerHTML = name;
		option.value     = ((cwd.indexOf("./") != 0) ? '.' : '') + (cwd + '/' + name);
		if(selected != undefined && selected) option.selected  = true;
		select.appendChild(option);
	};	

	construct();
}