<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="/">
		<html>
			<head>
				<title>
					<xsl:text>&cms-name; - </xsl:text>
					<xsl:value-of select="$header" />
				</title>

				<!-- Global variables -->
				<script type="text/javascript">
					var pre_lang = '<xsl:value-of select="$lang-prefix" />';
				</script>

				<script type="text/javascript" src="/js/jquery/jquery-1.4.1.min.js" charset="utf-8" />
				<script type="text/javascript" src="/js/jquery/jquery-ui-1.7.2.custom.min.js" charset="utf-8" />
				<script type="text/javascript" src="/js/jquery/jquery.umipopups.js" charset="utf-8" />
				<script type="text/javascript" src="/js/jquery/jquery.contextmenu.js" charset="utf-8" />

				<!-- Include labels -->
				<script type="text/javascript" src="/ulang/{$iface-lang}/common/content/date/{$module}?js" charset="utf-8" />


				<!-- Umi ui controls -->
				<xsl:if test="/result/data[@type = 'list']">
					<script	type="text/javascript" src="/js/smc/compressed.js"></script>
				</xsl:if>

				<!-- umi ui css -->
				<link type="text/css" rel="stylesheet" href="/styles/common/css/compiled.css"/>
				
				<script type="text/javascript" src="/styles/common/js/file.control.js" charset="utf-8" />
				<script type="text/javascript" src="/styles/common/js/relation.control.js" charset="utf-8" />
				<script type="text/javascript" src="/styles/common/js/permissions.control.js" charset="utf-8" />
				<script type="text/javascript" src="/styles/common/js/symlink.control.js" charset="utf-8" />
				<script type="text/javascript" src="/styles/common/js/permissions.control.js" charset="utf-8" />
				<script type="text/javascript" src="/styles/common/js/utilities.js" charset="utf-8" />
				<script type="text/javascript" src="/js/cms/messages.js"></script>

				<script type="text/javascript"> 
					function autoHeightIframe(mode) {
						var eip_page = document.getElementById('eip_page');
						var height = (mode == 'load') ? document.body.scrollHeight : eip_page.offsetHeight;
						height = (height > 500) ? 500 : height;
						frameElement.height = height;
						frameElement.style.height = height;
					}

					function showSubtypes(block, sub_class) {
						var sub_block = document.getElementById('eip_page_subtype_' + sub_class);
						block.parentNode.style.display = 'none';
						sub_block.style.display = 'block';
						autoHeightIframe();
					}

					function hideSubtypes(block) {
						var sub_block = document.getElementById('eip_page_types_choice');
						block.style.display = 'none';
						sub_block.style.display = 'block';
						autoHeightIframe();
					}

					function submitAddPage(type_id) {
						location.href = '?hierarchy-type-id='+type_id;
					}

					function popupCancel() {
						window.parent.$.closePopupLayer(null, {});
					}

					$(document).ready(function(){
						$("fieldset legend a").click(function() {
							var i;
							if(i = this.href.indexOf('#')) {
								var id = this.href.substring(i + 1);
								$("fieldset").children().filter("div").hide();
								$('div#' + id).show();
								autoHeightIframe();
							}
							return false;
						});
						$('.wysiwyg').each(function (index, node) {
							tinyMCE.execCommand('mceAddControl', false, node.id);
						});

						$(':input[name=hierarchy-type-id]').click(function () {
							$('.object-types').css('display', 'none');
							$('#object-types-' + this.value).css('display', 'block');
							autoHeightIframe();
						});

						autoHeightIframe('load');
					});
				</script>
				
				<style>
					.mceToolbar {
						width: 200px;
					}
					
					.mceLayout {
						display: table;
					}
				</style>
				
				<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tinymce_defs.js"></script>
				<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tinymce_custom.js"></script>
				<script type="text/javascript" src="/js/tinymce/jscripts/tiny_mce/tiny_mce_src.js"></script>

				<script type="text/javascript">
					tinyMCE.init({mode : "none", theme : "umisimple", language : "ru", plugins : "advimage,advlink,inlinepopups", inline_styles : false, inlinepopups_skin : 'butterfly'});
				</script>
				
				<!-- <link href="/styles/skins/_eip/css/design.css" rel="stylesheet" type="text/css" /> -->

				<link href="/styles/skins/_eip/css/permissions.control.css" rel="stylesheet" type="text/css" />
				<link href="/styles/skins/_eip/css/relation.control.css" rel="stylesheet" type="text/css" />
				<link href="/styles/skins/_eip/css/symlink.control.css" rel="stylesheet" type="text/css" />
				<link href="/styles/skins/_eip/css/popup.css" rel="stylesheet" type="text/css" />
				<link href="/styles/skins/_eip/css/popup_page.css" rel="stylesheet" type="text/css" />
			</head>
			
			<body>
				<xsl:apply-templates select="$errors" />
				<xsl:apply-templates select="result" />
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>