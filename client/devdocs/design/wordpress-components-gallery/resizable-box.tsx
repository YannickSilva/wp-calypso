import { Flex, FlexItem, ResizableBox } from '@wordpress/components';
import React, { useState } from 'react';

const ResizableBoxExample = () => {
	const [ attributes, setAttributes ] = useState( {
		height: 200,
		width: 400,
	} );
	const { height, width } = attributes;

	return (
		<div style={ { margin: 30 } }>
			<ResizableBox
				showHandle
				minHeight={ 50 }
				minWidth={ 50 }
				enable={ {
					top: false,
					right: true,
					bottom: true,
					left: false,
					topRight: false,
					bottomRight: true,
					bottomLeft: false,
					topLeft: false,
				} }
				size={ {
					height,
					width,
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes( {
						height: height + delta.height,
						width: width + delta.width,
					} );
				} }
			>
				<Flex
					align="center"
					justify="center"
					style={ {
						background: '#eee',
						height: '100%',
						width: '100%',
					} }
				>
					<FlexItem>Resize me!</FlexItem>
				</Flex>
			</ResizableBox>
		</div>
	);
};

export default ResizableBoxExample;
