import { useNavigate, useSubmit } from 'react-router-dom';
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Article } from '@/types/article';
import { cn } from '@/lib/utils';
import { getId } from '@/lib/loaders/auth';

interface ArticleCardProps {
  article: Article;
  maxLength?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, maxLength = undefined }) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  let author = 'anonymous';
  const userID = getId();

  if (article.author.firstname || article.author.lastname) {
    author = `${article.author.firstname} ${article.author.lastname}`;
  }

  function onDelete() {
    const proceed = confirm('Voulez-vous vraiment supprimer cet article ?');
    if (proceed) {
      submit(null, { action: `/articles/${article.id}/delete`, method: 'DELETE' });
    }
  }

  function onEdit() {
    navigate(`/articles/${article.id}`, { state: { article } });
  }

  function onSubscribe() {
    alert('Souscription non implémentée');
  }

  const truncateText = (text: string, maxLength: number) => text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <Card className="flex flex-col justify-around my-4 p-4 border rounded-lg shadow-md text-center min-h-[325px]">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{article.title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">Par {author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-gray-700"> {maxLength ? truncateText(article.content, maxLength) : article.content}</p>
      </CardContent>
      <CardFooter className={cn('flex flex-row justify-center')}>
        <div className="mt-4 flex space-x-2">
          {article.author.id !== userID && (
            <Button className={cn('bg-white border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer')} onClick={onSubscribe} variant="outline">
              S'abonner
            </Button>
          )}
          {article.author.id === userID && (
            <>
              <Button className={cn('bg-blue-600 text-white hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500 cursor-pointer')} onClick={onDelete}>
                Supprimer
              </Button>
              <Button className={cn('bg-white border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer')} onClick={onEdit}>
                Éditer
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
