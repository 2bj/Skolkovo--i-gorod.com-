<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common">
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:umi="http://www.umi-cms.ru/TR/umi">
	
	<xsl:template match="data[@action = 'create']//field[@type = 'boolean'][@name = 'show_submenu']" mode="form-modify">
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

	<xsl:template match="data[@type='form' and @action = 'modify']/template" mode="form-modify" priority="2">
		<form method="post" action="do/" enctype="multipart/form-data">
			<input type="hidden" name="referer" value="{/result/@referer-uri}" id="form-referer" />
			<input type="hidden" name="domain" value="{$domain-floated}"/>
			
			<div class="panel properties-group">
				<div class="header">
					<span>
						<xsl:text>&group-template-props;</xsl:text>
					</span>
					<div class="l" /><div class="r" />
				</div>
				
				<div class="content">
					<div class="field">
						<label>
							<span class="label">
								<acronym>
									<xsl:text>&label-template-name;</xsl:text>
								</acronym>
							</span>
							<span>
								<input type="text" name="name" value="{@title}">
								</input>
							</span>
						</label>
					</div>
					
					<div class="field">
						<label>
							<span class="label">
								<acronym>
									<xsl:text>&label-template-filename;</xsl:text>
								</acronym>
							</span>
							<span>
								<input type="text" name="filename" value="{@filename}">
								</input>
							</span>
						</label>
					</div>
					
					<xsl:apply-templates select="used-pages" />
					
					<xsl:call-template name="std-form-buttons" />
				</div>
			</div>
		</form>
	</xsl:template>
	
	<xsl:template match="used-pages">
		<div class="field symlink" id="UsedPages" name="used_pages[]">
			<label for="symlinkInputUsedPages">
				<span class="label">
					<acronym>
						<xsl:text>&label-template-used-pages;</xsl:text>
					</acronym>
				</span>
				<span id="symlinkInputUsedPages">
					<ul>
						<xsl:apply-templates select="page" mode="symlink" />
					</ul>
				</span>
			</label>
		</div>
	</xsl:template>
</xsl:stylesheet>