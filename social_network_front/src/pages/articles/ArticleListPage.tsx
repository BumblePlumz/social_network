import { json, LoaderFunctionArgs, redirect } from 'react-router-dom';
import { BASE_URL } from '@/lib/constants';
import { getAuthToken } from '@/lib/loaders/auth';
import ArticlesList from '@/components/articles/ArticlesList';
import { ARTICLE_OWN } from '@/lib/routes';

const ArticleListPage: React.FC = () => {
  const url = window.location.pathname;
  let listTitle = '';

  switch (url) {
    case '/articles/tous-les-articles':
      listTitle = 'Tous les articles';
      break;
    case '/articles/mes-articles':
      listTitle = 'Mes articles';
      break;
    case '/articles/les-articles-amis':
      listTitle = 'Les articles de mes amis';
      break;
    default:
      listTitle = 'Des articles';
  }

  return (
    <ArticlesList listTitle={listTitle} />
  );
};

export default ArticleListPage;

export async function articlesLoaderAll(): Promise<Response> {
  return fetchArticles('/article'); 
}

export async function articlesLoaderCurrentUser(): Promise<Response> {
  return fetchArticles('/article/me');
}

export async function articlesLoaderSubscribed(): Promise<Response> {
  return fetchArticles('/article/subscribed');
}

export async function articleActionDelete({ params }: LoaderFunctionArgs): Promise<Response> {
  const token = getAuthToken();
  const articleId = params.id;

  try {
    const response = await fetch(BASE_URL + `/article/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) {
      return json({ message: 'Failed to delete article', error: response.statusText }, { status: response.status });
    }

    return redirect(ARTICLE_OWN);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return json({ message: 'An error occurred while deleting the article', error: errorMessage }, { status: 500 });
  }
}

async function fetchArticles(endpoint: string): Promise<Response> {
  const token = getAuthToken();

  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) {
      const errorMsg = `Error ${response.status}: ${response.statusText}`;
      return json({ message: errorMsg }, { status: response.status });
    }
    const articles = await response.json();
    console.log("Articles récupérés :", articles);
    return json(articles);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = error instanceof Response && error.status ? error.status : 500;
    console.error("Erreur lors de la récupération des articles :", errorMessage);
    return json({ message: 'Erreur lors de la récupération des articles', error: errorMessage }, { status: errorStatus });
  }
}