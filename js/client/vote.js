var last_src = "";


function cms_vote_postDo(formName, inputName, nstext) {
	var fObjColl = document.getElementsByName(formName);

	var fObj = '';
	if (fObjColl) {
		fObj = fObjColl[fObjColl.length-1];
	}

	if(typeof(fObj) !== "object") return false;
	
	iObj = fObj.elements[inputName];
	
	if(typeof(iObj) === "undefined") return false;

	res = false;
	for(i = 0; i < iObj.length; i++)
		if(iObj[i].checked)
			res = iObj[i].value;


	if(res) {
		sc = document.createElement("script");
		sc.src = "/vote/post/" + res + "/?m=" + new Date().getTime();
		oTemplate = fObj.elements['system_template'];
		if((oTemplate instanceof Object) && (oTemplate.value.length)) {		
			sc.src = sc.src + "&template="+oTemplate.value;			
		}

		fObj.appendChild(sc);
	} else {
		if(nstext) {
			alert(nstext);
		}
	}
}

function rateElement(element_id, num) {
	lLib.getInstance().makeRequest("/vote/json_rate/" + element_id + "/" + num + "/", function() {} );
}
