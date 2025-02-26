import classNames from 'classnames';
import React from 'react';
import EnvironmentBadge, { Branch, DevDocsLink } from 'calypso/components/environment-badge';
import Head from 'calypso/components/head';
import WordPressLogo from 'calypso/components/wordpress-logo';
import { jsonStringifyForHtml } from 'calypso/server/sanitize';
import { chunkCssLinks } from './utils';

class Desktop extends React.Component {
	render() {
		const {
			app,
			entrypoint,
			i18nLocaleScript,
			isRTL,
			lang,
			clientData,
			badge,
			branchName,
			commitChecksum,
			devDocs,
			devDocsURL,
			feedbackURL,
		} = this.props;

		return (
			<html lang={ lang } dir={ isRTL ? 'rtl' : 'ltr' } className={ classNames( 'is-desktop' ) }>
				<Head title="WordPress.com">
					{ chunkCssLinks( entrypoint, isRTL ) }
					<link rel="stylesheet" id="desktop-css" href="/desktop/wordpress-desktop.css" />
				</Head>
				<body className={ classNames( { rtl: isRTL } ) }>
					{ /* eslint-disable wpcalypso/jsx-classname-namespace, react/no-danger */ }
					<div id="wpcom" className="wpcom-site">
						<div className="layout">
							<div className="masterbar" />
							<div className="layout__content">
								<WordPressLogo size={ 72 } className="wpcom-site__logo" />
							</div>
						</div>
					</div>
					{ badge && (
						<EnvironmentBadge badge={ badge } feedbackURL={ feedbackURL }>
							{ branchName && (
								<Branch branchName={ branchName } commitChecksum={ commitChecksum } />
							) }
							{ devDocs && <DevDocsLink url={ devDocsURL } /> }
						</EnvironmentBadge>
					) }

					{ app && (
						<script
							type="text/javascript"
							dangerouslySetInnerHTML={ {
								__html: 'var app = ' + jsonStringifyForHtml( app ),
							} }
						/>
					) }
					{ clientData && (
						<script
							type="text/javascript"
							dangerouslySetInnerHTML={ {
								__html: `var configData = ${ jsonStringifyForHtml( clientData ) };`,
							} }
						/>
					) }

					{ entrypoint.js.map( ( asset ) => (
						<script key={ asset } src={ asset } />
					) ) }
					<script src="/desktop/desktop-app.js" />
					{ i18nLocaleScript && <script src={ i18nLocaleScript } /> }
					<script type="text/javascript">startApp();</script>
					{ /* eslint-enable wpcalypso/jsx-classname-namespace, react/no-danger */ }
				</body>
			</html>
		);
	}
}

export default Desktop;
