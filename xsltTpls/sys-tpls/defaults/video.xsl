<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   
    <xsl:template name="videoplayer">
		<xsl:param name="video-file" />
		<xsl:param name="entity-id"  />
		<xsl:param name="field-name" />
		<xsl:param name="width"	 select="640" />
		<xsl:param name="height" select="360" />
		<xsl:variable name="path" />
			
		<xsl:choose>
			<xsl:when test="$video-file">
				<xsl:call-template name="videoplayer_code_template">
					<xsl:with-param name="path" select="$video-file" />
					<xsl:with-param name="width"  select="$width" />
					<xsl:with-param name="height" select="$height" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="videoplayer_code_template">
					<xsl:with-param name="path" select="document(concat('udata://system/getVideoPlayer/',$entity-id,'/',$field-name,'/'))/udata/path/text()" />
					<xsl:with-param name="width"  select="$width" />
					<xsl:with-param name="height" select="$height" />
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
		
	</xsl:template>

	<xsl:template name="videoplayer_code_template">
		<xsl:param name="path" />
		<xsl:param name="width"	 select="640" />
		<xsl:param name="height" select="360" />

		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
				id="UmiVideoPlayer" width="{$width}" height="{$height}"
				codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
				<param name="movie" value="/images/cms/video/UmiVideoPlayer.swf" />
				<param name="quality" value="high" />
				<param name="bgcolor" value="#869ca7" />
				<param name="allowScriptAccess" value="sameDomain" />
				<param name="allowFullscreen" value="true" />
				<param name="flashVars" value="{concat('video=',$path)}" />
				<embed src="/images/cms/video/UmiVideoPlayer.swf" quality="high" bgcolor="#869ca7"
					width="{$width}" height="{$height}" name="UmiVideoPlayer" align="middle"
					play="true"
					loop="false"					
					allowScriptAccess="sameDomain"
					allowFullscreen="true"
					flashVars="{concat('video=',$path)}"
					type="application/x-shockwave-flash"
					pluginspage="http://www.adobe.com/go/getflashplayer">
				</embed>
		</object>

	</xsl:template>
	
	
	<xsl:template match="property[@type = 'video_file']/value">
		<xsl:call-template name="videoplayer">
			<xsl:with-param name="video-file" select="." />
		</xsl:call-template>
	</xsl:template>

</xsl:stylesheet>
