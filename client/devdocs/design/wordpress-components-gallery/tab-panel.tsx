import { TabPanel } from '@wordpress/components';
import React from 'react';

const TabPanelExample = () => (
	<TabPanel
		tabs={ [
			{
				name: 'tab1',
				title: 'Tab 1',
				className: 'tab-one',
			},
			{
				name: 'tab2',
				title: 'Tab 2',
				className: 'tab-two',
			},
		] }
	>
		{ ( tab ) => <p>Selected tab: { tab.title }</p> }
	</TabPanel>
);

export default TabPanelExample;
