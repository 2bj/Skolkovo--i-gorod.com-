<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/" [
	<!ENTITY sys-module          'blogs20'>
	<!ENTITY sys-method-add      'add'>
	<!ENTITY sys-method-edit     'edit'>
	<!ENTITY sys-method-del      'del'>
	<!ENTITY sys-method-list     'posts'>
	<!ENTITY sys-method-activity 'activity'>

	<!ENTITY sys-type-list       'blog'>
	<!ENTITY sys-type-item       'post'>
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="data[@type = 'list' and @action = 'view']">
		<xsl:choose>
			<xsl:when test="/result/@method='blogs'">
				<div class="imgButtonWrapper">
					<a id="addBlog" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/blog/">&label-add-blog;</a>
					<a id="addPost" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/post/">&label-add-post;</a>
				</div>
			</xsl:when>
			<xsl:when test="/result/@method='posts'">

				<div  class="imgButtonWrapper">
					<a id="postAdd" onclick="fixAddUrl()" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-item;/">&label-add-post-to;</a>
					<xsl:apply-templates select="/result/data/blogs">
						<xsl:with-param name="control_id">blog_id</xsl:with-param>
					</xsl:apply-templates>
				</div>	

				<script type="text/javascript">
					function fixAddUrl() {
						var select = document.getElementById('blog_id');
						var id = select.options[select.selectedIndex].value;
						var container = document.getElementById('postAdd');
						$('a', container).andSelf().attr('href', "/admin/&sys-module;/&sys-method-add;/" + id + "/post/");
					}
				</script>

			</xsl:when>
		</xsl:choose>
		<xsl:call-template name="ui-smc-table">
			<!--xsl:with-param name="content-type">objects</xsl:with-param-->
			<xsl:with-param name="control-params"><xsl:value-of select="/result/@method"/></xsl:with-param>
			<xsl:with-param name="js-add-buttons">
				<xsl:if test="/result/@method='blogs'">
					createAddButton(
							$('#addBlog')[0], oTable,
							'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/blog/', [true]);
					createAddButton(
							$('#addPost')[0], oTable,
							'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/post/', ['blog']);
				</xsl:if>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="blogs">
        <xsl:param name="control_id"/>
        <select id="{$control_id}" style="width:250px;">
            <xsl:apply-templates select="blog"/>
        </select>
    </xsl:template>

    <xsl:template match="blog">
        <option value="{@id}">
            <xsl:value-of select="text()"/>
        </option>
    </xsl:template>

</xsl:stylesheet>
