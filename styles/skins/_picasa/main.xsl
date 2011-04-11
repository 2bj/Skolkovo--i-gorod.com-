<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:photo="http://www.pheed.com/pheed/"
	xmlns:media="http://search.yahoo.com/msrss/"
	exclude-result-prefixes="photo media">
	
	<xsl:output encoding="utf-8" />
	
	<xsl:variable name="domain" select="/result/@domain" />
	<xsl:variable name="header" select="document('udata://core/header')/udata" />

	<xsl:template match="/">
		<html>
			<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
			<title>
				<xsl:text>&cms-name; - &picasa-photos-list;</xsl:text>
			</title>
			
			<script language="javascript">
				function switchMode(input) {
				    if(!input) return false;
				    var divIds = new Array('new', 'add', 'put');
				    
				    for(var i = 0; i &lt; divIds.length; i++) {
				        var id = divIds[i];
				        var obj = document.getElementById(id);
				        
				        if(id == input.value) {
				            obj.style.display = 'block';
				        } else {
				            obj.style.display = 'none';
				        }
				    }
				}
			</script>
			
			<link rel="stylesheet" type="text/css" href="/styles/common/css/picasa.css" />
			
			<body>
				<div class="body">
                    <xsl:apply-templates select="result/data" />
				</div>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="data[@type = 'list' and @action = 'view']">
	    <xsl:apply-templates select="document(concat('ufs://', target-folder))/udata" mode="list">
	        <xsl:with-param name="target-folder" select="target-folder" />
        </xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="udata" mode="list">
	    <xsl:param name="target-folder" />
	    
	    <h1><xsl:text>&picasa-server-photos-list;</xsl:text></h1>
	    <h2><xsl:value-of select="$target-folder" /></h2>
	    
	    <ul>
	        <xsl:apply-templates select="file">
    	        <xsl:with-param name="target-folder" select="$target-folder" />
            </xsl:apply-templates>
        </ul>
    </xsl:template>
    
    <xsl:template match="file">
        <xsl:param name="target-folder" />
        
        <li>
            <a href="/{$target-folder}/{@name}" target="_blank">
                <xsl:apply-templates select="document(concat('udata://system/makeThumbnail/(', $target-folder, '/', @name, ')/200/auto'))/udata" />
            </a>
        </li>
    </xsl:template>
	
	<xsl:template match="udata[@module = 'system' and @method = 'makeThumbnail']">
	    <img src="{src}" width="{width}" height="{height}" />
    </xsl:template>
	
	<xsl:template match="data[@type = 'list' and @action = 'create']">
	    <h1><xsl:value-of select="$header" /></h1>
		
		<form action="/admin/photoalbum/picasa/do/" method="post" name="f">
			<ul class="select-mode">
				<li>
					<input type="radio" name="action-mode" value="new" id="action-new" onclick="javacsript: switchMode(this);" />
					<label for="action-new">
						<xsl:text>&picasa-create-photoalbum;</xsl:text>
					</label>
				</li>
				
				<li>
					<input type="radio" name="action-mode" value="add" id="action-add"  onclick="javacsript: switchMode(this);" checked="checked" />
					<label for="action-add">
						<xsl:text>&picasa-add-to-photoalbum;</xsl:text>
					</label>
				</li>
				
				<li>
					<input type="radio" name="action-mode" value="put" onclick="javacsript: switchMode(this);" id="action-put" />
					<label for="action-put">
						<xsl:text>&picasa-just-upload;</xsl:text>
					</label>
				</li>
			
			</ul>
		
			<div id="new" style="display: none;">
				<label for="new-title">
					<xsl:text>&picasa-new-album-name;</xsl:text>
				</label>
				<input type="text" name="new-title" id="new-title" tabindex="1" class="simple" />
				
				<label for="new-body">
					<xsl:text>&picasa-new-album-description;</xsl:text>
				</label>
				<textarea name="new-body" id="new-body"></textarea>
			</div>
		
			<div id="add">
				<label for="photoalbum-id"><xsl:text>&picasa-choose-album;</xsl:text></label>
				<select name="photoalbum-id" tabindex="1" class="simple">
					<xsl:apply-templates select="document('udata://photoalbum/albums/default/1000')/udata" mode="albums-select" />
				</select>
			</div>
		
			<div id="put" style="display: none;">
				<label for="folder-name">
					<xsl:text>&picasa-choose-upload-folder;</xsl:text>
				</label>
				
				<xsl:text>./images/cms/data/</xsl:text>
				<input type="text" name="folder-name" value="picasa" tabindex="1" class="simple" />
			</div>
			
			<p>
			    <input type="submit" class="submit" value="&picasa-submit;" />
			    <input type="button" class="submit" value="&picasa-cancel;" onclick="location.href = 'minibrowser:close'" />
			</p>
			
			<xsl:apply-templates />
		</form>
    </xsl:template>
	
	<xsl:template match="rss">
		<h2>
			<xsl:text>&picasa-photos-list;</xsl:text>
		</h2>
		<xsl:apply-templates select="channel" />
	</xsl:template>
	
	<xsl:template match="channel">
		<ul class="photos">
			<xsl:apply-templates select="item" />
		</ul>
	</xsl:template>
	
	<xsl:template match="item">
		<li>
			<xsl:apply-templates select="media:group/media:thumbnail" />
			<input type="text" name="title[]" value="{title}" />
		</li>
	</xsl:template>
	
	<xsl:template match="media:thumbnail">
		<xsl:variable name="src" select="../media:content[@isDefault = 'true']/@url" />
		
		<a href="{$src}" target="_blank">
			<img src="{@url}" width="{@width}" height="{@height}" />
		</a>
		<input type="hidden" name="{$src}?size=640" />
	</xsl:template>
	
	<xsl:template match="udata" mode="albums-select">
		<xsl:apply-templates select="items/item" mode="albums-select" />
	</xsl:template>
	
	<xsl:template match="item" mode="albums-select">
		<option value="{@id}">
			<xsl:value-of select="." />
		</option>
	</xsl:template>
	
</xsl:stylesheet>