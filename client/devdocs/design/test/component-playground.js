/**
 * @jest-environment jsdom
 */

import { shallow } from 'enzyme';
import React from 'react';
import { LiveProvider } from 'react-live';
import ComponentPlayground from '../component-playground';

jest.mock( 'calypso/devdocs/design/playground-scope', () => 'PlaygroundScope' );

describe( 'ComponentPlayground', () => {
	test( 'LiveProvider should use the components scope by default', () => {
		const wrapper = shallow(
			<ComponentPlayground section="foo" code="foo" name="foo" url="foo" />
		);
		const liveProvider = wrapper.find( LiveProvider );
		expect( liveProvider.props().scope ).toBe( 'PlaygroundScope' );
	} );
} );
