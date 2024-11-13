import { json, redirect, LoaderFunctionArgs } from 'react-router-dom';
import ArticleForm from '@/components/articles/ArticleForm';
import { BASE_URL } from '@/lib/constants';

const ArticleEditingPage: React.FC = () => {
  return (
    <>
      <ArticleForm method='put' />
    </>
  );
};

export default ArticleEditingPage;


export async function articleActionEdit({ request, params }: LoaderFunctionArgs): Promise<Response> {
  const id = params.id;
  const formRequest = await request.formData();

  let url = `${BASE_URL}/article/${id}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: formRequest.get('title'),
      content: formRequest.get('content'),
    }),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) throw json(await response.json(), response.status);
  return redirect('/articles/mes-articles');
}