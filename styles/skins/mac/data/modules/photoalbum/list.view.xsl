<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/photoalbum" [
		<!ENTITY sys-module        'photoalbum'>
		<!ENTITY sys-method-add        'add'>
		<!ENTITY sys-method-edit    'edit'>
		<!ENTITY sys-method-del        'del'>
		<!ENTITY sys-method-list    'lists'>
		<!ENTITY sys-method-acivity     'activity'>

		<!ENTITY sys-type-list        'album'>
		<!ENTITY sys-type-item        'photo'>
		]>


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xlink="http://www.w3.org/TR/xlink">
	

	<xsl:template match="data[@type = 'list' and @action = 'view']">

		<script type="text/javascript">
		<![CDATA[
			function photoalbumShowForm(parentId) {
				openDialog({text : "<form id='zipform' action='/admin/photoalbum/upload_arhive/' method='post' enctype='multipart/form-data' >\
										<label for='upload'>" + getLabel('js-label-arhive-from-pc') + "</label>\
										<input type='file' id='upload' name='zip_arhive' style='width:100%' />\
										<label for='path'>" + getLabel('js-label-arhive-from-src') + "</label>\
										<input type='text' id='path' name='zip_arhive_src' style='width:100%' />\
										<input type='hidden' name='parent_id' value='" + parentId + "' />\
									</form>",
							title  : "Загрузка из архива",
							OKText : getLabel("js-label-add-arhive-upload"),
							OKCallback: function () { jQuery('#zipform').submit(); return false; } });
			}
		]]>
		</script>

		<div class="imgButtonWrapper" xmlns:umi="http://www.umi-cms.ru/TR/umi">
			<a id="addAlbum" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-list;/" class="type_select_gray" umi:type="photoalbum::album">
				<xsl:text>&label-add-album;</xsl:text>
			</a>
			
			<a id="addPhoto" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-item;/" class="type_select_gray" umi:type="photoalbum::photo">
				<xsl:text>&label-add-photo;</xsl:text>
			</a>
			
			<a id="uploadZip" href="{$lang-prefix}/admin/&sys-module;/&sys-method-list;/{$param0}/" 
				onclick="photoalbumShowForm(this['param0']); return false;">
				<xsl:text>&label-add-arhive;</xsl:text>
			</a>
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="js-add-buttons">
				createAddButton($('#addAlbum')[0], oTable, '{$pre_lang}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-list;/', ['album', true]);
				createAddButton($('#addPhoto')[0], oTable, '{$pre_lang}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-item;/', ['album']);
				createAddButton($('#uploadZip')[0], oTable, '{$pre_lang}/admin/&sys-module;/&sys-method-list;/{$param0}/', ['album']);
				createAddButton($('#multi_upload')[0], oTable, '/admin/&sys-module;/uploadImages/{$param0}/', ['album']);
			</xsl:with-param>
		</xsl:call-template>

		<!-- Detect if Picasa is installed -->
		<script type="text/javascript"><![CDATA[
			var _picasaInstalled = !!(navigator.mimeTypes['application/x-picasa-detect']);

			function submitUploadImages() {
				var aPar = document.getElementById("a_parent_id");
				var formSubmited = document.getElementById("upload_images_form");
				formSubmited.action = aPar;
				return true;
			}
		]]></script>
		<xsl:comment><![CDATA[[if gte Picasa 2.0]><script type="text/javascript">_picasaInstalled = true;</script><![endif]]]></xsl:comment>
		<script type="text/javascript">
			var pbzloc = "<xsl:value-of select="document('udata://photoalbum/getPicasaLink')/udata" />";
			<![CDATA[

		  if (_picasaInstalled) {
			installmsg = "<div class='imgBtn'><a href='picasa://importbutton/?url=" + pbzloc + "'>";
			installmsg += "]]>&picasa-add-button;<![CDATA[";
			installmsg += "</a></div>";
			document.write(installmsg);
		  } else {
			document.write("<a href='#' style='float: left;' onclick='javascript: modalPicasaInfo(); return false;'>]]>&picasa-not-installed;<![CDATA[</a>");
		  }
		]]>
		</script>
		
		<div style="display: none; float: right;" id="multi_upload">
			<h4 style="font-size: 11px;">
				<xsl:text>&label-upload-multiple-photos;</xsl:text>
			</h4>
		
			<div>
				<form name="fs_upload_frm" action="#" enctype="multipart/form-data" method="post" style="margin-right: 0px; margin-left: 0px;" id="upload_images_form" onsubmit="javascript: return submitUploadImages();">
					<a href="{$param0}"  id="a_parent_id" class="{$param0}" />
					<ol style="display: block; margin: 10px 10px 10px 10px" id="fs_ready_upload" />
			
					<div  id="fs_next_upload" style="display: inline;">
						<input value="" size="50" name="fs_upl_files[]" onchange="fs_add_to_upload(this)" class="std" id="fs_upl_files[]" type="file" style="padding-right: 20px;"/>
					</div>
			
					<div style="width:250px;" class="tbuttons-container">
						<div class="tbutton">
							<ins class="t-l"></ins>
								<input type="submit" value="&label-upload-files;"/>
							<ins class="t-r"></ins>
						</div>
					</div>
				</form>
			</div>
		</div>
	</xsl:template>

</xsl:stylesheet>