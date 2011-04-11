<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common"[
		<!ENTITY sys-module        'data'>
		]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<xsl:param name="skip-lock"/>

	<!--Form modify-->

	<xsl:template match="/result[@method = 'type_edit']/data[@type = 'form' and (@action = 'modify' or @action = 'create')]">
			<form action="do" method="post" enctype="multipart/form-data">
				<input type="hidden" name="referer" value="{/result/@referer-uri}"/>
				<xsl:apply-templates select="type" mode="fieldgroup-common" />
			</form>
			<xsl:apply-templates select="//fieldgroups" mode="fieldsgroups-other" />
	</xsl:template>

	<xsl:template match="type" mode="fieldgroup-common">
		<div class="panel">
			<div class="header" title='&label-name;: "{@title}"'>
				<span>
					&label-edit-type-common;
				</span>
				<div class="l"></div>
				<div class="r"></div>
			</div>
			<div id="group-common"  class="content">
				<div class="field" style="height:50px;">
					<label>
						<span class="label">&label-type-name;</span>
						<span>
							<input type="text" name="data[name]" value="{@title}" />
						</span>
					</label>
				</div>
				<div class="field" style="height:50px;">
					<label>
						<span class="label">
							<xsl:text>&label-hierarchy-type;</xsl:text>
						</span>
						<span>
							<select name="data[hierarchy_type_id]" value="{base/@id}">
								<option/>
								<xsl:apply-templates select="document('udata://system/hierarchyTypesList')/udata/items/item" mode="std-form-item">
									<xsl:with-param name="value" select="base/@id" />
								</xsl:apply-templates>
							</select>
						</span>
					</label>
				</div>
				<div class="field">
					<label>
						<span class="label">
							<input type="hidden" name="data[is_public]" value="0" />
							<input type="checkbox" name="data[is_public]" value="1" class="checkbox" >
								<xsl:if test="@public">
									<xsl:attribute name="checked">checked</xsl:attribute>
								</xsl:if>
							</input>
							<xsl:text>&label-is-public;</xsl:text>
						</span>
					</label>
				</div>
				<div class="field">
					<label>
						<span class="label">
							<input type="hidden" name="data[is_guidable]" value="0" />
							<input type="checkbox" name="data[is_guidable]" value="1" class="checkbox" >
								<xsl:if test="@guide">
									<xsl:attribute name="checked">checked</xsl:attribute>
								</xsl:if>
							</input>
							<xsl:text>&label-is-guide;</xsl:text>
						</span>
					</label>
				</div>
				<div class="buttons">
					<div>
						<input type="submit" value="&label-save;" class="primary" />
						<span class="l" /><span class="r" />
					</div>
					<div>
						<input type="submit" value="&label-save-exit;" name="save-mode" />
						<span class="l" /><span class="r" />
					</div>
					<div>
						<input type="button" value="&label-cancel;" onclick="javascript: window.location = '{/result/@referer-uri}';"  />
						<span class="l" /><span class="r" />
					</div>
				</div>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="fieldgroups" mode="fieldsgroups-other" >
		<script src="/styles/common/js/type.control.js" />
		<div id="group-fields">
			<div id="groupsContainer" />
		</div>
		<script type="text/javascript">
			var type = new typeControl(<xsl:value-of select="//type/@id" />, {container: "#groupsContainer"});
			<xsl:apply-templates select="group" mode="fieldsgroups-other" />
		</script>
	</xsl:template>

	<xsl:template match="group" mode="fieldsgroups-other">
		type.addGroup({id    : <xsl:value-of select="@id" />,
					   title : '<xsl:value-of select="@title" />',
					   name  : '<xsl:value-of select="@name" />',
					   visible : <xsl:choose><xsl:when test="@visible = 'visible'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>,
					   locked  : <xsl:choose><xsl:when test="@locked = 'locked' and not($skip-lock)">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>});
					   
		<xsl:apply-templates select="field" mode="fieldsgroups-other" />
	</xsl:template>

	<xsl:template match="field" mode="fieldsgroups-other">
		type.addField(<xsl:value-of select="../@id" />,
					 {id       : <xsl:value-of select="@id" />,
					  title    : '<xsl:value-of select="@title" />',
					  name     : '<xsl:value-of select="@name" />',
					  tip      : '<xsl:value-of select="./tip/text()" />',
					  typeId   : <xsl:value-of select="@field-type-id" />,
					  typeName : '<xsl:value-of select="./type/@name" />',
					  <xsl:if test="./@guide-id">
					  guideId  : <xsl:value-of select="@guide-id" />,
					  </xsl:if>
					  <xsl:if test="./restriction">
					  restrictionId    : <xsl:value-of select="./restriction/@id" />,
					  restrictionTitle : '<xsl:value-of select="./restriction/text()" />',
					  </xsl:if>
					  visible    : <xsl:choose><xsl:when test="@visible  = 'visible'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>,
					  required   : <xsl:choose><xsl:when test="@required = 'required'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>,
					  filterable : <xsl:choose><xsl:when test="@filterable = 'filterable'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>,
					  indexable  : <xsl:choose><xsl:when test="@indexable  = 'indexable'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>,
					  locked  : <xsl:choose><xsl:when test="@locked = 'locked' and not($skip-lock)">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>});
	</xsl:template>

	<xsl:template match="object[not(./properties/group)]" mode="form-modify">
		<div class="panel properties-group">
			<div class="header">
				<span><xsl:text>&nbsp;</xsl:text></span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<xsl:call-template name="std-form-name">
					<xsl:with-param name="value" select="@name" />
					<xsl:with-param name="show-tip"><xsl:text>0</xsl:text></xsl:with-param>
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

</xsl:stylesheet>
