import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

import { useState, useRef, useEffect, FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onApplyArticleState: (styles: ArticleStateType) => void;
	onResetArticleState: () => void;
}

export const ArticleParamsForm = ({
	articleState,
	onApplyArticleState: applyStyles,
	onResetArticleState: resetStyles,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null);

	//Локальное состояние формы
	const [fontOption, setFontOption] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColorOption] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColorOption] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	//Синхронизация локального состояния с articleState
	useEffect(() => {
		setFontOption(articleState.fontFamilyOption);
		setFontSize(articleState.fontSizeOption);
		setFontColorOption(articleState.fontColor);
		setBackgroundColorOption(articleState.backgroundColor);
		setContentWidth(articleState.contentWidth);
	}, [articleState]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [sidebarRef]);

	const applyChanges = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newStyles: ArticleStateType = {
			fontFamilyOption: fontOption,
			fontSizeOption: fontSize,
			fontColor,
			backgroundColor,
			contentWidth,
		};
		applyStyles(newStyles);
		setIsSidebarOpen(false);
	};

	const resetForm = () => {
		resetStyles();
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			{isSidebarOpen && (
				<aside
					ref={sidebarRef}
					className={`${styles.container} ${
						isSidebarOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={applyChanges}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={fontOption}
							onChange={setFontOption}
						/>
						<RadioGroup
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={fontSize}
							onChange={setFontSize}
							name='fontSize'
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={fontColor}
							onChange={setFontColorOption}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={backgroundColor}
							onChange={setBackgroundColorOption}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={contentWidth}
							onChange={setContentWidth}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={resetForm}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
