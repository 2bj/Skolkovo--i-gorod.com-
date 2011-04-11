<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="data[@type = 'list' and @action = 'modify']">
		<div class="panel">
			<div class="header">
				<span>
					<xsl:text>&header-data-config;</xsl:text>
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<form action="do/" method="post" enctype="multipart/form-data">
					<table class="tableContent">
						<thead>
							<tr>
								<th>
									<xsl:text>&label-name;</xsl:text>
								</th>

								<th>
									<xsl:text>&label-module;</xsl:text>
								</th>

								<th>
									<xsl:text>&label-method;</xsl:text>
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
									<input type="text" name="data[new][module]" />
								</td>

								<td>
									<input type="text" name="data[new][method]" />
								</td>

								<td />
							</tr>
						</tbody>
					</table>
					<xsl:call-template name="std-save-button" />
				</form>
			</div>
		</div>
	</xsl:template>


	<xsl:template match="/result[@method='guide_items']/data[@type = 'list' and @action = 'modify']">
		<div class="imgButtonWrapper">
			<a class="smc-fast-add" href="{$lang-prefix}/admin/data/guide_item_add/{$param0}/" ref="tree-data-guide_items">
				<xsl:text>&label-guide-item-add;</xsl:text>
			</a>
		</div>
	
		<xsl:call-template name="ui-smc-table">
			<xsl:with-param name="control-params" select="$param0" />
			<xsl:with-param name="content-type" select="'objects'" />
		</xsl:call-template>
	</xsl:template>
</xsl:stylesheet>