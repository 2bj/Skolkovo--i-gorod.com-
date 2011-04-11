<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/" [
	<!ENTITY sys-module        'faq'>
	<!ENTITY sys-method-add        'add'>
	<!ENTITY sys-method-edit    'edit'>
	<!ENTITY sys-method-del        'del'>
	<!ENTITY sys-method-acivity    'activity'>

	<!ENTITY sys-method-list-projects    'projects_list'>
	<!ENTITY sys-method-list-categories    'categories_list'>
	<!ENTITY sys-method-list-questions    'questions_list'>

	<!ENTITY sys-type-project    'project'>
	<!ENTITY sys-type-category    'category'>
	<!ENTITY sys-type-question    'question'>
]>


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/result[@method = 'projects_list']/data">
		<div class="imgButtonWrapper" xmlns:umi="http://www.umi-cms.ru/TR/umi">
			<a id="addProject" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-project;/" class="type_select_gray" umi:type="faq::project">
				<xsl:text>&label-add-project;</xsl:text>
			</a>

			<a id="addCategory" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-category;/" class="type_select_gray" umi:type="faq::category">
				<xsl:text>&label-add-category;</xsl:text>
			</a>
			
			<a id="addQuestion" href="{$lang-prefix}/admin/&sys-module;/&sys-method-add;/{$param0}/&sys-type-question;/" class="type_select_gray" umi:type="faq::question">
				<xsl:text>&label-add-question;</xsl:text>
			</a>
		</div>
		
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="js-add-buttons">
				createAddButton(
					$('#addProject')[0], oTable,
					'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/&sys-type-project;/',
					[true]
				);
				createAddButton(
					$('#addCategory')[0], oTable,
					'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/&sys-type-category;/',
					['project']
				);
				createAddButton(
					$('#addQuestion')[0], oTable,
					'<xsl:value-of select="$lang-prefix" />/admin/&sys-module;/&sys-method-add;/{id}/&sys-type-question;/',
					['category']
				);
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
</xsl:stylesheet>