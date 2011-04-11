<?php
 abstract class __admin_tags_cloud_stat extends baseModuleAdmin {public function tags_cloud() {$v5000ce979d5622b062ccb203d911c6d7 = 28;$v912ea8aaca8c737b7213e487f231bf68 = 8;$v9549dd6065d019211460c59a86dd6536 = new statisticFactory(dirname(__FILE__) . '/classes');$v9549dd6065d019211460c59a86dd6536->isValid('allTags');$ve98d2f001da5678b39482efbdf5770dc = $v9549dd6065d019211460c59a86dd6536->get('allTags');$ve98d2f001da5678b39482efbdf5770dc->setDomain($this->domain);$ve98d2f001da5678b39482efbdf5770dc->setUser($this->user);$ve98d2f001da5678b39482efbdf5770dc->setStart($this->from_time);$ve98d2f001da5678b39482efbdf5770dc->setFinish($this->to_time);$result = $ve98d2f001da5678b39482efbdf5770dc->get();$v2ffe4e77325d9a7152f7086ea7aa5114 = $result['max'];$v1d623b89683f9ce4e074de1676d12416 = $result['sum'];$v980da98409d058c365664ff7ea33dd6b = Array();$v7dabf5c198b0bab2eaa42bb03a113e55 = sizeof($result['labels']);for($v865c0c0b4ab0e063e5caa3387c1a8741 = 0;$v865c0c0b4ab0e063e5caa3387c1a8741 < $v7dabf5c198b0bab2eaa42bb03a113e55;$v865c0c0b4ab0e063e5caa3387c1a8741++) {$vd304ba20e96d87411588eeabac850e34 = $result['labels'][$v865c0c0b4ab0e063e5caa3387c1a8741];$vb80bb7740288fda1f201890375a60c8f  = $vd304ba20e96d87411588eeabac850e34['id'];$ve4d23e841d8e8804190027bce3180fa5 = $vd304ba20e96d87411588eeabac850e34['tag'];$v2817f701d5e1a1181e657251363295fd = $vd304ba20e96d87411588eeabac850e34['cnt'];$vc4db0b59ed68b4b2952fa7303e78a56e = ceil(($v5000ce979d5622b062ccb203d911c6d7 - $v912ea8aaca8c737b7213e487f231bf68) * ($v2817f701d5e1a1181e657251363295fd / $v2ffe4e77325d9a7152f7086ea7aa5114)) + $v912ea8aaca8c737b7213e487f231bf68;$v6844acdce7e192c21c184914d73ab6be = round($v2817f701d5e1a1181e657251363295fd * 100 / $v1d623b89683f9ce4e074de1676d12416, 1);$v980da98409d058c365664ff7ea33dd6b[] = array('attribute:id' => $vb80bb7740288fda1f201890375a60c8f,                                 'attribute:weight' => $v6844acdce7e192c21c184914d73ab6be,                                  'attribute:fontweight' =>$vc4db0b59ed68b4b2952fa7303e78a56e,                                  'node:name' => $ve4d23e841d8e8804190027bce3180fa5);}return (!empty($v980da98409d058c365664ff7ea33dd6b)) ? array('nodes:tag' => $v980da98409d058c365664ff7ea33dd6b) :                                       array('nodes:message' => array( array('node:name' => getLabel('message-no-tags')) ) );}public function get_tags_cloud() {$vb80bb7740288fda1f201890375a60c8f = getRequest('param0');$v7187c106a7011e925de9c5071e929c6f = isset($_GET['exist']) ? explode(',', $_GET['exist']) : false;if($v7187c106a7011e925de9c5071e929c6f !== false) array_walk($v7187c106a7011e925de9c5071e929c6f, 'trim');$v5000ce979d5622b062ccb203d911c6d7 = 18;$v912ea8aaca8c737b7213e487f231bf68 = 6;$vac5c74b64b4b8352ef2f181affb5ac2a = <<<SQL
SELECT varchar_val AS `tag`, COUNT(*) AS `cnt` FROM cms3_object_content WHERE field_id = 8837 AND varchar_val IS NOT NULL GROUP BY varchar_val;
SQL;   $v64bc6a1e5375a5043bc2422a10dfb93d = l_mysql_query($vac5c74b64b4b8352ef2f181affb5ac2a);$result = Array();$v2ffe4e77325d9a7152f7086ea7aa5114 = 0;$v1d623b89683f9ce4e074de1676d12416 = 0;while($vf1965a857bc285d26fe22023aa5ab50d = mysql_fetch_assoc($v64bc6a1e5375a5043bc2422a10dfb93d)) {$result[] = $vf1965a857bc285d26fe22023aa5ab50d;$v1d623b89683f9ce4e074de1676d12416 += $vf1965a857bc285d26fe22023aa5ab50d['cnt'];if($vf1965a857bc285d26fe22023aa5ab50d['cnt'] > $v2ffe4e77325d9a7152f7086ea7aa5114) {$v2ffe4e77325d9a7152f7086ea7aa5114 = $vf1965a857bc285d26fe22023aa5ab50d['cnt'];}}$v980da98409d058c365664ff7ea33dd6b = Array();$v7dabf5c198b0bab2eaa42bb03a113e55 = sizeof($result);for($v865c0c0b4ab0e063e5caa3387c1a8741 = 0;$v865c0c0b4ab0e063e5caa3387c1a8741 < $v7dabf5c198b0bab2eaa42bb03a113e55;$v865c0c0b4ab0e063e5caa3387c1a8741++) {$vd304ba20e96d87411588eeabac850e34 = $result[$v865c0c0b4ab0e063e5caa3387c1a8741];$ve4d23e841d8e8804190027bce3180fa5 = $vd304ba20e96d87411588eeabac850e34['tag'];$v2817f701d5e1a1181e657251363295fd = $vd304ba20e96d87411588eeabac850e34['cnt'];$vc4db0b59ed68b4b2952fa7303e78a56e = ceil(($v5000ce979d5622b062ccb203d911c6d7 - $v912ea8aaca8c737b7213e487f231bf68) * ($v2817f701d5e1a1181e657251363295fd / $v2ffe4e77325d9a7152f7086ea7aa5114)) + $v912ea8aaca8c737b7213e487f231bf68;$v6844acdce7e192c21c184914d73ab6be  = round($v2817f701d5e1a1181e657251363295fd * 100 / $v1d623b89683f9ce4e074de1676d12416, 1);$v980da98409d058c365664ff7ea33dd6b[] = "<a href=\"javascript:void(0);\" name=\"{$vb80bb7740288fda1f201890375a60c8f}_tag_list_item\" onclick=\"javascript: return window.parent.returnNewTag('{$vb80bb7740288fda1f201890375a60c8f}', '{$ve4d23e841d8e8804190027bce3180fa5}', this);\" style=\"font-size: {$vc4db0b59ed68b4b2952fa7303e78a56e}pt;\">{$ve4d23e841d8e8804190027bce3180fa5}</a>";}$v9b207167e5381c47682c6b4f58a623fb = implode(", ", $v980da98409d058c365664ff7ea33dd6b);$vc43b875dff84909b849ead4dedd78784 = getLabel ('button-tag-cloud-exit');header("Content-type: text/html; charset=utf-8");$v9b207167e5381c47682c6b4f58a623fb = <<<HTML
<html>
<head>
<style>
a {
	text-decoration: none;
	color: #0088e8;
}

a.disabledTag {
	text-decoration: none;
	color: #676767;
}

select, input, button { font: 11px Tahoma,Verdana,sans-serif; }
button { width: 70px; }


#buttons {
    margin-top: 1em; border-top: 1px solid #999;
    padding: 2px; text-align: right;
}
</style>

<script>
	function onExit() {
		window.parent.focusTagsInput('{$vb80bb7740288fda1f201890375a60c8f}');
		window.parent.Windows.closeAll();
		return false;
	}
    function onLoad() {
        var aTags   = document.getElementsByTagName('a'); 
        var sExTags = window.parent.document.getElementById('{$vb80bb7740288fda1f201890375a60c8f}').value;
        for(i=0; i<aTags.length; i++) { 
            if(aTags[i].getAttribute('name') == '{$vb80bb7740288fda1f201890375a60c8f}_tag_list_item') { 
                var sTagText = "";
                if(aTags[i].text) sTagText = aTags[i].text;
                else              sTagText = aTags[i].innerText;
                if(sExTags.lastIndexOf(sTagText) != -1) {
                    aTags[i].className = 'disabledTag';
                }
            }
        }
    }
</script>
</head>
<body onload="onLoad()">
<table width="100%" height="100%" border="0">
<tr><td valign="middle" align="center">{$v9b207167e5381c47682c6b4f58a623fb}</td></tr>

<tr><td>
<!--div id="buttons">
	<button type="button" name="cancel" onclick="return onExit();">{$vc43b875dff84909b849ead4dedd78784}</button>
</div-->
</td></tr>
</table>
</body>
</html>
HTML;   $this->flush($v9b207167e5381c47682c6b4f58a623fb);}};?>
