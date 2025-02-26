import { Card } from '@automattic/components';
import { ToggleControl } from '@wordpress/components';
import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostShare from 'calypso/blocks/post-share';
import QueryPosts from 'calypso/components/data/query-posts';
import QuerySitePlans from 'calypso/components/data/query-site-plans';
import QuerySites from 'calypso/components/data/query-sites';
import Notice from 'calypso/components/notice';
import { getCurrentUser } from 'calypso/state/current-user/selectors';
import { getSitePosts } from 'calypso/state/posts/selectors';
import { getSite, getSitePlanSlug } from 'calypso/state/sites/selectors';

class PostShareExample extends Component {
	state = {
		isEnabled: false,
	};

	toggleEnable = () => this.setState( { isEnabled: ! this.state.isEnabled } );

	render() {
		const { planSlug, post, site, siteId } = this.props;

		return (
			<div>
				{ siteId && <QuerySites siteId={ siteId } /> }
				{ siteId && <QuerySitePlans siteId={ siteId } /> }
				{ siteId && <QueryPosts siteId={ siteId } query={ { number: 1, type: 'post' } } /> }

				{ site && post && (
					<p>
						Site: <strong>{ site.name }</strong> ({ siteId })<br />
						Plan: <strong>{ planSlug }</strong>
						<br />
						Post: <em>{ post.title }</em>
						<br />
					</p>
				) }

				<ToggleControl
					onChange={ this.toggleEnable }
					checked={ this.state.isEnabled }
					label="Live Sharing Enabled"
				/>

				{ this.state.isEnabled && (
					<Notice
						status="is-warning"
						showDismiss={ false }
						text={ `Keep in mind that you are able to share the '${ post.title }' post now. Be careful!` }
					/>
				) }

				<hr />

				<Card>
					<PostShare disabled={ ! this.state.isEnabled } post={ post } siteId={ siteId } />
				</Card>
			</div>
		);
	}
}

const ConnectedPostShareExample = connect( ( state ) => {
	const user = getCurrentUser( state );
	const siteId = get( user, 'primary_blog' );
	const site = getSite( state, siteId );
	const posts = getSitePosts( state, siteId );
	const post = posts && posts[ posts.length - 1 ];
	const planSlug = getSitePlanSlug( state, siteId );

	return {
		siteId,
		planSlug,
		post,
		site,
	};
} )( PostShareExample );

ConnectedPostShareExample.displayName = 'PostShare';

export default ConnectedPostShareExample;
