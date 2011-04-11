<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:variable name="lang-items" select="document('udata://system/getLangsList/')/udata/items/item" />

	<xsl:template match="/result[@method = 'langs']/data[@type = 'list' and @action = 'modify']">
		<form action="do/" method="post">
			<table class="tableContent">
				<thead>
					<tr>
						<th>
							<xsl:text>&label-langs-list;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-lang-prefix;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-delete;</xsl:text>
						</th>
					</tr>
				</thead>
				<tbody>
					<xsl:apply-templates mode="list-modify"/>
					<tr>
						<td>
							<input type="text" name="data[new][title]" />
						</td>
						<td>
							<input type="text" name="data[new][prefix]" />
						</td>
						<td />
					</tr>
				</tbody>
			</table>
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>

	<xsl:template match="lang" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{@id}][title]" value="{@title}"/>
			</td>

			<td>
				<input type="text" name="data[{@id}][prefix]" value="{@prefix}"/>
			</td>

			<td class="center">
				<a href="{$lang-prefix}/admin/config/lang_del/{@id}/" class="delete unrestorable">
					<span><xsl:text>&label-delete;</xsl:text></span>
				</a>
			</td>
		</tr>
	</xsl:template>
	
	
	<xsl:template match="/result[@method = 'domains']/data">
		<form action="do/" method="post">
			<table class="tableContent">
				<thead>
					<tr>
						<th>
							<xsl:text>&label-domain-address;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-domain-lang;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-mirrows;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-delete;</xsl:text>
						</th>
					</tr>
				</thead>
				<tbody>
					<xsl:apply-templates mode="list-modify"/>
					<tr>
						<td>
							<input type="text" name="data[new][host]" />
						</td>
						<td>
							<select name="data[new][lang_id]">
								<xsl:apply-templates select="$lang-items" mode="std-form-item" />
							</select>
						</td>
						<td colspan="2" />
					</tr>
				</tbody>
			</table>
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>

	<xsl:template match="domain" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{@id}][host]" value="{@host}" />
			</td>

			<td>
				<select name="data[{@id}][lang_id]">
					<xsl:apply-templates select="$lang-items" mode="std-form-item">
						<xsl:with-param name="value" select="@lang-id" />
					</xsl:apply-templates>
				</select>
			</td>
			
			<td>
				<a href="{$lang-prefix}/admin/config/domain_mirrows/{@id}/" class="subitems">
					<span><xsl:text>&label-edit;</xsl:text></span>
				</a>
			</td>

			<td>
				<a href="{$lang-prefix}/admin/config/domain_del/{@id}/" class="delete unrestorable">
					<span><xsl:text>&label-delete;</xsl:text></span>
				</a>
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="domain[@id = '1']" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{@id}][host]" value="{@host}" disabled="disabled" />
			</td>

			<td>
				<select name="data[{@id}][lang_id]">
					<xsl:apply-templates select="$lang-items" mode="std-form-item">
						<xsl:with-param name="value" select="@lang-id" />
					</xsl:apply-templates>
				</select>
			</td>
			
			<td>
				<a href="{$lang-prefix}/admin/config/domain_mirrows/{@id}/" class="subitems">
					<span><xsl:text>&label-edit;</xsl:text></span>
				</a>
			</td>

			<td />
		</tr>
	</xsl:template>

	<xsl:template match="/result[@method = 'domain_mirrows']/data">
		<form action="do/" method="post">
			<xsl:apply-templates select="group" mode="settings-modify" />
		
			<table class="tableContent">
				<thead>
					<tr>
						<th>
							<xsl:text>&label-domain-mirror-address;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-delete;</xsl:text>
						</th>
					</tr>
				</thead>
				<tbody>
					<xsl:apply-templates select="domainMirrow" mode="list-modify"/>
					<tr>
						<td>
							<input type="text" name="data[new][host]" />
						</td>
						<td />
					</tr>
				</tbody>
			</table>
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>
	
	<xsl:template match="domainMirrow" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{@id}][host]" value="{@host}" />
			</td>
			
			<td class="center">
				<input type="checkbox" name="dels[]" value="{@id}" class="check" />
			</td>
		</tr>
	</xsl:template>
	
	
	<xsl:template match="group" mode="settings-modify">
		<table class="tableContent">
			<thead>
				<tr>
					<th colspan="2">
						<xsl:value-of select="@label" />
					</th>
				</tr>
			</thead>
			
			<tbody>
				<xsl:apply-templates select="option" mode="settings-modify" />
			</tbody>
		</table>
		
		<xsl:call-template name="std-save-button" />
	</xsl:template>
	
	<xsl:template match="option" mode="settings-modify">
		<tr>
			<td>
				<label for="{@name}">
					<xsl:value-of select="@label" />
				</label>
			</td>
			
			<td>
				<input type="text" name="{@name}" id="{@name}" value="{.}" />
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>