<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:umi="http://www.umi-cms.ru/TR/umi">

	<xsl:template match="object" mode="form-modify" priority="1">
		<xsl:variable name="permissions" select="document(concat('udata://users/choose_perms/', $param0))/udata" />

		<xsl:apply-templates select="properties/group" mode="form-modify">
			<xsl:with-param name="show-name" select="count(.//field[@name = 'nazvanie'])" />
		</xsl:apply-templates>
		
		<xsl:apply-templates select="$permissions" />
	</xsl:template>
	
	<xsl:template match="field[@type = 'string' and @name = 'nazvanie']" mode="form-modify" />
	
	<xsl:template match="udata[@module = 'users' and @method = 'choose_perms']">
		<div class="panel properties-group">
			<div class="header">
				<span>
					<xsl:text>&permissions-panel;</xsl:text>
				</span>
				<div class="l" /><div class="r" />
			</div>
			
			<div class="content">
				<table class="tableContent">
					<thead>
						<tr>
							<th>
								<xsl:text>&permissions-module;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&permissions-use-access;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&permissions-other-access;</xsl:text>
							</th>
						</tr>
					</thead>
					
					<tbody>
						<xsl:apply-templates select="module" />
					</tbody>
				</table>
				
				<xsl:call-template name="std-form-buttons" />
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="module[@name = 'config']" />
	
	<xsl:template match="module">
		<tr>
			<td>
				<div class="module_icon">
					<img src="/images/cms/admin/mac/icons/small/{@name}.png" />
					<xsl:value-of select="@label" />
				</div>
			</td>
			
			<td align="center">
				<input value="{@name}" name="ps_m_perms[{@name}]" type="hidden" />
				<input value="{@name}" name="m_perms[]" type="checkbox" class="check">
					<xsl:if test="@access > 0">
						<xsl:attribute name="checked"/>
					</xsl:if>
				</input>
			</td>
			
			<td>
				<xsl:if test="@name = 'content'">
					<ul style="margin-bottom:15px;">
						<xsl:apply-templates select="../domains/domain" />
					</ul>
				</xsl:if>
			
				<ul>
					<xsl:apply-templates select="option" />
				</ul>
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="module/option">
		<li>
			<label>
				<input type="checkbox" name="{../@name}[{@name}]" class="check" value="1">
					<xsl:if test="@access > 0">
						<xsl:attribute name="checked" />
					</xsl:if>
				</input>
				<xsl:value-of select="@label" />
			</label>
		</li>
	</xsl:template>
	
	<xsl:template match="domains/domain">
		<li>
			<input type="hidden" name="domain[{@id}]" value="0"/>
			<label>
				<input type="checkbox" name="domain[{@id}]" value="1" class="check" >
					<xsl:if test="@access > 0">
						<xsl:attribute name="checked"/>
					</xsl:if>
				</input>
				<xsl:value-of select="@host" />
			</label>
		</li>
	</xsl:template>
	
	
	<xsl:template match="field[@name = 'groups']" mode="form-modify" priority="1">
		<dl class="field">
			<dt>
				<xsl:value-of select="@title" />
			</dt>
			
			<xsl:apply-templates select="values/item" mode="form-modify" />
		</dl>
	</xsl:template>
	
	<xsl:template match="field[@name = 'groups']/values/item" mode="form-modify" priority="1">
		<dd>
			<input type="hidden" name="{../../@input_name}" value="0" />
			<input type="checkbox" name="{../../@input_name}" value="{@id}" class="checkbox" id="group-{@id}">
				<xsl:if test="@selected = 'selected'">
					<xsl:attribute name="checked"><xsl:text>checked</xsl:text></xsl:attribute>
				</xsl:if>
			</input>
			
			<label for="group-{@id}">
				<xsl:value-of select="." />
			</label>
		</dd>
	</xsl:template>
	
	
	
	
	<xsl:template match="/result[@method = 'add']//field[@name = 'is_activated' and @type = 'boolean']" mode="form-modify">
		<xsl:if test="preceding-sibling::field/@type != 'boolean'">
			<div style="clear: left;" />
		</xsl:if>
		<div class="field">
			<label for="{generate-id()}">
				<span class="label">
					<input type="hidden" name="{@input_name}" value="0" />
					<input type="checkbox" name="{@input_name}" value="1" id="{generate-id()}" checked="checked">
						<xsl:apply-templates select="." mode="required_attr">
							<xsl:with-param name="old_class" select="'checkbox'" />
						</xsl:apply-templates>
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
</xsl:stylesheet>