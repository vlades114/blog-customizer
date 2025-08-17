import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	//Инициализация состояния из localStorage
	const [articleState, setArticleState] = useState<ArticleStateType>(() => {
		try {
			const storageArticleStyles = localStorage.getItem('articleState');
			return storageArticleStyles
				? JSON.parse(storageArticleStyles)
				: defaultArticleState;
		} catch {
			return defaultArticleState;
		}
	});

	//Функция для применения новых стилей
	const applyArticleState = (newArticleStyles: ArticleStateType) => {
		setArticleState(newArticleStyles);
		saveArticleStateToLocalStorage(newArticleStyles);
	};

	//Функция для сброса стилей
	const resetArticleState = () => {
		setArticleState(defaultArticleState);
		saveArticleStateToLocalStorage(defaultArticleState);
	};

	const saveArticleStateToLocalStorage = (state: ArticleStateType) => {
		try {
			localStorage.setItem('articleState', JSON.stringify(state));
		} catch (error) {
			console.error('Error writing to local storage:', error);
		}
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				onApplyArticleState={applyArticleState}
				onResetArticleState={resetArticleState}
			/>
			<Article />
		</main>
	);
};
