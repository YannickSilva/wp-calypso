/**
 * External dependencies
 */
import React, { Component } from 'react';
import page from 'page';
import { connect } from 'react-redux';
import { capitalize, find, flow, isEmpty } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'calypso/components/main';
import SidebarNavigation from 'calypso/my-sites/sidebar-navigation';
import DocumentHead from 'calypso/components/data/document-head';
import FormattedHeader from 'calypso/components/formatted-header';
import SectionNav from 'calypso/components/section-nav';
import NavTabs from 'calypso/components/section-nav/tabs';
import NavItem from 'calypso/components/section-nav/item';
import Search from 'calypso/components/search';
import urlSearch from 'calypso/lib/url-search';
import EmptyContent from 'calypso/components/empty-content';
import { fetchPluginData as wporgFetchPluginData } from 'calypso/state/plugins/wporg/actions';
import { getAllPlugins as getAllWporgPlugins } from 'calypso/state/plugins/wporg/selectors';
import PageViewTracker from 'calypso/lib/analytics/page-view-tracker';
import PluginsList from './plugins-list';
import { recordGoogleEvent, recordTracksEvent } from 'calypso/state/analytics/actions';
import PluginsBrowser from './plugins-browser';
import QueryJetpackPlugins from 'calypso/components/data/query-jetpack-plugins';
import NoPermissionsError from './no-permissions-error';
import { canCurrentUser } from 'calypso/state/selectors/can-current-user';
import canCurrentUserManagePlugins from 'calypso/state/selectors/can-current-user-manage-plugins';
import getSelectedOrAllSitesWithPlugins from 'calypso/state/selectors/get-selected-or-all-sites-with-plugins';
import getUpdateableJetpackSites from 'calypso/state/selectors/get-updateable-jetpack-sites';
import hasJetpackSites from 'calypso/state/selectors/has-jetpack-sites';
import {
	canJetpackSiteUpdateFiles,
	isJetpackSite,
	isRequestingSites,
} from 'calypso/state/sites/selectors';
import {
	getSelectedSite,
	getSelectedSiteId,
	getSelectedSiteSlug,
} from 'calypso/state/ui/selectors';
import { getPlugins, isRequestingForSites } from 'calypso/state/plugins/installed/selectors';
import { Button } from '@automattic/components';
import { getVisibleSites, siteObjectsToSiteIds } from 'calypso/my-sites/plugins/utils';

/**
 * Style dependencies
 */
import './style.scss';

export class PluginsMain extends Component {
	componentDidUpdate() {
		const { currentPlugins } = this.props;

		currentPlugins.map( ( plugin ) => {
			const pluginData = this.props.wporgPlugins?.[ plugin.slug ];
			if ( ! pluginData ) {
				this.props.wporgFetchPluginData( plugin.slug );
			}
		} );
	}

	UNSAFE_componentWillReceiveProps( nextProps ) {
		const { hasJetpackSites: hasJpSites, selectedSiteIsJetpack, selectedSiteSlug } = nextProps;

		if ( this.props.isRequestingSites && ! nextProps.isRequestingSites ) {
			// Selected site is not a Jetpack site
			if ( selectedSiteSlug && ! selectedSiteIsJetpack ) {
				page.redirect( `/plugins/${ selectedSiteSlug }` );
				return;
			}

			//  None of the other sites are Jetpack sites
			if ( ! selectedSiteSlug && ! hasJpSites ) {
				page.redirect( '/plugins' );
				return;
			}
		}
	}

	getCurrentPlugins() {
		const { currentPlugins, currentPluginsOnVisibleSites, search, selectedSiteSlug } = this.props;
		let plugins = selectedSiteSlug ? currentPlugins : currentPluginsOnVisibleSites;

		if ( ! plugins ) {
			return plugins;
		}

		if ( search ) {
			plugins = plugins.filter( this.matchSearchTerms.bind( this, search ) );
		}

		return this.addWporgDataToPlugins( plugins );
	}

	// plugins for Jetpack sites require additional data from the wporg-data store
	addWporgDataToPlugins( plugins ) {
		return plugins.map( ( plugin ) => {
			const pluginData = this.props.wporgPlugins?.[ plugin.slug ];
			return Object.assign( {}, plugin, pluginData );
		} );
	}

	matchSearchTerms( search, plugin ) {
		search = search.toLowerCase();
		return [ 'name', 'description', 'author' ].some(
			( attribute ) =>
				plugin[ attribute ] && plugin[ attribute ].toLowerCase().indexOf( search ) !== -1
		);
	}

	getFilters() {
		const { translate } = this.props;
		const siteFilter = this.props.selectedSiteSlug ? '/' + this.props.selectedSiteSlug : '';

		return [
			{
				title: translate( 'All', { context: 'Filter label for plugins list' } ),
				path: '/plugins/manage' + siteFilter,
				id: 'all',
			},
			{
				title: translate( 'Active', { context: 'Filter label for plugins list' } ),
				path: '/plugins/active' + siteFilter,
				id: 'active',
			},
			{
				title: translate( 'Inactive', { context: 'Filter label for plugins list' } ),
				path: '/plugins/inactive' + siteFilter,
				id: 'inactive',
			},
			{
				title: translate( 'Updates', { context: 'Filter label for plugins list' } ),
				path: '/plugins/updates' + siteFilter,
				id: 'updates',
			},
		];
	}

	isFetchingPlugins() {
		return this.props.requestingPluginsForSites;
	}

	getSelectedText() {
		const found = find( this.getFilters(), ( filterItem ) => this.props.filter === filterItem.id );
		if ( 'undefined' !== typeof found ) {
			return found.title;
		}
		return '';
	}

	getSearchPlaceholder() {
		const { translate } = this.props;

		switch ( this.props.filter ) {
			case 'active':
				return translate( 'Search All…', { textOnly: true } );

			case 'inactive':
				return translate( 'Search Inactive…', { textOnly: true } );

			case 'updates':
				return translate( 'Search Updates…', { textOnly: true } );

			case 'all':
				return translate( 'Search All…', { textOnly: true } );
		}
	}

	getEmptyContentUpdateData() {
		const { translate } = this.props;
		const emptyContentData = { illustration: '/calypso/images/illustrations/illustration-ok.svg' };
		const { selectedSite } = this.props;

		if ( selectedSite ) {
			emptyContentData.title = translate(
				'All plugins on %(siteName)s are {{span}}up to date.{{/span}}',
				{
					textOnly: true,
					args: { siteName: selectedSite.title },
					components: { span: <span className="plugins__plugin-list-state" /> },
					comment: 'The span tags prevents single words from showing on a single line.',
				}
			);
		} else {
			emptyContentData.title = translate( 'All plugins are up to date.', { textOnly: true } );
		}

		if ( this.getUpdatesTabVisibility() ) {
			return emptyContentData;
		}

		emptyContentData.action = translate( 'All Plugins', { textOnly: true } );

		if ( selectedSite ) {
			emptyContentData.actionURL = '/plugins/' + selectedSite.slug;
			if ( this.props.selectedSiteIsJetpack ) {
				emptyContentData.illustration = '/calypso/images/illustrations/illustration-jetpack.svg';
				emptyContentData.title = translate( "Plugins can't be updated on %(siteName)s.", {
					textOnly: true,
					args: { siteName: selectedSite.title },
				} );
			} else {
				// buisness plan sites
				emptyContentData.title = translate( 'Plugins are updated automatically on %(siteName)s.', {
					textOnly: true,
					args: { siteName: selectedSite.title },
				} );
			}
		} else {
			emptyContentData.title = translate( 'No updates are available.', { textOnly: true } );
			emptyContentData.illustration =
				'/calypso/images/illustrations/illustration-empty-results.svg';
			emptyContentData.actionURL = '/plugins';
		}

		return emptyContentData;
	}

	getEmptyContentData() {
		const { translate } = this.props;
		let emptyContentData = {
			illustration: '/calypso/images/illustrations/illustration-empty-results.svg',
		};

		switch ( this.props.filter ) {
			case 'active':
				emptyContentData.title = translate( 'No plugins are active.', { textOnly: true } );
				break;
			case 'inactive':
				emptyContentData.title = translate( 'No plugins are inactive.', { textOnly: true } );
				break;
			case 'updates':
				emptyContentData = this.getEmptyContentUpdateData();
				break;
			default:
				return null;
		}
		return emptyContentData;
	}

	getUpdatesTabVisibility() {
		const { selectedSite, updateableJetpackSites } = this.props;

		if ( selectedSite ) {
			return this.props.selectedSiteIsJetpack && this.props.canSelectedJetpackSiteUpdateFiles;
		}

		return updateableJetpackSites.length > 0;
	}

	shouldShowPluginListPlaceholders() {
		return isEmpty( this.getCurrentPlugins() ) && this.isFetchingPlugins();
	}

	renderPageViewTracking() {
		const { selectedSiteId, filter, selectedSiteIsJetpack } = this.props;

		const analyticsPageTitle = filter ? `Plugins > ${ capitalize( filter ) }` : 'Plugins';

		// 'All' view corresponds to '/plugins/manage' path.
		// Other filters appear unchanged in path (eg. Active -> /plugins/active)
		const currentFilter = filter === 'all' ? 'manage' : filter;

		const analyticsPath = selectedSiteId
			? `/plugins/${ currentFilter }/:site`
			: `/plugins/${ currentFilter }`;

		if ( selectedSiteId && ! selectedSiteIsJetpack ) {
			return null;
		}

		return <PageViewTracker path={ analyticsPath } title={ analyticsPageTitle } />;
	}

	renderPluginsContent() {
		const { filter, search } = this.props;

		const currentPlugins = this.getCurrentPlugins();
		const showInstalledPluginList = ! isEmpty( currentPlugins ) || this.isFetchingPlugins();
		const showSuggestedPluginsList = filter === 'all' || ( ! showInstalledPluginList && search );

		if ( ! showInstalledPluginList && ! search ) {
			const emptyContentData = this.getEmptyContentData();
			if ( emptyContentData ) {
				return (
					<EmptyContent
						title={ emptyContentData.title }
						illustration={ emptyContentData.illustration }
						actionURL={ emptyContentData.actionURL }
						action={ emptyContentData.action }
					/>
				);
			}
		}

		const installedPluginsList = showInstalledPluginList && (
			<PluginsList
				header={ this.props.translate( 'Installed Plugins' ) }
				plugins={ currentPlugins }
				pluginUpdateCount={ this.props.pluginUpdateCount }
				isPlaceholder={ this.shouldShowPluginListPlaceholders() }
			/>
		);

		const morePluginsHeader = showInstalledPluginList && showSuggestedPluginsList && (
			<h3 className="plugins__more-header">{ this.props.translate( 'More Plugins' ) }</h3>
		);

		let searchTitle;
		if ( search ) {
			searchTitle = this.props.translate( 'Suggested plugins for: %(searchQuery)s', {
				textOnly: true,
				args: {
					searchQuery: search,
				},
			} );
		}

		const suggestedPluginsList = showSuggestedPluginsList && (
			<PluginsBrowser
				hideSearchForm
				hideHeader
				path={ this.props.context.path }
				search={ search }
				searchTitle={ searchTitle }
				trackPageViews={ false }
			/>
		);

		return (
			<div>
				{ installedPluginsList }
				{ morePluginsHeader }
				{ suggestedPluginsList }
			</div>
		);
	}

	handleAddPluginButtonClick = () => {
		this.props.recordGoogleEvent( 'Plugins', 'Clicked Add New Plugins' );
	};

	renderAddPluginButton() {
		const { selectedSiteSlug, translate } = this.props;
		const browserUrl = '/plugins' + ( selectedSiteSlug ? '/' + selectedSiteSlug : '' );

		return (
			<Button
				className="plugins__button"
				href={ browserUrl }
				onClick={ this.handleAddPluginButtonClick }
			>
				<span className="plugins__button-text">{ translate( 'Browse plugins' ) }</span>
			</Button>
		);
	}

	handleUploadPluginButtonClick = () => {
		this.props.recordTracksEvent( 'calypso_click_plugin_upload' );
		this.props.recordGoogleEvent( 'Plugins', 'Clicked Plugin Upload Link' );
	};

	renderUploadPluginButton() {
		const { selectedSiteSlug, translate } = this.props;
		const uploadUrl = '/plugins/upload' + ( selectedSiteSlug ? '/' + selectedSiteSlug : '' );

		return (
			<Button
				className="plugins__button"
				href={ uploadUrl }
				onClick={ this.handleUploadPluginButtonClick }
			>
				<span className="plugins__button-text">{ translate( 'Install plugin' ) }</span>
			</Button>
		);
	}

	render() {
		if ( ! this.props.isRequestingSites && ! this.props.userCanManagePlugins ) {
			return <NoPermissionsError title={ this.props.translate( 'Plugins', { textOnly: true } ) } />;
		}

		const navItems = this.getFilters().map( ( filterItem ) => {
			if ( 'updates' === filterItem.id && ! this.getUpdatesTabVisibility() ) {
				return null;
			}

			const attr = {
				key: filterItem.id,
				path: filterItem.path,
				selected: filterItem.id === this.props.filter,
			};

			if ( 'updates' === filterItem.id ) {
				attr.count = this.props.pluginUpdateCount;
			}
			return <NavItem { ...attr }>{ filterItem.title }</NavItem>;
		} );

		return (
			<Main wideLayout>
				<DocumentHead title={ this.props.translate( 'Plugins', { textOnly: true } ) } />
				<QueryJetpackPlugins siteIds={ this.props.siteIds } />
				{ this.renderPageViewTracking() }
				<SidebarNavigation />
				<div className="plugins__main">
					<div className="plugins__header">
						<FormattedHeader
							brandFont
							className="plugins__page-heading"
							headerText={ this.props.translate( 'Plugins' ) }
							align="left"
							subHeaderText={ this.props.translate(
								'Add new functionality and integrations to your site with plugins.'
							) }
						/>
						<div className="plugins__main-buttons">
							{ this.renderAddPluginButton() }
							{ this.renderUploadPluginButton() }
						</div>
					</div>
					<div className="plugins__main-header">
						<SectionNav selectedText={ this.getSelectedText() }>
							<NavTabs>{ navItems }</NavTabs>
							<Search
								pinned
								fitsContainer
								onSearch={ this.props.doSearch }
								initialValue={ this.props.search }
								ref={ `url-search` }
								analyticsGroup="Plugins"
								placeholder={ this.getSearchPlaceholder() }
							/>
						</SectionNav>
					</div>
				</div>
				{ this.renderPluginsContent() }
			</Main>
		);
	}
}

export default flow(
	localize,
	urlSearch,
	connect(
		( state, { filter } ) => {
			const sites = getSelectedOrAllSitesWithPlugins( state );
			const selectedSite = getSelectedSite( state );
			const selectedSiteId = getSelectedSiteId( state );
			const visibleSiteIds = siteObjectsToSiteIds( getVisibleSites( sites ) ) ?? [];
			const siteIds = siteObjectsToSiteIds( sites ) ?? [];
			const pluginsWithUpdates = getPlugins( state, siteIds, 'updates' );

			return {
				hasJetpackSites: hasJetpackSites( state ),
				sites,
				selectedSite,
				selectedSiteId,
				selectedSiteSlug: getSelectedSiteSlug( state ),
				selectedSiteIsJetpack: selectedSite && isJetpackSite( state, selectedSiteId ),
				siteIds,
				canSelectedJetpackSiteUpdateFiles:
					selectedSite && canJetpackSiteUpdateFiles( state, selectedSiteId ),
				wporgPlugins: getAllWporgPlugins( state ),
				isRequestingSites: isRequestingSites( state ),
				currentPlugins: getPlugins( state, siteIds, filter ),
				currentPluginsOnVisibleSites: getPlugins( state, visibleSiteIds, filter ),
				pluginUpdateCount: pluginsWithUpdates && pluginsWithUpdates.length,
				requestingPluginsForSites: isRequestingForSites( state, siteIds ),
				updateableJetpackSites: getUpdateableJetpackSites( state ),
				userCanManagePlugins: selectedSiteId
					? canCurrentUser( state, selectedSiteId, 'manage_options' )
					: canCurrentUserManagePlugins( state ),
			};
		},
		{ wporgFetchPluginData, recordTracksEvent, recordGoogleEvent }
	)
)( PluginsMain );
