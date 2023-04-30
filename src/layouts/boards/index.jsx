import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Portal } from '@chakra-ui/portal';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import { MdHome } from 'react-icons/md';
import SingleBoard from 'views/boards/dashboards/default/SingleBoard';
// import routes from "routes.js";
import { getBoards } from 'hooks/hooks';
import { useQuery } from 'react-query';
import Dashboard from 'views/boards/dashboards/default';
import { getUser } from 'hooks/hooks';

export default function Board(props) {
  const { ...rest } = props;

  const navigate = useNavigate();

  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState('Board Dashboard');
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  const routes = React.useMemo(() => {
    const defaultRoutes = [
      {
        name: 'Boards',
        path: '/boards',
        icon: <MdHome className="text-inherit h-5 w-5" />,
        collapse: true,
        items: [
          {
            name: 'Main Dashboard',
            layout: '/boards',
            path: '/dashboards/default',
            component: <Dashboard />,
            secondary: true,
          },
        ],
      },
    ];

    if (boardsQuery.isSuccess) {
      const boardIDItem = boardsQuery.data.map((board) => ({
        name: board.title,
        layout: '/boards',
        path: `/${board.$id}`,
        component: <SingleBoard />,
        secondary: true,
      }));
      defaultRoutes[0].items.push(...boardIDItem);
    }

    return defaultRoutes;
  }, [boardsQuery]);

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
    // eslint-disable-next-line
  }, [location.pathname]);
  // functions for changing the states from components
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          setCurrentRoute(routes[i].name);
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  // const getRoutes = (routes) => {

  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/boards") {
  //       return (
  //         <Route path={`${prop.path}`} element={prop.component} key={key} />
  //       );
  //     }
  //     if (prop.collapse) {
  //       return getRoutes(prop.items);
  //     }
  //     if (prop.category) {
  //       return getRoutes(prop.items);
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  document.documentElement.dir = 'ltr';

  if (userQuery.status === 'loading') {
    return <div className="justify-center self-center">Loading...</div>;
  }

  if (userQuery.status === 'error') {
    return navigate('/auth/sign-in/default');
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} routes={routes} user={userQuery.data} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div>
            <Portal>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                logoText={'Bookmark Manager - Atomic House'}
                brandText={currentRoute}
                userData={userQuery.data}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                {...rest}
              />
            </Portal>
            <div className="mx-auto min-h-screen p-2 !pt-[100px] md:p-2">
              <Routes>
                {/* {getRoutes(routes)} */}
                <Route path="/dashboards/default" element={<Dashboard />} />
                <Route
                  path="/"
                  element={<Navigate to="/boards/dashboards/default" replace />}
                />
                <Route path="/:boardId" element={<SingleBoard userQuery={userQuery.data} />} />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
