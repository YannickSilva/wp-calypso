/**
 * External dependencies
 */
import React, { useState, useCallback, ReactElement } from 'react';
import { useTranslate, TranslateResult } from 'i18n-calypso';
import classnames from 'classnames';
import Gridicon from 'calypso/components/gridicon';

/**
 * Internal dependencies
 */
import { Card } from '@automattic/components';
import FormattedHeader from 'calypso/components/formatted-header';
import FormTextInput from 'calypso/components/forms/form-text-input';

interface Choice {
	id: string;
	answerText: TranslateResult;
	hasTextInput?: boolean;
}

interface JetpackCancellationSurveyProps {
	onAnswerChange: ( answerId: string | null, answerText: TranslateResult | string ) => void;
}

export default function JetpackCancellationSurvey( {
	onAnswerChange,
}: JetpackCancellationSurveyProps ): ReactElement {
	const translate = useTranslate();
	const [ selectedAnswerId, setSelectedAnswerId ] = useState< string | null >( null );
	const [ customAnswerText, setCustomAnswerText ] = useState< string >( '' );
	const customAnswerInputRef = React.useRef< HTMLInputElement | null >();

	const choices: Choice[] = [
		{
			id: 'too-expensive',
			answerText: translate( 'The plan was too expensive.' ),
		},
		{
			id: 'want-to-downgrade',
			answerText: translate( "I'd like to downgrade to another plan." ),
		},
		{
			id: 'upgrade-by-mistake',
			answerText: translate( "This upgrade didn't include what I needed." ),
		},
		{
			id: 'could-not-activate',
			answerText: translate( 'I was unable to activate or use the product.' ),
		},
	];

	const choiceOther: Choice = {
		id: 'another-reason',
		answerText: translate( 'Other:' ),
	};

	const selectAnswer = useCallback(
		( answerId: string, answerText: TranslateResult | string ) => {
			// prevent from changing the answer text to choiceOther.answerText just by clicking on it
			const surveyAnswerText =
				choiceOther.id === answerId && customAnswerText ? customAnswerText : answerText;

			setSelectedAnswerId( answerId );
			onAnswerChange( answerId, surveyAnswerText );
		},
		[ choiceOther.id, customAnswerText, onAnswerChange, setSelectedAnswerId ]
	);

	const onChangeCustomAnswerText = useCallback(
		( event: React.ChangeEvent< HTMLInputElement > ) => {
			const { value } = event.target;

			onAnswerChange( selectedAnswerId, value );
			setCustomAnswerText( value );
		},
		[ selectedAnswerId, onAnswerChange, setCustomAnswerText ]
	);

	const renderChoiceCard = ( choice: Choice ): ReactElement => {
		return (
			<Card
				className={ classnames( 'jetpack-cancellation-survey__card', {
					'is-selected': choice.id === selectedAnswerId,
				} ) }
				tagName="button"
				onClick={ () => selectAnswer( choice.id, choice.answerText ) }
				key={ choice.id }
			>
				<div className="jetpack-cancellation-survey__card-content">
					<span>{ choice.answerText }</span>
				</div>
				<Gridicon icon="chevron-right" size={ 12 } />
			</Card>
		);
	};

	return (
		<div className="jetpack-cancellation-survey__content">
			<FormattedHeader
				headerText={ translate( 'Before you go, help us improve Jetpack' ) }
				subHeaderText={ translate( 'Please let us know why you are cancelling.' ) }
				align="center"
			/>
			{ choices.map( renderChoiceCard ) }

			{ /* The card for the 'other' option */ }
			<Card
				className={ classnames( 'jetpack-cancellation-survey__card', {
					'is-selected': choiceOther.id === selectedAnswerId,
				} ) }
				tagName="button"
				onClick={ () => {
					selectAnswer( choiceOther.id, choiceOther.answerText );
					customAnswerInputRef?.current?.focus();
				} }
				key={ choiceOther.id }
			>
				<div className="jetpack-cancellation-survey__card-content">
					<span>{ choiceOther.answerText }</span>
					<FormTextInput
						inputRef={ customAnswerInputRef }
						className="jetpack-cancellation-survey__choice-item-text-input"
						value={ customAnswerText }
						onChange={ onChangeCustomAnswerText }
						placeholder={ translate( 'share your experience' ) }
					/>
				</div>
				<Gridicon icon="chevron-right" size={ 12 } />
			</Card>
		</div>
	);
}
