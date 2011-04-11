function setCookie(name, value) {document.cookie=name+"="+escape(value)+"; path=/";}

function getCookie(szName) 
{
	szName = szName.replace(/\./g, "_");

	var i = 0;
	var nStartPosition = 0;
	var nEndPosition = 0;  
	var szCookieString = document.cookie;  

	while(i <= szCookieString.length) {
		nStartPosition = i;
		nEndPosition = nStartPosition + szName.length;

		if(szCookieString.substring(nStartPosition,nEndPosition) == szName) {
			nStartPosition = nEndPosition + 1;
			nEndPosition = document.cookie.indexOf(";",nStartPosition);
			if(nEndPosition < nStartPosition) nEndPosition = document.cookie.length;
			return document.cookie.substring(nStartPosition,nEndPosition);
			break;
		}
		i++;  
	}
	return "";
}