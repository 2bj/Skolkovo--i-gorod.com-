<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM	"ulang://common">

<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xlink="http://www.w3.org/TR/xlink"
	exclude-result-prefixes="xlink">
	
	<xsl:template match="/">
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=8" />
				<title>
					<xsl:value-of select="$title" />
				</title>

				<link type="text/css" rel="stylesheet" href="/styles/skins/mac/design/css/style.css" />
				<link type="text/css" rel="stylesheet" href="/js/jquery/jquery.jgrowl.css" />
				
				<script type="text/javascript" language="javascript" src="/js/jquery/jquery-1.4.1.min.js"></script>
				<script type="text/javascript" language="javascript" src="/js/jquery/jquery-ui-1.7.2.custom.min.js"></script>
				<script type="text/javascript" language="javascript" src="/js/jquery/jquery-ui-i18n.min.js"></script>
				<script type="text/javascript" src="/js/jquery/jquery.umipopups.js" charset="utf-8" />
				<script type="text/javascript" language="javascript" src="/js/jquery/jquery.contextmenu.js"></script>

				<script type="text/javascript" language="javascript" src="/js/jquery/jquery.jgrowl_minimized.js"></script>
				
				
				<xsl:choose>
					<xsl:when test="$module='webforms'">
						<script type="text/javascript" src="/ulang/{$iface-lang}/common/content/date/data/{$module}?js" charset="utf-8" />
					</xsl:when>
					<xsl:otherwise>
						<script type="text/javascript" src="/ulang/{$iface-lang}/common/content/date/{$module}?js" charset="utf-8" />						
					</xsl:otherwise>
				</xsl:choose>

				
				<script type="text/javascript" language="javascript" src="/styles/common/js/compressed.js"></script>
				<script type="text/javascript" language="javascript" src="/styles/skins/mac/design/js/scripts.js"></script>
				<script	type="text/javascript" src="/js/smc/compressed.js"></script>				
				
				<script type="text/javascript">
					window.pre_lang = '<xsl:value-of select="$lang-prefix" />';
					window.domain = '<xsl:value-of select="$domain" />';
					window.domain_id = '<xsl:value-of select="$domain-id" />';
					window.lang_id  = '<xsl:value-of select="$lang-id" />';
					window.is_page  = <xsl:value-of select="boolean(/result/data/page)" />;
					window.is_new   = <xsl:value-of select="boolean(not(/result/data/*/@id))" />;
					window.page_id  = <xsl:choose><xsl:when test="/result/data/page/@id"><xsl:value-of select="/result/data/page/@id" /></xsl:when><xsl:otherwise>0</xsl:otherwise></xsl:choose>;
					window.settingsStoreData = <xsl:apply-templates select="document('udata://users/loadUserSettings/')" mode="settings-store" />;
				</script>
				
				<style>
					table.tableContent a.delete {
						width: 16px;
						height: 16px;
						display: block;
						background-image: url('/images/cms/admin/mac/ico_del.gif');
						margin-left: 45%;
					}
					
					table.tableContent a.subitems {
						width: 24px;
						height: 24px;
						display: block;
						background-image: url('/images/cms/admin/mac/ico_edit.gif');
						margin-left: 45%;
					}
				
					table.tableContent a.delete *, table.tableContent a.subitems * {
						display: none;
					}
				</style>

				<xsl:if	test="count(//field[@type =	'wysiwyg'])">
					<xsl:call-template name="tinymce-js"/>
				</xsl:if>
			</head>
			<body>
				<div id="main">
					<div id="quickpanel">
						<a id="exit" href="/admin/users/logout/" title="Выход">
							<xsl:text>&#160;</xsl:text>
						</a>
						<a id="help" target="_blank" href="http://help.umi-cms.ru/" title="Документация">
							<xsl:text>&#160;</xsl:text>
						</a>
						
						<xsl:apply-templates select="$site-langs" />
						
						<div id="butterfly" title="&modules;">
							<xsl:text>&#160;</xsl:text>
							<div>
								<div class="bg">
									<xsl:apply-templates select="$modules-menu" />
									<div class="clear" />
								</div>
								<div class="bottom_bg" />
							</div>
						</div>
						
						<xsl:call-template name="panel-buttons" />
					</div>
					<div id="dock">
						<div></div>
						<img src="/images/cms/admin/mac/common/doc_close.png" />
					</div>
					<div id="head">
						<img src="/images/cms/admin/mac/icons/big/{$module}.png" />
						<xsl:apply-templates select="$navibar" />
						
						<xsl:if test="$modules-menu/items/item[@name = $module and @config = 'config'] and $method != 'trash'">
							<a id="settings" href="{$lang-prefix}/admin/{$module}/config/">
								<xsl:text>&config;</xsl:text>
							</a>
						</xsl:if>
						
						<div class="help" />
						<div class="clear" />
					</div>
					
					<xsl:apply-templates select="$errors" />
					
					<div id="page">
						<div id="info_block" class="panel" style="display: none;">
							<div class="header">
								<xsl:text>&label-quick-help;</xsl:text>
								<div class="l" /><div class="r" />
							</div>
							<div class="content" title="{$context-manul-url}">
							</div>
						</div>
						<div id="content" class="content-expanded">
							<div style="float:left; width:100%; _float:none;">
								<xsl:apply-templates select="result" mode="tabs" />
							</div>
						</div>
						<div class="clear" />
					</div>
				</div>
				<div id="foot">
					<a target="_blank" href="http://www.umi-cms.ru/support" id="support">
						<xsl:text>&support; </xsl:text>
						<span>
							<xsl:text>&umi-cms-site;</xsl:text>
						</span>
					</a>
					<a href="http://www.umi-cms.ru" id="copy">
						<xsl:text>© &copyright; &cms-name;</xsl:text>
					</a>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>