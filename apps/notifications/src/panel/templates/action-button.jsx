import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import HotkeyContainer from './container-hotkey';
import Gridicon from './gridicons';

const ActionButton = ( { isActive, hotkey, icon, onToggle, text, title } ) => (
	<HotkeyContainer shortcuts={ hotkey ? [ { hotkey, action: onToggle } ] : null }>
		<button
			className={ classNames( 'wpnc__action-link', {
				'active-action': isActive,
				'inactive-action': ! isActive,
			} ) }
			title={ title }
			onClick={ onToggle }
		>
			<Gridicon icon={ icon } size={ 24 } />
			<p>{ text }</p>
		</button>
	</HotkeyContainer>
);

ActionButton.propTypes = {
	isActive: PropTypes.bool.isRequired,
	hotkey: PropTypes.number,
	icon: PropTypes.string,
	onToggle: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default ActionButton;
