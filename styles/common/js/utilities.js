//-------------------------------------------------------------------------
// Transliteration functions
//-------------------------------------------------------------------------
var rus2eng   = {"А":"A", "Б":"B", "В":"V", "Г":"G", "Д":"D", "Е":"E", "Ё":"YO", "Ж":"ZH", "З":"Z", "И":"I", "Й":"J", "К":"K", "Л":"L", "М":"M", "Н":"N", "О":"O", "П":"P", "Р":"R", "С":"S", "Т":"T", "У":"U", "Ф":"F", "Х":"H", "Ц":"C", "Ч":"CH", "Ш":"SH", "Щ":"W", "Ъ":"", "Ы":"Y", "Ь":"", "Э":"E", "Ю":"YU", "Я":"YA",
				 "а":"a", "б":"b", "в":"v", "г":"g", "д":"d", "е":"e", "ё":"yo", "ж":"zh", "з":"z", "и":"i", "й":"j", "к":"k", "л":"l", "м":"m", "н":"n", "о":"o", "п":"p", "р":"r", "с":"s", "т":"t", "у":"u", "ф":"f", "х":"h", "ц":"c", "ч":"ch", "ш":"sh", "щ":"w", "ъ":"", "ы":"y", "ь":"", "э":"e", "ю":"yu", "я":"ya"};
var eng2rus   = {"А":"A", "YA":"Я"};
var rus2engRE = /(?:[А-Яа-я])/g;
var eng2rusRE = /(?:YA|A)/g; 

function trCallbackRu(str){
        return rus2eng[str];
}
function trCallbackEn(str){
        return eng2rus[str];
}

/**
 * Transliterate russian string
 * @param str string to transliterate
 * @return String
 */
function transliterateRu(str) {
	return str.replace(rus2engRE, trCallbackRu);
}

/**
 * Transliterate romanian string to russain
 * @param str string to transliterate
 * @return String
 */
function transliterateEn(str) {
	return str; // ToDo: write proper regexp
}

/**
 * Encode string to base64
 * @param str string to encode
 * @return String base64 encoded string
 */
function base64encode(str) {
		var sWinChrs     = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя';
		var sBase64Chrs  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		var arrBase64    = sBase64Chrs.split('');

		var a = new Array();
		var i = 0;
		for(i = 0; i < str.length; i++) {
			var cch = str.charCodeAt(i);
			if (cch > 127) {
				cch = sWinChrs.indexOf(str.charAt(i)) + 163;
				if(cch < 163) continue;
			}
			a.push(cch);
		}
		var s    = new Array();
		var lPos = a.length - a.length % 3;
		var t = 0;
		for (i=0; i<lPos; i+=3) {
			t = (a[i]<<16) + (a[i+1]<<8) + a[i+2];
			s.push(arrBase64[(t>>18)&0x3f] + arrBase64[(t>>12)&0x3f] + arrBase64[(t>>6)&0x3f] + arrBase64[t&0x3f] );
		}
		switch (a.length-lPos) {
			case 1 : 
					t = a[lPos]<<4;
					s.push(arrBase64[(t>>6)&0x3f] + arrBase64[t&0x3f] + '==');
					break;
			case 2 : 
					t = (a[lPos]<<10)+(a[lPos+1]<<2);
					s.push(arrBase64[(t>>12)&0x3f] + arrBase64[(t>>6)&0x3f] + arrBase64[t&0x3f] + '=');
					break;
		}
		return s.join('');
}

//-------------------------------------------------------------------------
// Cookie helpers
//-------------------------------------------------------------------------

var parsedCookies = null;

/**
 * Set cookie value
 * @param name cookie name
 * @param value cookie value
 * @param expires cookie expire time in seconds
 */
function setCookie(name, value, expires) {
	var e = "";
	if (expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires);
			e = "; expires=" + d.toGMTString();
	}
	if(value === null) {
		e = "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
	document.cookie = name + "=" + value + e + "; path=/";
	if(parsedCookies) {
		if(value != null)
			parsedCookies[name] = value;
		else
			delete parsedCookies[name];
	}
}

/**
 * Get cookie value
 * @param name cookie name
 * @return string cookie value
 */
function getCookie(name) {
	if(!parsedCookies) {
		parsedCookies = {};
		var pairs = document.cookie.split(";");
		for(var i=0; i<pairs.length; i++) {
			var pair = pairs[i].split("=");
			parsedCookies[ pair[0].replace(/^\s/, "") ] = pair[1];
		}
	}
	return parsedCookies[name] || null;
}