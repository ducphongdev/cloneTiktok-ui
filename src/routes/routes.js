import config from '~/config';

// Layouts
import HeaderOnly from '~/Layouts/HeaderOnly';

// Pages
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';
import Live from '~/pages/Live';
// Public Routes
const publicRoutes = [
  {
    path: config.router.home,
    component: Home,
  },
  {
    path: config.router.following,
    component: Following,
  },
  {
    path: config.router.profile,
    component: Profile,
    // layout: HeaderOnly,
  },
  {
    path: config.router.upload,
    component: Upload,
    layout: HeaderOnly,
  },
  {
    path: config.router.search,
    component: Search,
    layout: null,
  },
  {
    path: config.router.live,
    component: Live,
  },
];

const priveateRoutes = [];

export { publicRoutes, priveateRoutes };
