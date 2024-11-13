import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ErrorPage from './pages/ErrorPage';
import { tokenLoader } from './lib/loaders/auth';
import { articlesLoaderAll, articlesLoaderCurrentUser, articlesLoaderSubscribed, articleActionDelete } from './pages/articles/ArticleListPage';
import { action as authenticate } from './pages/AuthenticationPage';
import { articleActionEdit } from './pages/articles/ArticlePage';
import { articleActionCreation } from './pages/articles/ArticleCreationPage';
import LogoutPage from './pages/LogoutPage';
import './App.css';
import AuthenticationPage from './pages/AuthenticationPage';
import ArticleListPage from './pages/articles/ArticleListPage';
import AsideLayout from './layouts/AsideLayout';
import ArticleCreationPage from './pages/articles/ArticleCreationPage';
import ArticlePage from './pages/articles/ArticlePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        path: 'articles',
        element: <AsideLayout />,
        children: [
          {
            path: 'tous-les-articles',
            element: <ArticleListPage />,
            loader: articlesLoaderAll,
          },
          {
            path: 'mes-articles',
            element: <ArticleListPage />,
            loader: articlesLoaderCurrentUser,
          },
          {
            path: 'les-articles-amis',
            element: <ArticleListPage />,
            loader: articlesLoaderSubscribed,
          },
          {
            path: 'creation',
            element: <ArticleCreationPage />,
            action: articleActionCreation,
          },
          {
            path: ':id',
            element: <ArticlePage />,
            action: articleActionEdit,
            children: [
              {
                path: 'delete',
                action: articleActionDelete,
              },
            ],
          }
        ],
      },
      {
        element: <AsideLayout />,
        children: [
          // {
          //   path: 'Amis',
          //   element: <FriendPage />,
          //   loader: friendLoader,
          // },
          // {
          //   path: 'Amis/add',
          //   element: <FriendCreationPage />,
          //   action: createFriend,
          // },
          // {
          //   path: 'Amis/delete/:id',
          //   element: <FriendDeletePage />,
          //   action: deleteFriend,
          // }
        ],
      },

      // {
      //   path: 'Profil',
      //   element: <ProfilePage />,
      //   loader: profileLoader,
      // },
    ],
  },
  {
    path: '/authentification',
    element: <AuthenticationPage />,
    action: authenticate,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
