import { Outlet, useLocation } from 'react-router-dom';
import ArticleAsideMenu from '@/components/articles/ArticleAsideMenu';

const AsideLayout: React.FC = () => {
  const location = useLocation();

  const getMenuItems = () => {
    if (location.pathname.startsWith('/articles')) {
      return <ArticleAsideMenu />;
    } else if (location.pathname.startsWith('/amis')) {
      // Retournez un menu approprié pour la page des amis
      return <div>Menu des amis</div>; // Remplacez par votre composant ou menu spécifique
    } else if (location.pathname.startsWith('/profil')) {
      // Retournez un menu approprié pour la page de profil
      return <div>Menu de profil</div>; // Remplacez par votre composant ou menu spécifique
    }
    return null; // Retournez null si aucun chemin ne correspond
  };
  return (
    <main className="flex flex-row justify-end">
    {/* Menu latéral fixe */}
    <aside className="z-40 fixed top-4 md:top-0 left-0 w-[30%] md:w-[20%] h-full border bg-gray-100">
      {getMenuItems()}
    </aside>
    
    {/* Contenu principal, avec une marge à gauche pour ne pas chevaucher le menu */}
    <article className="ml-[33%] md:ml-[21%] w-2/3 md:w-4/5 m-3">
      <Outlet />
    </article>
  </main>
  );
};

export default AsideLayout;
