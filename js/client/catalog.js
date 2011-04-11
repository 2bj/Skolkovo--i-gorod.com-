function catalog_addToCompare(type_id, object_id, lobj, cat_id) {
	var i = 0, tmp;
	while(tmp = getCookie("cc_" + type_id + "_" + (++i))) {
		if(tmp == object_id) {
			catalog_renderCompare(type_id);
			return true;
		}
	}
	setCookie("cc_" + type_id + "_" + (i), object_id);
	setCookie("cc_" + type_id + "_id_" + object_id, i);

	catalog_renderCompare(type_id);

	var pNode = lobj.parentNode;
	pNode.removeChild(lobj);

	var res = document.createElement("div");
	res.innerHTML = "<span style='font-size: 10px;'>Добавлено к&nbsp;сравнению</span><br />";

	var cl;
	if(cl = document.getElementById('catalogEarseCompareLink')) {
		var url = "/catalog/compare/" + cat_id + "/";
		var clk = "javascript: showCompareWindow('" + url + "', '" + type_id + "'); return false;";

		res.innerHTML += "(<a href=\"" + url + "\" onclick=\"" + clk + "\" style='font-size: 10px;'><u>Сравнить</u></a>)";
	}

	pNode.appendChild(res);
}

function catalog_delCompare(type_id, object_id) {
	var i = 0, tmp, prev = 0;

	tmp = getCookie("cc_" + type_id + "_id_" + object_id);
	setCookie("cc_" + type_id + "_" + (tmp), -1);
	catalog_renderCompare(type_id);

	return false;
}

function catalog_renderCompare(type_id) {
	var pobj;

	if(pobj = document.getElementById('catalogCompareBlockDiv')) {
		var url = "/catalog/compare_block_render/" + type_id + "/";
		execInternalScript(url);
	} else {
		window.location.reload();
	}
}

function catalog_compareCallback(res) {
	var pobj = document.getElementById('catalogCompareBlockDiv');
	pobj.innerHTML = res;
}

function catalog_earseCompare(type_id) {
	var i = 0;

	while(va = getCookie("cc_" + type_id + "_" + (++i))) {
		setCookie("cc_" + type_id + "_" + i, "");

		if(pobj = document.getElementById('catalogCompareBlockDiv')) {
			var url = "/catalog/compare_block_render/" + type_id + "/";
			execInternalScript(url);
		} else {
			window.location.reload();
		}
	}

}

function eshop_addToCart(item_id) {
//	var url = "/eshop/addToCart/" + item_id + "/";
	var url = "/eshop/json_add_to_cart/" + item_id + "/";
	execInternalScript(url);

	var obj;
	if(obj = document.getElementById('addToCart_txt_' + item_id)) {
		obj.innerHTML = 'Добавлено в&nbsp;корзину' +
		'<br /><a href="/eshop/my_cart/">(В&nbsp;корзину)</a>';
	}
}


function execInternalScript(url) {
	var scriptObj = document.createElement("script");
	scriptObj.src = url;

	var placerObj = document.body.firstChild;

	do {
		if(placerObj.nodeType == 1) {
			placerObj.appendChild(scriptObj);
			break;
		}
	} while(placerObj = placerObj.nextSibling);
}

function catalog_refreshBasket(newTpl) {
	var obj = document.getElementById('eshop_basket');
	if(!obj) return false;
	obj.innerHTML = newTpl;
}

/*
function catalog_renderCompare(type_id) {
	var obj = document.getElementById('catalogCompareBlock');
	if(!obj) return false;
	obj.innerHTML = "";

	var i = 0, object_id;
	while(object_id = getCookie("cc_" + type_id + "_" + (++i))) {
		obj.innerHTML += "<a href='#'>" + object_id + "</a><br />";
	}

}
*/

function eshop_cart_numchange(inpObj) {
	var myId = inpObj.id;
/*
	if(inpObj.value.length == 0) inpObj.value = inpObj.value * 1; else inpObj.value = parseInt(inpObj.value);
	if(inpObj.value > 9999) inpObj.value = 9999;

	var priceObj = document.getElementById('eshop_price_' + myId);
	if(!priceObj) return false;

	var oldValue = parseInt(priceObj.innerHTML);

	var singlePriceObj = document.getElementById('eshop_single_price_' + myId);
	if(!singlePriceObj) return false;

	var newValue = parseInt(inpObj.value) * parseInt(singlePriceObj.innerHTML);
	priceObj.innerHTML = newValue;

	var orderObj = document.getElementById('eshop_order_price');
	if(!orderObj) return false;
	var orderVal = parseInt(orderObj.innerHTML);
	var orderValOld = orderVal;
	orderVal = orderVal - oldValue + newValue;
	orderObj.innerHTML = orderVal;

	var totalObj = document.getElementById('eshop_total_price');
	if(!totalObj) return false;
	
	totalObj.innerHTML = parseInt(totalObj.innerHTML) - orderValOld + orderVal;
*/
	var url = "/eshop/json_update_cart/" + myId + "/" + inpObj.value;
	execInternalScript(url);

/*
	for(i = 0; i < orders.length; i++) {
		
	}
*/

}

function callback_cartUpdate(args) {
	var num, price, obj, item_id;

	for(i = 0; i < orders.length; i++) {
		//alert(args[orders[i]]);
		item_id = orders[i];

		if(!args[item_id]) {
			if(obj = document.getElementById('orderitem_' + item_id)) {
				obj.parentNode.removeChild(obj);
			}

			if(obj = document.getElementById('orderitem_quant_' + item_id)) {
				obj.parentNode.removeChild(obj);
			}
			continue;
		}

		num = args[item_id][0];
		price = args[item_id][1];

		if(obj = document.getElementById('eshop_price_' + item_id)) {
			obj.innerHTML = price;
		}

		if(obj = document.getElementById(item_id)) {
			obj.value = num;
		}
	}

	if(obj = document.getElementById('eshop_total_price')) {
		obj.innerHTML = args['total'];
	}

	if(obj = document.getElementById('eshop_order_price')) {
		obj.innerHTML = args['order_total'];
	}

	if(obj = document.getElementById('eshop_credit_link')) {
		if(args['credit_allowed']) {
			obj.style.display = '';
		} else {
			obj.style.display = 'none';
		}
	}		


	var url = "/eshop/basket_refresh/";
	execInternalScript(url);
}


function eshop_cart_removeRow(item_id) {
	var url = "/eshop/json_basket_del/" + item_id + "/";
	execInternalScript(url);
}


function eshop_cart_save() {
	var formObj = document.forms['eshop_cart_form'];
	formObj.submit();
	return false;
}


function eshop_cart_post() {
	var formObj = document.forms['eshop_cart_form'];
	formObj.action = "/eshop/order_do/";
	formObj.submit();
	return false;

}


function showCompareWindow(url, type_id) {
	var width = 600, height = 700;

//	url += "?";

	var i = 0, tmp;
	while(tmp = getCookie("cc_" + type_id + "_" + (++i))) {
//		url += "&cc_" + type_id + "_" + i + "=" + tmp;
	}

	var win = window.open(url, "_blank", "width=" + (width) + ",height=" + (height) + ",titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
	return false;

}

function eshop_cart_credit() {
	var formObj = document.forms['eshop_cart_form'];
	formObj.action = "/eshop/credit_prepare/";
	formObj.submit();

	return false;
}

function eshop_cart_numchange_prepare(o) {
	var oo = o;
	var cb = function () {
		eshop_cart_numchange(oo);
	}
	if(window.timeout) {
		clearTimeout(window.timeout);
	}
	window.timeout = setTimeout(cb, 500);
}

function eshop_cart_cardnumchange(o) {
	var url = "/eshop/json_update_dcard/" + o.value + "/";
	execInternalScript(url);
}

function callback_cardnumUpdate(arg) {
	var obj;
	if(obj = document.getElementById('eshop_dcard_discount')) {
		obj.innerHTML = arg + '%';
	}
}

function eshop_cart_cardnumchange_prepare(o) {
	var oo = o;
	var cb = function () {
		eshop_cart_cardnumchange(oo);
	}

	if(window.timeout1) {
		clearTimeout(window.timeout1);
	}

	window.timeout = setTimeout(cb, 500);
}