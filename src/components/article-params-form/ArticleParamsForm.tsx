import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text/Text';

import { OutsideClickHandler } from './OutsideClickHandler';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type Props = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, setArticleState }: Props) => {
	const [formState, setFormState] = useState(articleState);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isFormOpen) {
			setFormState(articleState);
		}
	}, [isFormOpen]);

	const handleChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: option,
			}));
		};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		setIsFormOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsFormOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={formRef}>
				{isFormOpen && (
					<OutsideClickHandler
						isOpen={isFormOpen}
						onClose={() => setIsFormOpen(false)}
						onChange={setIsFormOpen}
						rootRef={formRef}
					/>
				)}
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase as='h3' align='left'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='Цвет текста'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
