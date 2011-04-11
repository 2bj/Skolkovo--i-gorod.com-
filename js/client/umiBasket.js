// Object umiBasket ===============================================================

// contructor
function umiBasket() {

}

umiBasket.instance = null;

umiBasket.getInstance = function () {
	if(!umiBasket.instance) {
		umiBasket.instance = new umiBasket();
	}
	return umiBasket.instance;
}

// default event handlers
umiBasket.prototype.onAfterAddElement = function (iElementId, iCount) {
	var oButtons = document.getElementsByName("addtobasket_area_" + iElementId);
	for (iI = 0; iI < oButtons.length; iI++) {
		oButtons[iI].innerHTML = "<a href=\"/eshop/basket/\">В корзине " + iCount +
		" шт.</a> | <a href=\"javascript:umiBasket.getInstance().addElement("+iElementId+");\">+1</a>";
	}

	var oAddedItemRows = document.getElementsByName("basketrow_"+iElementId);

	if (!oAddedItemRows.length) {
		// add new row in basket
		var arrTempNewItems = new Array();
		var arrTempNewItemsParents = new Array();
		var oNewRows = document.getElementsByName('basketnewrow');
		var iCountNewRows = oNewRows.length;
		for (iI = oNewRows.length - 1; iI >=0; iI--) {
			arrTempNewItems[iI] = oNewRows[iI].cloneNode(true);

			var oNextObj = oNewRows[iI];
			oNewRows[iI].id = "basketrow_"+iElementId;
			if (oNewRows[iI]) {
				oNewRows[iI].setAttribute("name", "basketrow_"+iElementId, 0);
			}

			arrTempNewItemsParents[iI] = oNextObj.parentNode;
		}

		if (iCountNewRows) {

			var oSelf = this;

			var oControls = document.getElementsByName('cnewitm_id');

			for (iI = oControls.length - 1; iI >= 0; iI--) {
				oControls[iI].id = "citm_"+iElementId+"_id";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_id", 0);
				}
			}

			var oControls = document.getElementsByName('cnewitm_path');
			for (iI = oControls.length - 1; iI >= 0; iI--) {
				oControls[iI].id = "citm_"+iElementId+"_path";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_path", 0);
				}
			}

			var oControls = document.getElementsByName('cnewitm_name');
			for (iI = oControls.length - 1; iI >= 0; iI--) {
				oControls[iI].id = "citm_"+iElementId+"_name";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_name", 0);
				}
			}

			var oControls = document.getElementsByName('cnewitm_price');
			for (iI = oControls.length - 1; iI >= 0; iI--) {
				oControls[iI].id = "citm_"+iElementId+"_price";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_price", 0);
				}

			}

			var oControls = document.getElementsByName('cnewitm_count');
			for (iI = oControls.length - 1; iI >= 0; iI--) {
				var oControl = oControls[iI];
				oControls[iI].id = "citm_"+iElementId+"_count";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_count", 0);
				}

				oControl.onchange = function() {
					oSelf.updateCount(iElementId, this.value);
					return false;
				}
			}

			var oControls = document.getElementsByName('cnewitm_price_total');
			for (iI = oControls.length - 1; iI >= 0; iI--) {
				oControls[iI].id = "citm_"+iElementId+"_price_total";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_price_total", 0);
				}
			}

			var oControls = document.getElementsByName('cnewitm_remove');
			for (iI = oControls.length - 1; iI >= 0; iI--) {
				var oControl = oControls[iI];
				oControls[iI].id = "citm_"+iElementId+"_remove";
				if (oControls[iI]) {
					oControls[iI].setAttribute("name", "citm_"+iElementId+"_remove", 0);
				}

				oControl.onclick = function() {
					oSelf.removeBasketItem(iElementId);
					return false;
				}
			}

			// append saved rows
			for (iI = 0; iI < arrTempNewItems.length; iI++) {
				var oParent = arrTempNewItemsParents[iI];
				if (oParent) {
					oParent.appendChild(arrTempNewItems[iI]);
				}
			}
		}
	}

	this.updateBasket();
}


umiBasket.prototype.onUpdate = function(oBasketInfo) {
	var iI = 0;
	if (oBasketInfo.basket_items.length == 0) {
		var oSbtns = document.getElementsByName('basket-submit');
		for (iI = 0; iI < oSbtns.length; iI++) {
			if (oSbtns[iI].tagName === "INPUT") {
				oSbtns[iI].disabled = 1;
			}
		}
	}
	for (var iJ = 0; iJ < oBasketInfo.basket_items.length; iJ++) {
		var oNextItemInfo = oBasketInfo.basket_items[iJ];

		var oItemRows = document.getElementsByName('basketrow_'+oNextItemInfo.id);

		var oIdsCtrls = document.getElementsByName('citm_'+oNextItemInfo.id+'_id');
		var oNameCtrls = document.getElementsByName('citm_'+oNextItemInfo.id+'_name');
		var oCountCtrls = document.getElementsByName('citm_'+oNextItemInfo.id+'_count');
		var oPriceCtrls = document.getElementsByName('citm_'+oNextItemInfo.id+'_price');
		var oTotalPriceCtrls = document.getElementsByName('citm_'+oNextItemInfo.id+'_price_total');
		var oElementPathCtrls = document.getElementsByName('citm_'+oNextItemInfo.id+'_path');

		for (iI = 0; iI < oItemRows.length; iI++) {
			if (oItemRows[iI].style.display === 'none') {
				oItemRows[iI].style.display = '';
			}
		}

		for (iI = 0; iI < oIdsCtrls.length; iI++) {
			if (oIdsCtrls[iI].tagName === "INPUT") {
				oIdsCtrls[iI].value = oNextItemInfo.id;
			} else {
				oIdsCtrls[iI].innerHTML = oNextItemInfo.id;
			}
		}

		for (iI = 0; iI < oNameCtrls.length; iI++) {
			if (oNameCtrls[iI].tagName === "INPUT") {
				oNameCtrls[iI].value = oNextItemInfo.name;
			} else {
				oNameCtrls[iI].innerHTML = oNextItemInfo.name;
			}
		}

		for (iI = 0; iI < oCountCtrls.length; iI++) {
			if (oCountCtrls[iI].tagName === "INPUT") {
				oCountCtrls[iI].value = oNextItemInfo.count;
			} else {
				oCountCtrls[iI].innerHTML = oNextItemInfo.count;
			}
		}

		for (iI = 0; iI < oTotalPriceCtrls.length; iI++) {
			if (oTotalPriceCtrls[iI].tagName === "INPUT") {
				oTotalPriceCtrls[iI].value = oNextItemInfo.price_total;
			} else {
				oTotalPriceCtrls[iI].innerHTML = oNextItemInfo.price_total;
			}
		}

		for (iI = 0; iI < oPriceCtrls.length; iI++) {
			if (oPriceCtrls[iI].tagName === "INPUT") {
				oPriceCtrls[iI].value = oNextItemInfo.price;
			} else {
				oPriceCtrls[iI].innerHTML = oNextItemInfo.price;
			}
		}

		for (iI = 0; iI < oElementPathCtrls.length; iI++) {
			if (oElementPathCtrls[iI].tagName === "A") {
				oElementPathCtrls[iI].href = oNextItemInfo.element_path;
			} else {
				oElementPathCtrls[iI].innerHTML = oNextItemInfo.element_path;
			}
		}

	}

	var oCartTotalCtrls = document.getElementsByName('order_total');

	for (iI = 0; iI < oCartTotalCtrls.length; iI++) {
		if (oCartTotalCtrls[iI].tagName === "INPUT") {
			oCartTotalCtrls[iI].value = oBasketInfo.order_total;
		} else {
			oCartTotalCtrls[iI].innerHTML = oBasketInfo.order_total;
		}
	}

	var oCartGlobalDiscount = document.getElementsByName('global_discount');

	for (iI = 0; iI < oCartGlobalDiscount.length; iI++) {
		if (oCartGlobalDiscount[iI].tagName === "INPUT") {
			oCartGlobalDiscount[iI].value = oBasketInfo.global_discount;
		} else {
			oCartGlobalDiscount[iI].innerHTML = oBasketInfo.global_discount;
		}
	}


	var oCartTotalCntCtrls = document.getElementsByName('total_count');

	for (iI = 0; iI < oCartTotalCntCtrls.length; iI++) {
		if (oCartTotalCntCtrls[iI].tagName === "INPUT") {
			oCartTotalCntCtrls[iI].value = oBasketInfo.total_count;
		} else {
			oCartTotalCntCtrls[iI].innerHTML = oBasketInfo.total_count;
		}
	}
}

umiBasket.prototype.onAfterRemoveBasketItem = function (iElementId) {
	var oCartRows = document.getElementsByName('basketrow_'+iElementId);
	for (iI = 0; iI < oCartRows.length; iI++) {
		oCartRows[iI].style.display = 'none';
	}
}


umiBasket.prototype.addElement = function(iElementId, iCount) {
	if (typeof(iCount) == "undefined") iCount = 1;
	if (typeof(iElementId) !== 'undefined') {
		var __self = this;
		var hdl = function(oResponce) {
			iElementId = oResponce.iElementId;
			iCount = oResponce.iCount;
			__self.onAfterAddElement(iElementId, iCount);
		}
		lLib.getInstance().makeRequest("/eshop/json_add_to_basket/"+iElementId+"/"+iCount+"/?", hdl);
	}
}

umiBasket.prototype.updateBasket = function() {
	var __self = this;
	var hdl = function(oResponce) {
		__self.onUpdate(oResponce);
	}
	lLib.getInstance().makeRequest('/eshop/json_get_basket/?', hdl);
}

umiBasket.prototype.updateCount = function(iElementId, iCount) {
	if (typeof(iCount) == "undefined") iCount = 1;
	if (typeof(iElementId) !== 'undefined') {
		var __self = this;
		var hdl = function(oResponce) {
			__self.updateBasket();
		}
		lLib.getInstance().makeRequest("/eshop/json_update_count/"+iElementId+"/"+iCount+"/?", hdl);
	}
}



umiBasket.prototype.removeBasketItem = function(iElementId) {
	if (typeof(iElementId) !== "undefined") {
		var __self = this;
		var hdl = function(oResponce) {
			__self.onAfterRemoveBasketItem(iElementId);
			__self.updateBasket();
		}
		lLib.getInstance().makeRequest("/eshop/json_remove_from_basket/"+iElementId+"/?", hdl);
	}
}
