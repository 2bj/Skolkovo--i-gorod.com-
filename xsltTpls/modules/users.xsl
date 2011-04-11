<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="result[@module = 'users' and @method = 'registrate']">
		<form method="post" action="/users/registrate_do/">
			<p>
				<xsl:text>Login:</xsl:text>
				<input type="text" name="login" />
			</p>
			
			<p>
				<xsl:text>Password:</xsl:text>
				<input type="text" name="password" />
			</p>
			
			<p>
				<input type="submit" />
			</p>
		</form>
	</xsl:template>
	
	
	<xsl:template match="result[@module = 'users' and (@method = 'login' or @method = 'auth')]">
		<form method="post" action="/users/login_do/">
			<input type="hidden" name="from_page" value="{from_page}" />
			
			<div>
				<label for="login">
					<xsl:text>Логин: </xsl:text>
				</label>
				
				<input type="text" name="login" id="login" />
			</div>
			
			<div>
				<label for="password">
					<xsl:text>Пароль: </xsl:text>
				</label>
				
				<input type="password" name="password" id="password" />
			</div>
			
			<div>
				<input type="submit" />
			</div>
		</form>
	</xsl:template>

</xsl:stylesheet>