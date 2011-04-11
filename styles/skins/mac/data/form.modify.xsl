<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:umi="http://www.umi-cms.ru/TR/umi">

	<xsl:template match="data[@type = 'form' and (@action = 'modify' or @action = 'create')]">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}" id="form-referer" />
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			
			<xsl:apply-templates mode="form-modify" />			
			<xsl:apply-templates select="page" mode="permissions" />
			
			<xsl:if test="@action = 'modify' and count(page) = 1">
				<xsl:apply-templates select="document(concat('udata://backup/backup_panel/', page/@id))/udata" />
			</xsl:if>
		</form>
	</xsl:template>
	
	<xsl:template match="page|object" mode="form-modify">
		<xsl:apply-templates select="properties/group" mode="form-modify" />
	</xsl:template>
	
	<xsl:template match="page[count(properties/group) = 0]|object[count(properties/group) = 0]" mode="form-modify">
		<xsl:param name="show-name"><xsl:text>1</xsl:text></xsl:param>
		<xsl:param name="show-type"><xsl:text>1</xsl:text></xsl:param>
		<xsl:param name="group-title"><xsl:text>&label-group-common;</xsl:text></xsl:param>
	
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:value-of select="$group-title" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<xsl:if test="$show-name = '1'">
					<xsl:call-template name="std-form-name">
						<xsl:with-param name="value" select="@name" />
						<xsl:with-param name="show-tip"><xsl:text>0</xsl:text></xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				
				<xsl:if test="$show-type = '1'">
					<xsl:call-template name="std-form-data-type">
						<xsl:with-param name="value" select="@type-id" />
					</xsl:call-template>
				</xsl:if>
					
				<xsl:choose>
					<xsl:when test="$data-action = 'create'">
						<xsl:call-template name="std-form-buttons-add" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="std-form-buttons" />
					</xsl:otherwise>
				</xsl:choose>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="properties/group" mode="form-modify">
		<xsl:param name="show-name"><xsl:text>1</xsl:text></xsl:param>
		<xsl:param name="show-type"><xsl:text>1</xsl:text></xsl:param>
	
		<div class="panel properties-group" name="g_{@name}">
			<div class="header">
				<span>
					<xsl:value-of select="@title" />
				</span>				
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
								
				<xsl:apply-templates select="." mode="form-modify-group-fields">
					<xsl:with-param name="show-name" select="$show-name" />
					<xsl:with-param name="show-type" select="$show-type" />
				</xsl:apply-templates>

				<xsl:choose>
					<xsl:when test="$data-action = 'create'">
						<xsl:call-template name="std-form-buttons-add" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="std-form-buttons" />
					</xsl:otherwise>
				</xsl:choose>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="group" mode="form-modify-group-fields">
		<xsl:apply-templates select="field" mode="form-modify" />
	</xsl:template>
	
	<xsl:template match="group[position() = 1 and count(../../basetype)]" mode="form-modify-group-fields">
		<xsl:param name="show-name"><xsl:text>1</xsl:text></xsl:param>
		<xsl:param name="show-type"><xsl:text>1</xsl:text></xsl:param>

		<xsl:if test="@name = 'common'">
			<div style="margin-bottom:25px;">
				<a href="javascript:void(0);" class="extended_fields_expander">&js-fields-expand;</a>
			</div>
		</xsl:if>

		<xsl:if test="$show-name = '1'">
			<xsl:call-template name="std-form-name">
				<xsl:with-param name="value" select="../../name" />
			</xsl:call-template>
		</xsl:if>

		<div class="extended_fields">
			<xsl:if test="@name = 'common'">
				<xsl:attribute name="style"><xsl:text>display:none</xsl:text></xsl:attribute>
			</xsl:if>
			<xsl:call-template name="std-form-alt-name">
				<xsl:with-param name="value" select="../../@alt-name" />
			</xsl:call-template>

			<div style="clear:left;" />

			<xsl:call-template name="std-form-is-active">
				<xsl:with-param name="value" select="../../@active = 'active'" />
			</xsl:call-template>

			<xsl:if test="$show-type = '1'">
				<xsl:call-template name="std-form-data-type">
					<xsl:with-param name="value" select="../../@type-id" />
				</xsl:call-template>
			</xsl:if>

			<xsl:apply-templates select="field[not(@type='tags' or @type='wysiwyg' or @type='text')]" mode="form-modify" />
		</div>
		<xsl:apply-templates select="field[@type='tags' or @type='wysiwyg' or @type='text']" mode="form-modify" />
	</xsl:template>

	<xsl:template match="group[position() = 1 and count(../../basetype) = 0]" mode="form-modify-group-fields">
		<xsl:param name="show-name"><xsl:text>1</xsl:text></xsl:param>
		<xsl:param name="show-type"><xsl:text>1</xsl:text></xsl:param>
		
		<xsl:if test="$show-name = '1'">
			<xsl:call-template name="std-form-name">
				<xsl:with-param name="value" select="../../@name" />
				<xsl:with-param name="show-tip"><xsl:text>0</xsl:text></xsl:with-param>
			</xsl:call-template>
		</xsl:if>

		<xsl:if test="$show-type = '1'">
			<xsl:call-template name="std-form-data-type">
				<xsl:with-param name="value" select="../../@type-id" />
			</xsl:call-template>
		</xsl:if>

		<xsl:apply-templates select="field[not(@type='tags' or @type='wysiwyg' or @type='text')]" mode="form-modify" />
		<xsl:apply-templates select="field[@type='tags' or @type='wysiwyg' or @type='text']" mode="form-modify" />
	</xsl:template>
	
	<xsl:template match="group[@name = 'more_params']" mode="form-modify-group-fields">
		<xsl:apply-templates select="../group[@name = 'menu_view']/field" mode="form-modify" />

		<xsl:call-template name="std-form-template-id">
			<xsl:with-param name="value" select="../../@tpl-id" />
		</xsl:call-template>

		<div style="clear: left;" />

		<xsl:call-template name="std-form-is-visible">
			<xsl:with-param name="value" select="../../@visible = 'visible'" />
		</xsl:call-template>

		<xsl:call-template name="std-form-is-default">
			<xsl:with-param name="value" select="../../@default = 'default'" />
		</xsl:call-template>

		<xsl:apply-templates select="field" mode="form-modify" />
	</xsl:template>

	<xsl:template match="page" mode="permissions">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&permissions-panel;</xsl:text>
				</span>
				<div class="l"></div>
				<div class="r"></div>
			</div>

			<div class="content">
				<xsl:call-template name="std-page-permissions">
					<xsl:with-param name="page-id" select="@id" />
				</xsl:call-template>
				
				<xsl:choose>
					<xsl:when test="$data-action = 'create'">
						<xsl:call-template name="std-form-buttons-add" />
					</xsl:when>
					
					<xsl:otherwise>
						<xsl:call-template name="std-form-buttons" />
					</xsl:otherwise>
				</xsl:choose>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="group[@name = 'menu_view']" mode="form-modify" />
	
	<xsl:template match="field[@type = 'string' or @type = 'int' or @type = 'price' or @type = 'float' or @type = 'counter']" mode="form-modify">
		<div class="field">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<input type="text" name="{@input_name}" value="{.}" id="{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr">
							<xsl:with-param name="old_class" select="@type" />
						</xsl:apply-templates>
					</input>
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template match="field[@type = 'password']" mode="form-modify">
		<div class="field">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<input type="password" name="{@input_name}" value="{.}" id="{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr">
							<xsl:with-param name="old_class" select="@type" />
						</xsl:apply-templates>
					</input>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="field[@type = 'tags']" mode="form-modify">
		<div class="field">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<input type="text" name="{@input_name}" value="{.}" id="{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr">
							<xsl:with-param name="old_class" select="@type" />
						</xsl:apply-templates>
					</input>
					<a href="javascript:void('0');" id="link{generate-id()}" class="tagPicker">
						<img title="&label-tags-cloud;" alt="&label-tags-cloud;" height="13" src="/images/cms/admin/mac/icons/tags.gif" />
					</a>
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="field[@type = 'date']" mode="form-modify">
		<div class="field datePicker">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<input type="text" name="{@input_name}" value="{.}" id="{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr" />
					</input>
					<!--a href="javascript:void('0');">
						<img src="/styles/common/other/calendar/icons_calendar_buttrefly.png" alt="" />
					</a-->
				</span>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="field[@type = 'text' or @type = 'wysiwyg']" mode="form-modify">
		<div class="field text">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<textarea name="{@input_name}" id="{generate-id()}">
					<xsl:apply-templates select="." mode="required_attr">
						<xsl:with-param name="old_class" select="@type" />
					</xsl:apply-templates>
					<xsl:value-of select="." />
				</textarea>
			</label>
		</div>
	</xsl:template>
	
	<xsl:template match="field[@type = 'boolean']" mode="form-modify">
		<xsl:if test="preceding-sibling::field/@type != 'boolean'">
			<div style="clear: left;" />
		</xsl:if>
		<div class="field">
			<label for="{generate-id()}">
				<span class="label">
					<input type="hidden" name="{@input_name}" value="0" />
					<input type="checkbox" name="{@input_name}" value="1" id="{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr">
							<xsl:with-param name="old_class" select="'checkbox'" />
						</xsl:apply-templates>
						<xsl:if test=". = '1'">
							<xsl:attribute name="checked">checked</xsl:attribute>
						</xsl:if>
					</input>
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template match="field[@type = 'relation']" mode="form-modify">
		<div class="field relation" id="{generate-id()}" umi:type="{@type-id}">
			<xsl:if test="(@multiple = 'multiple') or (@public-guide = '1')">
				<xsl:attribute name="style"><xsl:text>height:100px;</xsl:text></xsl:attribute>
			</xsl:if>
			<xsl:if test="not(@required = 'required')">
				<xsl:attribute name="umi:empty"><xsl:text>empty</xsl:text></xsl:attribute>
			</xsl:if>
			<label for="relationSelect{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<select name="{@input_name}" id="relationSelect{generate-id()}">
						<xsl:apply-templates select="." mode="required_attr" />
						<xsl:if test="@multiple = 'multiple'">
							<xsl:attribute name="multiple">multiple</xsl:attribute>
							<xsl:attribute name="style">height: 62px;</xsl:attribute>
						</xsl:if>
						<xsl:if test="not(values/item/@selected)">
							<option value=""></option>
						</xsl:if>
						<xsl:apply-templates select="values/item" />
					</select>
				</span>
			</label>
			<input type="text" id="relationInput{generate-id()}" class="search_input" />
			<xsl:if test="@public-guide = '1'">
				<input type="button" id="relationButton{generate-id()}" value =" " class="relation-add"  />
			</xsl:if>
		</div>
	</xsl:template>

	<xsl:template match="field[@type = 'symlink']" mode="form-modify">
		<div class="field symlink" id="{generate-id()}" name="{@input_name}">
			<label for="symlinkInput{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span id="symlinkInput{generate-id()}">
					<ul>
						<xsl:apply-templates select="values/item" mode="symlink" />
					</ul>
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template match="field[@type = 'img_file' or @type = 'video_file' or @type = 'swf_file' or @type = 'file']" mode="form-modify">
		<div class="field file" id="{generate-id()}" name="{@input_name}"
			umi:field-type="{@type}"
			umi:name="{@name}"
			umi:folder="{@destination-folder}"
			umi:file="{.}">
			<label for="symlinkInput{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:apply-templates select="." mode="sys-tips" />						
						<xsl:value-of select="@title" />						
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span id="fileControlContainer_{generate-id()}">
					
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template match="field[@type = 'optioned']" mode="form-modify">
		<div class="field text">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:if test="@tip">
							<xsl:attribute name="title"><xsl:value-of select="@tip" /></xsl:attribute>
						</xsl:if>
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<xsl:call-template name="std-optioned-control">
						<xsl:with-param name="input-name" select="@input_name" />
						<xsl:with-param name="guide-id" select="@guide-id" />
						<xsl:with-param name="type"><xsl:text>float</xsl:text></xsl:with-param>
					</xsl:call-template>
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template match="field[@type = 'optioned' and @name = 'stores_state']" mode="form-modify">
		<div class="field text">
			<label for="{generate-id()}">
				<span class="label">
					<acronym>
						<xsl:if test="@tip">
							<xsl:attribute name="title"><xsl:value-of select="@tip" /></xsl:attribute>
						</xsl:if>
						<xsl:value-of select="@title" />
					</acronym>
					<xsl:apply-templates select="." mode="required_text" />
				</span>
				<span>
					<xsl:call-template name="std-optioned-control">
						<xsl:with-param name="input-name" select="@input_name" />
						<xsl:with-param name="guide-id" select="@guide-id" />
						<xsl:with-param name="type"><xsl:text>int</xsl:text></xsl:with-param>
					</xsl:call-template>
				</span>
			</label>
		</div>
	</xsl:template>

	<xsl:template match="field/values/item">
		<option value="{@id}">
			<xsl:value-of select="." />
		</option>
	</xsl:template>
	
	<xsl:template match="field/values/item[@selected = 'selected']">
		<option value="{@id}" selected="selected">
			<xsl:value-of select="." />
		</option>
	</xsl:template>

	<xsl:template match="field/values/item" mode="symlink">
		<li umi:id="{@id}" umi:module="{./basetype/@module}" umi:method="{./basetype/@method}" umi:href="{@link}">
			<xsl:value-of select="./name" />
		</li>
	</xsl:template>	
	
	<xsl:template match="page" mode="symlink">
		<li umi:id="{@id}" umi:module="{./basetype/@module}" umi:method="{./basetype/@method}" umi:href="{@link}">
			<xsl:value-of select="./name" />
		</li>
	</xsl:template>	

	<xsl:template match="field" mode="sys-tips" />
	<xsl:template match="field" mode="required_text" />

	<xsl:template match="field[@tip]" mode="sys-tips">
		<xsl:attribute name="title"><xsl:value-of select="@tip" /></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'title']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-title;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'meta_keywords']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-keywords;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'meta_descriptions']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-description;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'h1']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-h1;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'publish_time']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-publish-time;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'is_unindexed']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-is-unindexed;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'robots_deny']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-robots-deny;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'is_expanded']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-expanded;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'show_submenu']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-show-submenu;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'menu_pic_a']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-menu_a;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'menu_pic_ua']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-menu_ua;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'header_pic']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-headers;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@name = 'tags']" mode="sys-tips">
		<xsl:attribute name="title"><xsl:text>&tip-tags;</xsl:text></xsl:attribute>
		<xsl:attribute name="class"><xsl:text>acr</xsl:text></xsl:attribute>
	</xsl:template>

	<xsl:template match="field" mode="required_attr">
		<xsl:param name="old_class" />
		<xsl:if test="$old_class">
			<xsl:attribute name="class">
				<xsl:value-of select="$old_class" />
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<xsl:template match="field[@required = 'required']" mode="required_attr">
		<xsl:param name="old_class" />
		<xsl:attribute name="class">
			<xsl:if test="$old_class">
				<xsl:value-of select="$old_class" />
				<xsl:text> </xsl:text>
			</xsl:if>
			<xsl:text>required</xsl:text>
		</xsl:attribute>
	</xsl:template>

	<xsl:template match="field[@required = 'required']" mode="required_text">
		<sup><xsl:text>*</xsl:text></sup>
	</xsl:template>

	<xsl:template match="udata[@module = 'backup' and @method = 'backup_panel']">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&backup-changelog;</xsl:text>
				</span>
				<div class="l"></div>
				<div class="r"></div>
			</div>

			<div class="content">
				<table class="tableContent">
					<thead>
						<tr>
							<th>
								<xsl:text>&backup-change-number;</xsl:text>
							</th>
							<th>
								<xsl:text>&backup-change-time;</xsl:text>
							</th>
							<th>
								<xsl:text>&backup-change-author;</xsl:text>
							</th>
							<th>
								<xsl:text>&backup-change-rollback;</xsl:text>
							</th>
						</tr>
					</thead>
					<tbody>
						<xsl:choose>
							<xsl:when test="count(revision) &gt; 0">
								<xsl:apply-templates select="revision" />
							</xsl:when>
							
							<xsl:otherwise>
								<tr>
									<td colspan="4" align="center">
										<xsl:text>&backup-no-changes-found;</xsl:text>
									</td>
								</tr>
							</xsl:otherwise>
						</xsl:choose>
					</tbody>
				</table>
				<br />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="revision">
		 <xsl:variable name="editor-info" select="document(concat('uobject://',@user-id))/udata" />
		<tr>
			<td>
				<xsl:value-of select="position()" />
			</td>
			
			<td>
				<xsl:value-of select="document(concat('udata://system/convertDate/',@changetime,'/Y-m-d%20%7C%20H:i'))/udata" />
			</td>
			
			<td>
				<xsl:value-of select="$editor-info//property[@name = 'lname']/value" />
				<xsl:text>&nbsp;</xsl:text>
				<xsl:value-of select="$editor-info//property[@name = 'fname']/value" />
			</td>
			
			<td class="center">
				<xsl:apply-templates select="." mode="button" />
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="revision" mode="button">
		<div class="button">
			<input name="backup" type="button"
				value="&backup-change-rollback;"
				onclick="window.location = '{link}?referer=' + window.location.pathname;"
			/>
			<span class="l" />
			<span class="r" />
		</div>
	</xsl:template>
	
	<xsl:template match="revision[@is-void = 1]" mode="button">
		<xsl:text>&backup-entry-is-void;</xsl:text>
	</xsl:template>
	
	<xsl:template match="revision[@active = 'active']" mode="button" />

	<xsl:include href="udata://core/importSkinXsl/form.modify.xsl"/>
	<xsl:include href="udata://core/importSkinXsl/form.modify.custom.xsl"/>
</xsl:stylesheet>