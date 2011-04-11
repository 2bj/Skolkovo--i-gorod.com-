<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="data[@type = 'list' and @action = 'modify']">
		<form action="do/" method="post">
			<table class="tableContent">
				<thead>
					<tr>
						<th>
							<xsl:text>&label-name;</xsl:text>
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
							<input type="text" name="data[new][name]" />
						</td>
						<td />
					</tr>
				</tbody>
			</table>
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>


	<xsl:template match="object" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{@id}][name]" value="{@name}"/>
			</td>

			<td class="center">
				<input type="checkbox" name="dels[]" value="{@id}" class="check" />
			</td>
		</tr>
	</xsl:template>


	<xsl:template match="basetype" mode="list-modify">
		<tr>
			<td>
				<input type="text" name="data[{@id}][title]" value="{.}"/>
			</td>

			<td>
				<input type="text" name="data[{@id}][module]" value="{@module}"/>
			</td>

			<td>
				<input type="text" name="data[{@id}][method]" value="{@method}"/>
			</td>

			<td class="center">
				<input type="checkbox" name="dels[]" value="{@id}" class="check"/>
			</td>
		</tr>
	</xsl:template>

	<xsl:include href="udata://core/importSkinXsl/list.modify.xsl"/>
	<xsl:include href="udata://core/importSkinXsl/list.modify.custom.xsl"/>

</xsl:stylesheet>