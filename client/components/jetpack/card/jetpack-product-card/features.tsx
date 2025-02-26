import classnames from 'classnames';
import React from 'react';
import FeaturesItem from './features-item';
import type { ProductCardFeatures, ProductCardFeaturesItem } from './types';

export interface Props {
	className?: string;
	features: ProductCardFeatures;
}

const JetpackProductCardFeatures: React.FC< Props > = ( { className, features: { items } } ) => {
	return (
		<section className={ classnames( className, 'jetpack-product-card__features' ) }>
			<ul className="jetpack-product-card__features-list">
				{ ( items as ProductCardFeaturesItem[] ).map( ( item, i ) => (
					<FeaturesItem key={ i } item={ item } />
				) ) }
			</ul>
		</section>
	);
};

export default JetpackProductCardFeatures;
