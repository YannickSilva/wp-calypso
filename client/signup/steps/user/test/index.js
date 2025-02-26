/**
 * @jest-environment jsdom
 */

import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { UserStep as User } from '../';

const noop = () => {};
const translate = ( string ) => string;

jest.mock( 'calypso/blocks/signup-form', () => require( 'calypso/components/empty-component' ) );
jest.mock( 'calypso/signup/step-wrapper', () => require( 'calypso/components/empty-component' ) );
jest.mock( 'calypso/signup/utils', () => ( {
	getFlowSteps: ( flow ) => {
		let flowSteps = null;

		if ( 'userAsFirstStepInFlow' === flow ) {
			flowSteps = [ 'user' ];
		} else {
			flowSteps = [ 'theme', 'domains', 'user' ];
		}

		return flowSteps;
	},
	getNextStepName: ( x ) => x,
	getStepUrl: ( x ) => x,
	getPreviousStepName: ( x ) => x,
} ) );

describe( '#signupStep User', () => {
	let testElement;
	let rendered;

	test( 'should show community subheader text if User step is first in the flow', () => {
		testElement = React.createElement( User, {
			subHeaderText: 'first subheader message',
			flowName: 'userAsFirstStepInFlow',
			saveSignupStep: noop,
			translate,
		} );
		rendered = TestUtils.renderIntoDocument( testElement );

		expect( rendered.state.subHeaderText ).to.equal( 'Welcome to the WordPress.com community.' );
	} );

	test( 'should show provided subheader text if User step is not first in the flow', () => {
		testElement = React.createElement( User, {
			subHeaderText: 'test subheader message',
			flowName: 'someOtherFlow',
			saveSignupStep: noop,
			translate,
		} );
		rendered = TestUtils.renderIntoDocument( testElement );

		expect( rendered.state.subHeaderText ).to.equal( 'test subheader message' );
	} );

	describe( '#updateComponentProps', () => {
		let node;
		let spyComponentProps;
		let component;

		beforeEach( () => {
			node = document.createElement( 'div' );

			spyComponentProps = sinon.spy( User.prototype, 'UNSAFE_componentWillReceiveProps' );

			const element = React.createElement( User, {
				subHeaderText: 'test subheader message',
				flowName: 'someOtherFlow',
				saveSignupStep: noop,
				translate,
			} );
			component = ReactDOM.render( element, node );
		} );

		afterEach( () => {
			User.prototype.UNSAFE_componentWillReceiveProps.restore();
		} );

		test( 'should show community subheader text when new flow has user as first step', () => {
			const testProps = {
				subHeaderText: 'My test message',
				flowName: 'userAsFirstStepInFlow',
				saveSignupStep: noop,
				translate,
			};

			expect( spyComponentProps.calledOnce ).to.equal( false );

			ReactDOM.render( React.createElement( User, testProps ), node );

			expect( spyComponentProps.calledOnce ).to.equal( true );
			expect( component.state.subHeaderText ).to.equal( 'Welcome to the WordPress.com community.' );
		} );

		test( "should show provided subheader text when new flow doesn't have user as first step", () => {
			const testProps = {
				subHeaderText: 'My test message',
				flowName: 'another test message test',
				saveSignupStep: noop,
				translate,
			};

			expect( spyComponentProps.calledOnce ).to.equal( false );

			ReactDOM.render( React.createElement( User, testProps ), node );

			expect( spyComponentProps.calledOnce ).to.equal( true );
			expect( component.state.subHeaderText ).to.equal( 'My test message' );
		} );
	} );
} );
