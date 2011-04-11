<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="group[@name = 'snapshots']" mode="settings.modify">
		<xsl:variable name="snapshots" select="document(concat('ufs://', .))/udata"/>
		
		<script type="text/javascript"><![CDATA[
			function reportJsonStatus(msg) {
				$('#snapshots-errors').html($('#snapshots-errors').html() + "<li>" + msg + "</li>");
			}

			function reportJsonError(msg) {
				$('#snapshots-errors').html($('#snapshots-errors').html() + "<li class='error'>" + msg + "</li>");
			}

			function makeJsonRequest(url) {
				$('snapshots-errors').html('');

				var script = document.createElement("script");
				script.charset = "utf-8";
				script.defer = "defer";
				script.src = url;
				/*
				script.onload = function () {
					makeJsonRequest(']]><xsl:value-of select="$lang-prefix" /><![CDATA[/admin/backup/createSnapshot/');
				};
				*/
				document.body.appendChild(script);
			}
			
			function createSnapshot() {
				openDialog({
					'title': getLabel('js-backup-make-header'),
					'text': getLabel('js-backup-make-content'),
					'stdButtons': false
				});
				window.stopJsonRequests = false;
				makeJsonRequest(']]><xsl:value-of select="$lang-prefix" /><![CDATA[/admin/backup/createSnapshot/');
			}
			
		]]></script>
		
		<div class="panel">
			<div class="header" onclick="panelSwitcher(this);">
				<span>
					<xsl:value-of select="@label" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<div class="imgButtonWrapper">
					<a href="#" onclick="createSnapshot()">
						<xsl:text>&label-make-snapshot;</xsl:text>
					</a>
				</div>
				
				<div id="snapshots-errors" />
				
				<div style="clear: left;" />
			
				<table class="tableContent">
					<thead>
						<tr>
							<th>
								<xsl:text>&label-snapshots-files;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-snapshots-unpack;</xsl:text>
							</th>
							
							<th>
								<xsl:text>&label-delete;</xsl:text>
							</th>
						</tr>
					</thead>
					
					<tbody>
						<xsl:apply-templates select="$snapshots" mode="snapshots" />
					</tbody>
				</table>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="udata[count(file) = 0]" mode="snapshots">
		<tr>
			<td colspan="3">
				<p align="center">
					<xsl:text>&label-snapshots-empty;</xsl:text>
				</p>
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="file" mode="snapshots">
		<xsl:variable name="date" select="document(concat('udata://system/convertDate/', @create-time, '/Y-m-d%20H:m:s'))" />
	
		<tr>
			<td>
				<a href="{$lang-prefix}/admin/backup/downloadSnapshot/?filename={@name}" title="&label-download;">
					<strong><xsl:value-of select="@name"/></strong>
				</a><br/>
				<xsl:text>&label-create-time;: </xsl:text>
				<xsl:value-of select="$date/udata"/>
			</td>
			
			<td>
				<a href="" class="restore">
					<span><xsl:text>&label-snapshots-unpack-do;</xsl:text></span>
				</a>
			</td>
			
			<td>
				<a href="{$lang-prefix}/admin/backup/deleteSnapshot/?filename={@name}" class="delete unrestorable">
					<span><xsl:text>&label-delete;</xsl:text></span>
				</a>
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>