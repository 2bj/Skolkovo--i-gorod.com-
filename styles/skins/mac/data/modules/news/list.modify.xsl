<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/news/" [
        <!ENTITY sys-module        'news'>
        ]>


<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:xlink="http://www.w3.org/TR/xlink">

	<xsl:variable name="feed-types"   select="document('udata://content/getObjectsByTypeList/21/')/udata/items/item"/>
    <xsl:variable name="news-rubrics" select="document('udata://content/getObjectsByBaseTypeList/news/rubric/')/udata/items/item"/>

	<xsl:template match="/result[@method = 'rss_list']/data[@type = 'list' and @action = 'modify']">
		<form action="do/" method="post">
			<table class="tableContent">
				<thead>
					<tr>
						<th>
							<xsl:text>&label-feed-name;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-feed-url;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-feed-type;</xsl:text>
						</th>
						<th>
							<xsl:text>&label-feed-news-rubric;</xsl:text>
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
						<td>
							<input type="text" name="data[new][url]" />
						</td>
						<td>
							<select name="data[new][rss_type]">
								<xsl:apply-templates select="$feed-types" mode="field-select-option" />
							</select>
						</td>
						<td>
							<select name="data[new][news_rubric]" >
								<xsl:apply-templates select="$news-rubrics" mode="field-select-option"/>
							</select>
						</td>
						<td />
					</tr>
				</tbody>
			</table>
			<xsl:call-template name="std-save-button" />
		</form>
	</xsl:template>

	<xsl:template match="/result[@method = 'rss_list']/data/object" mode="list-modify">
        <xsl:variable name="object-info" select="document(concat('uobject://', @id))/udata/object/properties" />

        <tr>
            <td>
                <input type="text" name="data[{@id}][name]" value="{@name}" />
            </td>

            <td>
                <input type="text" name="data[{@id}][url]" value="{$object-info//property[@name = 'url']/value/text()}"  />
            </td>

            <td>
                <select name="data[{@id}][rss_type]" style="width: 97%;">
                    <xsl:apply-templates select="$feed-types" mode="field-select-option">
                        <xsl:with-param name="value" select="$object-info//property[@name = 'rss_type']/value/item/@id"/>
                    </xsl:apply-templates>
                </select>
            </td>

            <td>
                <select name="data[{@id}][news_rubric]">
                    <xsl:apply-templates select="$news-rubrics" mode="field-select-option">
                        <xsl:with-param name="value"
                                        select="$object-info//property[@name = 'news_rubric']/value/item/@id"/>
                    </xsl:apply-templates>
                </select>
            </td>

            <td class="center">
                <input type="checkbox" name="dels[]" value="{@id}" class="check" />
            </td>
        </tr>
    </xsl:template>

	<xsl:template match="item" mode="field-select-option">
		<xsl:param name="value" />
		<option value="{@id}">
			<xsl:if test="$value = @id">
				<xsl:attribute name="selected"><xsl:text>selected</xsl:text></xsl:attribute>
			</xsl:if>
			<xsl:value-of select="." />
		</option>
	</xsl:template>

</xsl:stylesheet>
