
import { lazy, Suspense } from 'react';
import './App.css'
import { Routes, Route} from 'react-router';
import { routerMap } from './global/routerMap';

const AppHost = lazy(() => import('@/features/common/appHost/appHost'));
const OrganizerGuard = lazy(() => import('@/features/auth/organizerGuard'));
const HomePage = lazy(() => import('@/features/home/home').then(m => ({ default: m.HomePage })));
const AuthHost = lazy(() => import('@/features/auth/authHost/authHost'));
const CatalogPage = lazy(() => import('@/features/catalog/CatalogPage').then(m => ({ default: m.CatalogPage })));
const VenueDetailPage = lazy(() => import('@/features/catalog/VenueDetailPage').then(m => ({ default: m.VenueDetailPage })));
const ConventionDetailPage = lazy(() => import('@/features/catalog/ConventionDetailPage').then(m => ({ default: m.ConventionDetailPage })));

const Login = lazy(() => import('@/features/auth/authHost/login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('@/features/auth/authHost/signUp').then(m => ({ default: m.Signup })));
function App() {

  return (
    <Suspense fallback={null}>
    <Routes>
        <Route element={<AppHost/>}>
            <Route index path={routerMap.HOME} element={<HomePage/>}/>
            <Route path={routerMap.CATALOG} element={<CatalogPage/>}/>
            <Route path={routerMap.VENUE_DETAIL} element={<VenueDetailPage/>}/>
            <Route path={routerMap.CONVENTION_DETAIL} element={<ConventionDetailPage/>}/>
            <Route path={routerMap.CALENDAR} element={<></>}/>
            <Route path={routerMap.MAPS} element={<></>}/>
            <Route path={routerMap.MENU} element={<></>}/>
            <Route element={<OrganizerGuard/>}>
              <Route path={routerMap.CREATE} element={<></>}/>
              <Route path={routerMap.EDIT} element={<></>}/>
            </Route>
        </Route>
        <Route element={<AuthHost/>}>
            <Route path={routerMap.SIGNUP} element={<Signup/>}/>
            <Route path={routerMap.LOGIN} element={<Login/>}/>
        </Route>

    </Routes>
    </Suspense>
  )
}

export default App
