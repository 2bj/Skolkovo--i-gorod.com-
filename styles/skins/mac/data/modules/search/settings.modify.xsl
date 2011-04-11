<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="group[@name = 'info']" mode="settings.modify">
		<script type="text/javascript">
			function rebuildSearchIndex() {
				var partialQuery = function () {
					$.get('/admin/search/partialReindex.xml', null, function (data) {
						var current = $('index-status', data).attr('current');
						var total = $('index-status', data).attr('total');
						
						if(current != total) {
							$('#search-reindex-log').html(getLabel('js-search-reindex-pages-updated') + current);
							partialQuery();
						} else window.location.reload();
					});
				};
				
				partialQuery();
			
				openDialog({
					'title': getLabel('js-search-reindex-header'),
					'text': getLabel('js-search-reindex') + '<p id="search-reindex-log" />',
					'stdButtons': false
				});
				return false;
			}
		</script>
	
	
		<div class="panel">
			<div class="header" onclick="panelSwitcher(this);">
				<span>
					<xsl:value-of select="@label" />
				</span>
				<div class="l" /><div class="r" />
			</div>
			<div class="content">
				<table class="tableContent">
					<tbody>
						<xsl:apply-templates select="option" mode="settings.modify" />
					</tbody>
				</table>
				
				<div class="buttons">
					<div>
						<input type="submit" value="&label-search-reindex;"
							onclick="return rebuildSearchIndex();"
						/>
						<span class="l" /><span class="r" />
					</div>
					
					<div>
						<input type="submit" value="&label-search-empty;"
							onclick="window.location = '{$lang-prefix}/admin/search/truncate/'; return false;"
						/>
						<span class="l" /><span class="r" />
					</div>
				</div>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>