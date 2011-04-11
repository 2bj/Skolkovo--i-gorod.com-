(function() {
	tinymce.PluginManager.requireLangPack('imagemanager');
	tinymce.create('tinymce.plugins.ImageManagerPlugin', {
		init : function(ed, url) {
			this.editor = ed;
			this.url    = url;
			var imp = new ImageManagerPanel(ed);
			ed.addCommand('umiToggleImageManager', function() {
				var active = imp.toggle();
				ed.controlManager.setActive('imagemanager', active);
			});
			ed.addButton('imagemanager', {
				title : 'imagemanager.toggle_btn',
				cmd   : 'umiToggleImageManager'
			});			
			$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+url+"/css/imagemanager.css\"  />");
		},
		createControl : function(n, cm) {
			return null;
		},
		getInfo : function() {
			return {
				longname  : 'Image manager plugin',
				author    : 'Leeb, Realloc',
				authorurl : 'http://umi-cms.ru/',
				infourl   : 'http://umi-cms.ru/',
				version   : '2.0'
			};
		}
	});
	tinymce.PluginManager.add('imagemanager', tinymce.plugins.ImageManagerPlugin);
})();

/**
 *
 */
function ImageManagerPanel(__editor) {
	var self   = this;
	var editor  = __editor;
	var panel   = null;
	var visible = false;
	var pathControl = null;
	var scrollSpeed = 0;
	var __construct = function() {
		// Nothing to do
	};
	var initPanel = function() {		
		var container = editor.getContainer();
		panel = $("<div class=\"imanager\"></div>");		
		panel.css({display : "none"});
		panel.prependTo(container);
		pathControl = new ImageManagerPath({selectCallback : onPathSelect, container : panel.get(0)});
		panel.append('<div class="container">\
						<a class="scroll-right"></a>\
						<a class="scroll-left"></a>\
						<div class="wrapper" id="mce_editor_0_wrap">\
							<ul class="igallery"></ul>\
							<div class="del" style="left:105px; top:14px; display:none;"></div>\
						</div>\
						<div class="add-image"></div>\
					  </div>\
					  <div class="upload_image" style="display:none;">\
						<form method="post" enctype="multipart/form-data" target="'+editor.id+'imgmgr_upload">\
						<div class="button">\
							<input type="submit" value="Загрузить" />\
							<span class="l"></span>\
							<span class="r"></span>\
						</div>\
						<label for="upload-image">Загрузить картинку\
							<input type="file" name="Filedata" />\
						</label>\
						</form>\
						<iframe id="'+editor.id+'imgmgr_upload" name="'+editor.id+'imgmgr_upload" style="display:none" />\
					 </div>');
		var wrapper = $("div.wrapper", panel);
		var scrollDir   = 0;
		var timerId     = null;
		var doScroll = function() {
			if(Math.abs(scrollSpeed) < 30) {
				scrollSpeed = scrollSpeed + scrollDir*2;
			}
			wrapper.scrollLeft( wrapper.scrollLeft() + scrollSpeed );
			if(scrollSpeed == 0) {
				clearInterval(timerId);
			}
			if(scrollDir == 0) {
				if(scrollSpeed > 0)
					scrollSpeed = Math.floor( scrollSpeed * 0.8 );
				else
					scrollSpeed = Math.ceil( scrollSpeed * 0.8 );
			}
		};
		$("a.scroll-left", panel).mouseenter(function(){
			timerId   = setInterval(doScroll, 50);
			scrollDir = -1;
		}).mouseleave(function(){
			scrollDir = 0;
		});
		$("a.scroll-right", panel).mouseenter(function(){
			timerId   = setInterval(doScroll, 50);
			scrollDir = 1;
		}).mouseleave(function(){
			scrollDir = 0;
		});
		$("div.del", panel).click(function(){ 
									var panelItem = $(this).attr('panelItem');
									editor.windowManager.confirm(editor.getLang('imagemanager.lbl_remove_img_title'), function(s){if(s)removeImage(panelItem); });
									$(this).hide();
								})
		                   .mouseover(function(){ $(this).show(); })
						   .mouseleave(function(){ $(this).hide(); });		
		$("form", panel).submit(function() {
			$("iframe#"+editor.id+"imgmgr_upload", panel).one('load', {}, function(){
				var list = $("div.wrapper ul", panel);
				var path = $("udata", this.contentDocument).attr("folder") + "/";
				var file = $("file", this.contentDocument);
				if(file.size()) {
					addImage( file, path, list, true );
				} else {
					editor.windowManager.alert(editor.getLang('imagemanager.lbl_upload_error'));
				}
				$("form input[type=submit]", panel).attr("disabled", false);
			});
			$(this).attr("action", "/admin/data/uploadfile/?imagesOnly&folder="+base64encode(pathControl.getPath()));
			$("input[type=submit]", this).attr("disabled", true);
		});
		$("div.add-image", panel).click(function(){ $("div.upload_image", panel).toggle(); });
		self.loadFolder("/images");
	};
	var onPathSelect = function(__path) {
		self.loadFolder(__path);
	};
	this.loadFolder = function(path) {
		$.get("/admin/data/getfilelist/",
		     {
				 folder : base64encode(path),
				 showOnlyImages : true
			 }, updateImageList );		
	};
	var removeImage = function(panelItem) {
		panelItem.remove();
		var info = $("img", panelItem).attr("information");
		$.get("/admin/data/deletefiles/",
			  {
				  folder     : base64encode(info.img_path.substr(0, info.img_path.length-1)  ),
				  "delete[]" : base64encode(info.img_name),
				  "nolisting": true
			  });
	}
	var addImage = function(file, path, list, bindEvents){
		//var file = $(this);
		var name = file.attr('name');
		var basename  = name.substr(0, name.lastIndexOf('.'));
		var extension = file.attr('type');
		var thumb     = '/autothumbs.php?img=' + path + basename + '_sl_90_60.' + extension;
		var width     = file.attr('width');
		var height    = file.attr('height');
		var item = $('<li class="image">\
						<img class="panel_item" title="Перетащите изображение в редактор" src="' + thumb + '"/>\
						<div class="name" title="' + file.attr('mime') + ', ' + width + 'x' + height + 'px, ' + file.attr('converted-size') + '">' + name + '</div>\
					  </li>');
		var info = {
			img_name    : name,
			img_path    : path,
			img_src     : thumb,
			img_width   : 90,
			img_height  : 60,

			img_base    : '/autothumbs.php?img=' + path + basename,
			img_ext     : extension,

			orig_src    : path + name,
			orig_width  : width,
			orig_height : height
		};
		$("img", item).get(0).information = info;
		list.append(item);
		if(bindEvents) {
			$("img", item).mouseenter(function() {
				if(scrollSpeed !== 0) return;
				var button   = $("div.del", panel);
				var position = $(this).offset();
				var _left    = position.left + 43;
				if(_left < button.parent().width()) {
					button.css({left :  _left});
					button.get(0).panelItem = $(this).parent();
					button.show();
				}
			}).mouseleave(function() {
				$("div.del", panel).hide();
			}).draggable({
				helper : 'clone',
				revert : 'invalid'}).disableSelection();
		}
	}
	var updateImageList = function(r) {
		var list = $("div.wrapper ul", panel);
		var path = $("udata", r).attr("folder") + "/";
		list.html("");
		$("file", r).each(function(){ addImage( $(this), path, list ); });
		$("div.wrapper img", panel).mouseenter(function() {
			if(scrollSpeed !== 0) return;
			var button   = $("div.del", panel);
			var position = $(this).offset();
			var _left    = position.left + 43;
			if(_left < button.parent().width()) {
				button.css({left :  _left});
				button.get(0).panelItem = $(this).parent();
				button.show();
			}
		}).mouseleave(function() {
			$("div.del", panel).hide();
		}).draggable({
			helper : 'clone',
			revert : 'invalid'}).disableSelection();
		$("iframe", editor.getContainer()).droppable({
			accept : '#' + editor.getContainer().id + " div.wrapper img",
			drop   : function(ev, ui) {
						editor.windowManager.open({
							file   : editor.plugins.imagemanager.url + '/sizedialog.htm',
							width  : 400,
							height : 190,
							inline : 1
						}, $(ui.draggable).attr('information'));
				     }
		});
	};
	/**
	 * Toggles visibility
	 * @return boolean current visibility state
	 */
	this.toggle = function() {
		if(!panel) {
			initPanel();
		}
		visible = !visible;
		$(panel).slideToggle(0);

		return visible;
	};
	__construct();
}
/**
 *
 */
function ImageManagerPath(options) {	
	var container = options.container || null;
	var callback  = options.selectCallback || null;
	var list      = null;
	var subfolders = null;
	var items     = [];
	var path      = [];
	var cache     = {};
	var __construct = function() {
		subfolders = document.createElement("ul");
		subfolders.className = "subfoldersMenu";
		subfolders.style.display = "none";
		document.body.appendChild(subfolders);
		list = document.createElement("ul");
		list.className = "insets";
		container.appendChild(list);
		var root = createPathElement("Изображения", "images");
		list.appendChild(root);		
	};
	var createPathElement = function(name, relativePath) {		
		var item = $("<li><a href=\"javascript:void(0);\">" + name + "</a><span /></li>");
		if(!items.length) {
			item.addClass("first");
		}
		items.push(item);
		path.push(relativePath || name);
		$("a", item).click(function() {
			reduceToItem(item);
			callback("/" + path.join("/"));
		});
		$("span", item).click(function(event) {
			event.stopPropagation();
			if(!$(this).hasClass("active") || $(subfolders).css("display") == "none") {
				var pathString   = getItemPath(item);
				$("span.active", list).removeClass("active");
				$(this).addClass("active");
				updateSubfolders(pathString, item);
			} else {
				hideSubfolders();
				$(this).removeClass("active");				
			}
		});
		return item.get(0);
	};
	var updateSubfolders = function(_pathString, _item) {
		if(cache[_pathString] instanceof Array) {
			var span = $("span", _item);
			if(!cache[_pathString].length) {
				span.hide();
				return;
			}
			var pos  = span.offset();
			var _top  = pos.top + span.height();
			var _left = pos.left;
			$(subfolders).html(
				$.map(cache[_pathString], function(n){ return "<li>" + n + "</li>"; } ).join("")
			);
			showSubfolders();
			$(subfolders).css({position : "absolute",
			                   "z-index": 1000,
				               top      : _top  + "px",
				               left     : _left + "px"});
			$("li", subfolders).click(function(event) {
				reduceToItem(_item);
				var li = $(this);
				var el = createPathElement(li.text());				
				list.appendChild(el);
				hideSubfolders();
				span.removeClass("active");
				callback("/" + path.join("/"));
				event.stopPropagation();
			});
			$("li", subfolders).mouseenter(function(){ $(this).addClass("highlighted"); });
			$("li", subfolders).mouseleave(function(){ $(this).removeClass("highlighted"); });
		} else {
			$.get("/admin/data/getfolderlist/", {folder : base64encode(_pathString)},
				  function(r) {
					  var folders = $("folder", r);
					  cache[_pathString] = [];
					  for(var i=0; i<folders.length; i++) {
						  cache[_pathString].push( $(folders[i]).attr("name") );
					  }
					  updateSubfolders(_pathString, _item);
				  });
		}
	};
	var reduceToItem = function(item) {
		while(items.length && items[items.length-1] != item) {
			items.pop().remove();
			path.pop();
		}
	};
	var getItemPath = function(item) {
		var index = $.inArray(item, items);
		if(index != -1) {
			return "/" + path.slice(0, index+1).join("/");
		} else {
			return "/" + path.join("/");
		}
	};
	var showSubfolders = function() {
		$(subfolders).css("display", "block");
		$(document).bind("click", documentClickHandler);
	};
	var hideSubfolders = function() {
		$(subfolders).css("display", "none");
		$(document).unbind("click", documentClickHandler);		
	};
	var documentClickHandler = function() {
		$("span.active", list).removeClass("active");
		hideSubfolders();
	};
	this.getPath = function() {
		return "/" + path.join("/");
	};
	// Init
	__construct();
}