import React from 'react'
import $ from 'jquery'
import CategoryListScreen from './Components/CategoryListScreen'
import CategoryEditScreen from './Components/CategoryEditScreen'

window.jQuery = $
window.$ = $
global.jQuery = $

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'))

const ProductsComponent = React.lazy(() => import('./Components/Products'))
const ProductsEditComponent = React.lazy(() =>
  import('./Components/ProductEditScreen')
)

const OrderListComponent = React.lazy(() =>
  import('./Components/OrderListScreen')
)
const OrderDetailsComponent = React.lazy(() =>
  import('./Components/OrderDetailScreen')
)

const UserDetailsComponent = React.lazy(() =>
  import('./Components/UserListScreen')
)
const UserEditComponent = React.lazy(() =>
  import('./Components/UserEditScreen')
)

const Logout = React.lazy(() => import('./Components/Compo/Logout'))

// const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

// const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

// const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

// const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
// const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

// const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
// const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
// const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

// const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
// const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));

const routes = [
  {
    path: '/dashboard',
    exact: true,
    name: 'Default',
    component: DashboardDefault,
  },
  {
    path: '/produk',
    exact: true,
    name: 'Product',
    component: ProductsComponent,
  },
  {
    path: '/produk/:pageNumber',
    exact: true,
    name: 'Product',
    component: ProductsComponent,
  },
  {
    path: '/produk/:slug/edit',
    exact: true,
    name: 'Edit Product',
    component: ProductsEditComponent,
  },
  {
    path: '/kategori/',
    exact: true,
    name: 'Kategori',
    component: CategoryListScreen,
  },
  {
    path: '/kategori/:slug/edit',
    exact: true,
    name: 'Edit Kategori',
    component: CategoryEditScreen,
  },
  {
    path: '/penjualan',
    exact: true,
    name: 'Daftar Penjualan',
    component: OrderListComponent,
  },
  {
    path: '/penjualan/detail/:id',
    exact: true,
    name: 'Detail Penjualan',
    component: OrderDetailsComponent,
  },
  {
    path: '/pengguna',
    exact: true,
    name: 'Pengguna',
    component: UserDetailsComponent,
  },
  {
    path: '/pengguna/:id/edit',
    exact: true,
    name: 'Pengguna',
    component: UserEditComponent,
  },
  { path: '/logout', exact: false, name: 'Logout', component: Logout },
  // { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
  // { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
  // { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
  // { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
  // { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
  // { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
  // { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
  // { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
  // { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
  // { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
  // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
  // { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
]

export default routes
