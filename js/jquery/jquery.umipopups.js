/**
 * Based on jmpopups (http://jmpopups.googlecode.com/)
 */

var UMIPopupSkin =
"<div class=\"eip_win_head popupHeader\" onmousedown=\"jQuery('.eip_win').draggable({containment: 'document'})\">\n\
	<div class=\"eip_win_close popupClose\" onclick=\"javascript:jQuery.closePopupLayer()\">&#160;</div><div class=\"eip_win_title\">%title%</div>\n\
</div>\n\
<div class=\"eip_win_body popupBody\" onmousedown=\"jQuery('.eip_win').draggable('destroy')\">\n\
	%content%\n\
</div>";

var denyFrameId = "SiteFrame";

(function($) {
	var openedPopups = [];
	var popupLayerScreenLocker = false;
	var focusableElement = [];
	var setupJqueryMPopups = {
		screenLockerBackground: "#000",
		screenLockerOpacity: "0.5"
	};

	$.setupUMIPopups = function(settings) {
		setupJqueryMPopups = jQuery.extend(setupJqueryMPopups, settings);
		return this;
	}

	$.openPopupLayer = function(settings) {
		if (typeof(settings.name) != "undefined" && !checkIfItExists(settings.name)) {
			settings = jQuery.extend({
				width: "auto",
				height: "auto",
				parameters: {},
				target: "",
				data  : "",
				title : "",
				closeable : true,
				success: function() {},
				error: function() {},
				beforeClose: function() {},
				afterClose: function() {},
				reloadSuccess: null,
				cache: false
			}, settings);
			loadPopupLayerContent(settings, true);
			return this;
		}
	}
	
	$.closePopupLayer = function(name, returnValue) {
		if (name) {
			for (var i = 0; i < openedPopups.length; i++) {
				if (openedPopups[i].name == name) {
					var thisPopup = openedPopups[i];
					
					openedPopups.splice(i,1)
					
					thisPopup.beforeClose(returnValue);

					$("#popupLayer_" + name).fadeOut(function(){
						$("#popupLayer_" + name).remove();
					
						focusableElement.pop();
	
						if (focusableElement.length > 0) {
							$(focusableElement[focusableElement.length-1]).focus();
						}
	
						thisPopup.afterClose(returnValue);
						hideScreenLocker(name);
					});
					break;
				}
			}
		} else {
			if (openedPopups.length > 0) {
				$.closePopupLayer(openedPopups[openedPopups.length-1].name, returnValue);
			}
		}
		
		return this;
	}
	
	$.reloadPopupLayer = function(name, callback) {
		if (name) {
			for (var i = 0; i < openedPopups.length; i++) {
				if (openedPopups[i].name == name) {
					if (callback) {
						openedPopups[i].reloadSuccess = callback;
					}
					
					loadPopupLayerContent(openedPopups[i], false);
					break;
				}
			}
		} else {
			if (openedPopups.length > 0) {
				$.reloadPopupLayer(openedPopups[openedPopups.length-1].name);
			}
		}
		
		return this;
	}

	function setScreenLockerSize() {
		if (popupLayerScreenLocker) {
			$('#popupLayerScreenLocker').height($(document).height() + "px");
			$('#popupLayerScreenLocker').width($(document.body).outerWidth(true) + "px");
		}
	}
	
	function checkIfItExists(name) {
		if (name) {
			for (var i = 0; i < openedPopups.length; i++) {
				if (openedPopups[i].name == name) {
					return true;
				}
			}
		}
		return false;
	}
	
	function showScreenLocker() {
		if ($("#popupLayerScreenLocker").length) {
			if (openedPopups.length == 1) {
				popupLayerScreenLocker = true;
				setScreenLockerSize();
				$('#popupLayerScreenLocker').fadeIn();
			}
   
			if ($.browser.msie && $.browser.version < 7) {
				$("select:not(.hidden-by-jmp)").addClass("hidden-by-jmp hidden-by-" + openedPopups[openedPopups.length-1].name).css("visibility","hidden");
			}
			if (frameElement && frameElement.id!=denyFrameId) {
				window.parent.$('#popupLayerScreenLocker').css("z-index",parseInt(openedPopups.length == 1 ? 999 : window.parent.$("#popupLayer_" + openedPopups[openedPopups.length - 2].name).css("z-index")) + 1);
			}
			else {
				$('#popupLayerScreenLocker').css("z-index",parseInt(openedPopups.length == 1 ? 999 : $("#popupLayer_" + openedPopups[openedPopups.length - 2].name).css("z-index")) + 1);
			}
		} else {
			$("body").append("<div id='popupLayerScreenLocker'><!-- --></div>");
			$("#popupLayerScreenLocker").css({
				position: "absolute",
				background: setupJqueryMPopups.screenLockerBackground,
				left: "0",
				top: "0",
				opacity: setupJqueryMPopups.screenLockerOpacity,
				display: "none"
			});
			showScreenLocker();
			/*
            $("#popupLayerScreenLocker").click(function() {
                $.closePopupLayer();
            });
			*/
		}
	}
	
	function hideScreenLocker(popupName) {
		if (openedPopups.length == 0) {
			screenlocker = false;
			//$('#popupLayerScreenLocker').fadeOut();
			$('#popupLayerScreenLocker').hide();
		} else {
			$('#popupLayerScreenLocker').css("z-index",parseInt($("#popupLayer_" + openedPopups[openedPopups.length - 1].name).css("z-index")) - 1);
		}
   
		if ($.browser.msie && $.browser.version < 7) {
			$("select.hidden-by-" + popupName).removeClass("hidden-by-jmp hidden-by-" + popupName).css("visibility","visible");
		}
	}
	
	function setPopupLayersPosition(popupElement, animate) {
		if (popupElement) {
			var windowPopup  = (frameElement && frameElement.id!=denyFrameId) ? window.parent : window;
			var leftPosition = (windowPopup.document.documentElement.offsetWidth - popupElement.width()) / 2;
			var windowHeight = windowPopup.innerHeight || windowPopup.document.documentElement.offsetHeight;
			var topPosition  = $(windowPopup.document.documentElement).scrollTop() || $(windowPopup.document).scrollTop();
			topPosition      = topPosition + (windowHeight - popupElement.height()) / 2;
           
			var positions = {
				left: leftPosition + "px",
				top: topPosition + "px"
			};

			if (!animate) {
				popupElement.css(positions);
			} else {
				//popupElement.animate(positions, "slow");
				popupElement.css(positions);
			}
			setScreenLockerSize();
		} else {
			for (var i = 0; i < openedPopups.length; i++) {
				setPopupLayersPosition(((frameElement && frameElement.id!=denyFrameId) ? window.parent.$("#popupLayer_" + openedPopups[i].name) : $("#popupLayer_" + openedPopups[i].name)), false);
			}
		}
	}

    function showPopupLayerContent(popupObject, newElement, data) {
        var idElement = "popupLayer_" + popupObject.name;

		if (newElement) {
			showScreenLocker();
			if (!frameElement || frameElement.id==denyFrameId) {
				$("body").append("<div id='" + idElement + "' class='eip_win'><!-- --></div>");
				var popupElement = $("#" + idElement);
				var zIndex = parseInt(openedPopups.length == 1 ? 400000 : $("#popupLayer_" + openedPopups[openedPopups.length - 2].name).css("z-index")) + 2;
			}
			else {
				var parent_body = $(frameElement).parents("body");
				var popupElement = document.createElement("div");
				popupElement.id = idElement;
				popupElement.className = 'eip_win';
				parent_body[0].appendChild(popupElement);
				popupElement = $(popupElement);
				var zIndex = parseInt(openedPopups.length == 1 ? 400000 : window.parent.$("#popupLayer_" + openedPopups[openedPopups.length - 2].name).css("z-index")) + 2;
			}
		}
		else {
			var popupElement = $("#" + idElement);
			var zIndex = popupElement.css("z-index");
		}

		popupElement.css({
			"z-index": zIndex
		});

		if (popupObject.width != "auto") popupElement.css("width", (popupObject.width + 40) + "px");
		if (popupObject.height != "auto") popupElement.css("height", (popupObject.height + 40) + "px");

		var linkAtTop = "<a href='#' class='jmp-link-at-top' style='position:absolute; left:-9999px; top:-1px;'>&nbsp;</a><input class='jmp-link-at-top' style='position:absolute; left:-9999px; top:-1px;' />";
		var linkAtBottom = "<a href='#' class='jmp-link-at-bottom' style='position:absolute; left:-9999px; bottom:-1px;'>&nbsp;</a><input class='jmp-link-at-bottom' style='position:absolute; left:-9999px; top:-1px;' />";

		if(popupObject.target == "" && popupObject.data == "") {
			var style = "";
			if (popupObject.width != "auto") style = style + "width:" + popupObject.width + "px;";
			if (popupObject.height != "auto") style = style + "height:" + popupObject.height + "px;";
			if (style.length) style = "style='" + style + "'";
			var content = "<iframe class='umiPopupFrame' frameborder='0' "+style+" src='"+popupObject.url+"'></iframe>";
			data = UMIPopupSkin.replace('%title%', popupObject.title).replace('%content%', content);
		}

		popupElement.html(linkAtTop + data + linkAtBottom);

		if(popupObject.url && popupObject.url.indexOf('umifilebrowser') != -1) {
			$("div.popupBody", popupElement).css("padding" , "0px");
			popupElement.css("width", popupObject.width + "px");
		}
		
		setPopupLayersPosition(popupElement, false);

        popupElement.css("display","none");
        popupElement.css("visibility","visible");
		
		if (newElement) {
        		//popupElement.fadeIn();
			popupElement.show();
		} else {
			popupElement.show();
		}

        $("#" + idElement + " .jmp-link-at-top, " +
		  "#" + idElement + " .jmp-link-at-bottom").focus(function(){
			$(focusableElement[focusableElement.length-1]).focus();
		});
		
		var jFocusableElements = $("#" + idElement + " a:visible:not(.jmp-link-at-top, .jmp-link-at-bottom), " +
								   "#" + idElement + " *:input:visible:not(.jmp-link-at-top, .jmp-link-at-bottom)");
						   
		if (jFocusableElements.length == 0) {
			var linkInsidePopup = "<a href='#' class='jmp-link-inside-popup' style='position:absolute; left:-9999px;'>&nbsp;</a>";
			popupElement.find(".jmp-link-at-top").after(linkInsidePopup);
			focusableElement.push($(popupElement).find(".jmp-link-inside-popup")[0]);
		} else {
			jFocusableElements.each(function(){
				if (!$(this).hasClass("jmp-link-at-top") && !$(this).hasClass("jmp-link-at-bottom")) {
					focusableElement.push(this);
					return false;
				}
			});
		}
		
		$(focusableElement[focusableElement.length-1]).focus();

		popupObject.success();
		
		if (popupObject.reloadSuccess) {
			popupObject.reloadSuccess();
			popupObject.reloadSuccess = null;
		}
	}

	$.pushPopup = function(popupObject) {
		openedPopups.push(popupObject);
	}

	$.getOpenedPopups = function() {
		return openedPopups;
	}

	if(frameElement && frameElement.id!=denyFrameId) openedPopups = window.parent.$.getOpenedPopups();

	function loadPopupLayerContent(popupObject, newElement) {
		if (newElement) {
			if (!frameElement || frameElement.id==denyFrameId) $.pushPopup(popupObject);
			else window.parent.$.pushPopup(popupObject);
		}

		if(popupObject.data != "") {
			showPopupLayerContent(popupObject, newElement, popupObject.data);
		} else if (popupObject.target != "") {
            showPopupLayerContent(popupObject, newElement, $("#" + popupObject.target).html());
        } else {
			showPopupLayerContent(popupObject, newElement, "");
		}
	}
	
	$(window).resize(function(){
		setScreenLockerSize();
		setPopupLayersPosition();
	});
	
	$(document).keydown(function(e){
		if (e.keyCode == 27) {
			if(openedPopups.length && openedPopups[openedPopups.length-1].closeable)
				$.closePopupLayer();
		}
	});
})(jQuery);