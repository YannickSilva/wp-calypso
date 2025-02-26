/**
 * Internal dependencies
 */
import { SITE_LAUNCH } from 'calypso/state/action-types';
import 'calypso/state/data-layer/wpcom/sites/launch';
import isUnlaunchedSite from 'calypso/state/selectors/is-unlaunched-site';
import { getSiteSlug, isCurrentPlanPaid, getSiteOption } from 'calypso/state/sites/selectors';
import { getDomainsBySiteId } from 'calypso/state/sites/domains/selectors';

export const launchSite = ( siteId ) => ( {
	type: SITE_LAUNCH,
	siteId,
	meta: {
		dataLayer: {
			trackRequest: true,
			requestKey: `${ SITE_LAUNCH }-${ siteId }`,
		},
	},
} );

export const launchSiteOrRedirectToLaunchSignupFlow = ( siteId ) => ( dispatch, getState ) => {
	if ( ! isUnlaunchedSite( getState(), siteId ) ) {
		return;
	}

	const isAnchorPodcast = getSiteOption( getState(), siteId, 'anchor_podcast' );
	const isPaidWithDomain =
		isCurrentPlanPaid( getState(), siteId ) && getDomainsBySiteId( getState(), siteId ).length > 1;

	if ( isPaidWithDomain || isAnchorPodcast ) {
		dispatch( launchSite( siteId ) );
		return;
	}

	const siteSlug = getSiteSlug( getState(), siteId );

	// TODO: consider using the `page` library instead of calling using `location.href` here
	window.location.href = `/start/launch-site?siteSlug=${ siteSlug }`;
};
