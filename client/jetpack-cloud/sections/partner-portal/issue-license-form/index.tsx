import { Button, Card } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';
import page from 'page';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectDropdown from 'calypso/components/select-dropdown';
import { addQueryArgs } from 'calypso/lib/url';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import { errorNotice } from 'calypso/state/notices/actions';
import useIssueLicenseMutation from 'calypso/state/partner-portal/licenses/hooks/use-issue-license-mutation';
import useProductsQuery from 'calypso/state/partner-portal/licenses/hooks/use-products-query';
import { APIProductFamily } from 'calypso/state/partner-portal/types';
import './style.scss';

interface ProductOption {
	value: string;
	label: string;
}

function selectProductOptions( families: APIProductFamily[] ): ProductOption[] {
	return families.flatMap( ( family ) =>
		family.products.map( ( product ) => ( {
			value: product.slug,
			label: product.name,
		} ) )
	);
}

export default function IssueLicenseForm(): ReactElement {
	const translate = useTranslate();
	const dispatch = useDispatch();
	const products = useProductsQuery( {
		select: selectProductOptions,
	} );
	const issueLicense = useIssueLicenseMutation( {
		onSuccess: ( license ) => {
			page.redirect(
				addQueryArgs( { highlight: license.license_key }, '/partner-portal/licenses' )
			);
		},
		onError: ( error: Error ) => {
			dispatch( errorNotice( error.message ) );
		},
	} );
	const [ product, setProduct ] = useState( '' );

	const onSelectProduct = useCallback(
		( option ) => {
			dispatch(
				recordTracksEvent( 'calypso_partner_portal_issue_license_product_select', {
					product: option.value,
				} )
			);
			setProduct( option.value );
		},
		[ setProduct ]
	);

	const onIssueLicense = useCallback( () => {
		dispatch( recordTracksEvent( 'calypso_partner_portal_issue_license_submit', { product } ) );
		issueLicense.mutate( { product } );
	}, [ dispatch, product, issueLicense.mutate ] );

	useEffect( () => {
		// Make sure we keep product in sync with the query results.
		if ( ! products.data || products.data.length === 0 ) {
			return;
		}

		const found = products.data.find( ( option ) => option.value === product );

		if ( ! found ) {
			setProduct( products.data[ 0 ].value );
		}
	}, [ product, products.data, setProduct ] );

	const onGoBack = () => {
		dispatch( recordTracksEvent( 'calypso_partner_portal_issue_license_back' ) );
	};

	return (
		<Card className="issue-license-form">
			<p>{ translate( 'Select a product you want to issue a license for' ) }</p>

			{ products.isLoading && <div className="issue-license-form__placeholder" /> }

			{ ! products.isLoading && (
				<SelectDropdown
					initialSelected={ product }
					options={ products.data }
					onSelect={ onSelectProduct }
				/>
			) }

			<div className="issue-license-form__actions">
				<Button
					href="/partner-portal/licenses"
					disabled={ issueLicense.isLoading }
					onClick={ onGoBack }
				>
					{ translate( 'Go back' ) }
				</Button>

				<Button
					primary
					busy={ issueLicense.isLoading }
					disabled={ products.isLoading }
					onClick={ onIssueLicense }
				>
					<span>{ translate( 'Issue License' ) }</span>
				</Button>
			</div>
		</Card>
	);
}
