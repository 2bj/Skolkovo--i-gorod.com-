function TemplatesDataSet () {
	var templates = null, domains = null, langs = null;
	
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
	
	var loadXml = function () {
		var url = "/admin/content/domainTemplates.xml";
		var xmlRequest = createRequestObject();
		
		var onRequestReady = function () {
			if(xmlRequest.readyState != 4) return;
			if(xmlRequest.status == 200) {
				onLoadXml(xmlRequest);
			} else {
				return false;
			}
		};
		
		xmlRequest.onreadystatechange = onRequestReady;
		xmlRequest.open('GET', url, true);
		xmlRequest.send(null);
	};
	
	var onLoadXml = function (xmlResponse) {
		var xml = xmlResponse.responseXML;
		templates = parseCollection(xml.getElementsByTagName('template'));
		domains = parseCollection(xml.getElementsByTagName('domain'));
		langs = parseCollection(xml.getElementsByTagName('lang'));
	};
	
	var getAttributes = function (node) {
		var result = [];
		result['nodeValue'] = (node.textContent || node.text);
		for(var i = 0; i < node.attributes.length; i++) {
			var attr = node.attributes.item(i);
			result[attr.nodeName] = attr.nodeValue;
		}
		return result;
	};
	
	var parseCollection = function (collection) {
		var result = new Array();
		for(var i = 0; i < collection.length; i++) {
			var item = collection[i];
			var info = getAttributes(item);
			result.push(info);
		}
		return result;
	};
	
	this.getLangsList = function () {
		return langs;
	};
	
	this.getDomainsList = function () {
		return domains;
	};
	
	this.getTemplatesList = function (domainId, langId) {
		if(!domainId && !langId) {
			return templates;
		}
		
		var result = new Array();
		for(var i = 0; i < templates.length; i++) {
			var item = templates[i];
			if(item['domain-id'] == domainId && item['lang-id'] == langId) {
				result.push(item);
			}
		}
		return result;
	};
	
	loadXml();
};

TemplatesDataSet.instance = null;

TemplatesDataSet.getInstance = function () {
    if(!TemplatesDataSet.instance) {
        TemplatesDataSet.instance = new TemplatesDataSet;
    }
    return TemplatesDataSet.instance;
};
