import React from 'react';

const Signin = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn'));

const route = [
    { path: '/auth/signin', exact: true, name: 'Signin 1', component: Signin }
];

export default route;