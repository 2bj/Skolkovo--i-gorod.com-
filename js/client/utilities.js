/**
 * Returns current timestamp
 * @return Int
 */
function now() {
	return +new Date;
}
/**
 * JSONP Request
 * @param url
 * @param data 
 * @param callback
 */
var _jsonc = now();
function jsonp(url, data, callback) {
	var head   = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	var callbackName = "jsonp" + _jsonc++;	
	window[ callbackName ] = function(tmp){
		if(callback) callback(tmp);
		window[ callbackName ] = undefined;
		try{ delete window[ callbackName ]; } catch(e){}
		if ( head ) head.removeChild( script );
	};	
	var query  = [];
	for(var i in data) {
		query.push(i + "=" + encodeURIComponent(data[i]));
	}
	script.src = url + (url.indexOf("?") != -1 ? "&" : "?") +
				 query.join("&") + (query.length ? "&" : "") +
				 "json-callback=" + callbackName;
	script.charset = "utf-8";
	head.appendChild(script);
}