/**
 * External dependencies
 *
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import React from 'react';
import { SiteOffsetContext, contextTypeLoaded } from './context';

export const withApplySiteOffset = createHigherOrderComponent( ( WrappedComponent ) => {
	return function WithApplySiteOffset( props ) {
		return (
			<SiteOffsetContext.Consumer>
				{ ( applySiteOffset ) => (
					<WrappedComponent { ...props } applySiteOffset={ applySiteOffset } />
				) }
			</SiteOffsetContext.Consumer>
		);
	};
}, 'WithApplySiteOffset' );

export const useApplySiteOffset = () => {
	return React.useContext( SiteOffsetContext );
};

export type applySiteOffsetType = contextTypeLoaded;
