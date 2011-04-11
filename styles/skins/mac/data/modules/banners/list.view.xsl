<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/banners" [
	<!ENTITY sys-module        'banners'>
	<!ENTITY sys-method-add        'add'>
]>


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xlink="http://www.w3.org/TR/xlink">
	<xsl:param name="p">0</xsl:param>

					<!--
							<a style="white-space:nowrap" class="first active"
							   href="{$pre_lang}/admin/&sys-module;/lists/">&module-banners;</a>
							<a style="color: #676767;white-space:nowrap" class="last"
							   href="{$pre_lang}/admin/&sys-module;/places/">&header-banners-places;</a>
					-->

	<xsl:template match="data[@type = 'list' and @action = 'view']">
		<div class="imgButtonWrapper" xmlns:umi="http://www.umi-cms.ru/TR/umi">
			<a href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/" class="type_select" umi:type="banners::banner" umi:prevent-default="true">
				<xsl:text>&label-add-list;</xsl:text>
			</a>
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="content-type">objects</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
</xsl:stylesheet>