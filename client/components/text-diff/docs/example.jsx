import React from 'react';
import TextDiff from 'calypso/components/text-diff';

export default function TextDiffExample() {
	const operations = [
		{
			op: 'del',
			value: 'Old Title.',
		},
		{
			op: 'add',
			value: 'New Title!',
		},
	];

	return (
		<h2>
			<TextDiff operations={ operations } />
		</h2>
	);
}

TextDiffExample.displayName = 'TextDiffExample';
