<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/result[@method = 'config']/data[@type = 'list' and @action = 'modify']">
		<form action="do/" method="post">
			<xsl:apply-templates select="domain" mode="list-modify" />
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>
	
	<xsl:template match="domain" mode="list-modify">
		<table class="tableContent">
			<thead>
				<tr>
					<th colspan="5">
						<xsl:value-of select="@host" />
					</th>
				</tr>

				<tr>
					<th>
						<xsl:text>&label-template-name;</xsl:text>
					</th>
					
					<th>
						<xsl:text>&label-template-filename;</xsl:text>
					</th>
					
					<th>
						<xsl:text>&label-template-is-default;</xsl:text>
					</th>
					
					<th>
						<xsl:text>&label-template-edit;</xsl:text>
					</th>
					
					<th>
						<xsl:text>&label-template-delete;</xsl:text>
					</th>
				</tr>
			</thead>
			
			<tbody>
				<xsl:apply-templates mode="list-modify"/>
				
				<tr>
					<td>
						<input type="text" name="data[{@host}][new][title]" />
					</td>
					
					<td>
						<input type="text" name="data[{@host}][new][filename]" />
					</td>
					
					<td align="center">
						<input type="radio" name="data[default][{@id}]" value="new" class="check" />
					</td>
					
					<td colspan="2" />
				</tr>
			</tbody>
		</table>
	</xsl:template>


	<xsl:template match="template" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{../@host}][{@id}][title]" value="{@title}"/>
			</td>
			
			<td>
				<input type="text" name="data[{../@host}][{@id}][filename]" value="{@filename}"/>
			</td>
			
			<td align="center">
				<input type="radio" name="data[default][{@domain-id}]" value="{@id}" class="check">
					<xsl:if test="@is-default = '1'">
						<xsl:attribute name="checked">checked</xsl:attribute>
					</xsl:if>
				</input>
			</td>
			
			<td align="center">
				<a href="{$lang-prefix}/admin/content/tpl_edit/{@id}/?domain={../@host}">
                    <img src="/images/cms/admin/mac/ico_edit.gif" title="&label-edit;" alt="&label-edit;" />
                </a>
			</td>

			<td align="center">
				<input type="checkbox" name="dels[]" value="{@id}" class="check">
					<xsl:if test="@is-default = '1'">
						<xsl:attribute name="disabled">disabled</xsl:attribute>
					</xsl:if>
				</input>
			</td>
		</tr>
	</xsl:template>

</xsl:stylesheet>