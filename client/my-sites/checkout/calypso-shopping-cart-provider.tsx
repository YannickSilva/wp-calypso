/**
 * External dependencies
 */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	ShoppingCartProvider,
	useShoppingCart,
	getEmptyResponseCart,
} from '@automattic/shopping-cart';
import type { RequestCart } from '@automattic/shopping-cart';

/**
 * Internal Dependencies
 */
import wp from 'calypso/lib/wp';
import useCartKey from './use-cart-key';
import CartMessages from 'calypso/my-sites/checkout/cart/cart-messages';
import { isUserLoggedIn } from 'calypso/state/current-user/selectors';

const wpcomGetCart = ( cartKey: string ) => wp.req.get( `/me/shopping-cart/${ cartKey }` );
const wpcomSetCart = ( cartKey: string, cartData: RequestCart ) =>
	wp.req.post( `/me/shopping-cart/${ cartKey }`, cartData );

const emptyCart = getEmptyResponseCart();

// A convenience wrapper around ShoppingCartProvider to set the necessary props for calypso
export default function CalypsoShoppingCartProvider( {
	children,
}: {
	children: React.ReactNode;
} ): JSX.Element {
	const isLoggedOutCart = ! useSelector( isUserLoggedIn );
	const currentUrlPath = window.location.pathname;
	const searchParams = new URLSearchParams( window.location.search );
	const jetpackPurchaseToken = searchParams.has( 'purchasetoken' );
	const jetpackPurchaseNonce = searchParams.has( 'purchaseNonce' );
	const isJetpackCheckout =
		currentUrlPath.includes( '/checkout/jetpack' ) &&
		isLoggedOutCart &&
		( !! jetpackPurchaseToken || !! jetpackPurchaseNonce );
	const isNoSiteCart =
		isJetpackCheckout ||
		( ! isLoggedOutCart &&
			currentUrlPath.includes( '/checkout/no-site' ) &&
			'no-user' === searchParams.get( 'cart' ) );

	const getCart = isLoggedOutCart || isNoSiteCart ? () => Promise.resolve( emptyCart ) : undefined;

	const defaultCartKey = useCartKey();

	const options = useMemo(
		() => ( {
			refetchOnWindowFocus: true,
		} ),
		[]
	);

	return (
		<ShoppingCartProvider
			cartKey={ defaultCartKey }
			getCart={ getCart || wpcomGetCart }
			setCart={ wpcomSetCart }
			options={ options }
		>
			<CalypsoShoppingCartMessages />
			{ children }
		</ShoppingCartProvider>
	);
}

function CalypsoShoppingCartMessages() {
	const { responseCart, isLoading } = useShoppingCart();
	return <CartMessages cart={ responseCart } isLoadingCart={ isLoading } />;
}
