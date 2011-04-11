<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common"[
	<!ENTITY sys-module 'data'>
	<!ENTITY sys-module 'webforms'>
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'form' and (@action = 'modify' or @action = 'create') and object]">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}"/>
			<input type="hidden" name="domain" value="{$domain-floated}"/>

			<xsl:apply-templates select="group" mode="form-modify" />
			<xsl:apply-templates select="object/properties/group" mode="form-modify">
				<xsl:with-param name="show-name">0</xsl:with-param>
			</xsl:apply-templates>
		</form>
	</xsl:template>
	
	<xsl:template match="properties/group" mode="form-modify">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:value-of select="@title" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<xsl:if test="position() = 1 and not(/result/@method='template_add') and not(/result/@method='template_edit')">
					<div class="field">
						<label>
							<span class="label"><xsl:text>&label-name;</xsl:text></span>
							<span><input type="text" name="name" value="{../../@name}" /></span>
						</label>
					</div>
				</xsl:if>
				<xsl:apply-templates select="field" mode="form-modify" />
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

	<xsl:template match="type" mode="form-modify">
		<div class="panel properties-group">
			<div class="header">
				<span><xsl:text>&label-form;</xsl:text></span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<div class="field">
					<label>
						<span class="label"><xsl:text>&label-form-name;</xsl:text></span>
						<span><input type="text" name="data[name]" value="{@title}" /></span>
					</label>
				</div>
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
		<xsl:if test="$data-action = 'modify'">
			<div class="panel properties-group">
				<xsl:apply-templates mode="fieldsgroups-other" />
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template match="base" mode="fieldsgroups-other">
		<div class="header">
			<span><xsl:value-of select="." /></span>
			<div class="l" /><div class="r" />
		</div>
	</xsl:template>

	<xsl:template match="fieldgroups" mode="fieldsgroups-other" >
		<div class="content">
			<script src="/styles/common/js/type.control.js" />
			<div id="group-fields">
				<div id="groupsContainer" />
			</div>
			<script type="text/javascript">
				var type = new typeControl(<xsl:value-of select="//type/@id" />, {container: "#groupsContainer"});
				<xsl:apply-templates select="group" mode="fieldsgroups-other" />
			</script>
		</div>
	</xsl:template>

	<xsl:template match="group" mode="fieldsgroups-other">
		type.addGroup({id    : <xsl:value-of select="@id" />,
					   title : '<xsl:value-of select="@title" />',
					   name  : '<xsl:value-of select="@name" />',
					   visible : <xsl:choose><xsl:when test="@visible = 'visible'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>,
					   locked  : <xsl:choose><xsl:when test="@locked = 'locked'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>});

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
					  locked  : <xsl:choose><xsl:when test="@locked = 'locked'">true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose>});
	</xsl:template>

	<xsl:template match="group[@name = 'SendingData']" mode="fieldsgroups-other" />
	<xsl:template match="group[@name = 'Binding']"     mode="form-modify" />

	<xsl:template match="group[@name = 'BindToForm']" mode="form-modify">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:value-of select="@title" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<div class="field">
					<label>
						<span class="label"><xsl:text>&label-form;</xsl:text></span>
						<span>
							<select name="system_form_id" id="system_form_id">
								<xsl:apply-templates
										select="document(concat('udata://webforms/getUnbindedForms/', //object/@id))/udata/items/item"
										mode="getUnbindedForms">
									<xsl:with-param name="selected_id" select="@selected_type"/>
								</xsl:apply-templates>
							</select>
						</span>
					</label>
				</div>
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

	<xsl:template match="item" mode="getUnbindedForms">
		<xsl:param name="selected_id" />
		<option value="{@id}">
			<xsl:if test="@id = $selected_id">
				<xsl:attribute name="selected"><xsl:text>selected</xsl:text></xsl:attribute>
			</xsl:if>
			<xsl:value-of select="." />
		</option>
	</xsl:template>

</xsl:stylesheet>