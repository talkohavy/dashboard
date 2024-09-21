import { lazy } from 'react';

const DashboardExample1 = lazy(() => import('./pages/DashboardExample1'));

export const routes = [
  {
    to: '/example-1',
    text: 'Example 1',
    activeNames: ['/example-1', '/'],
    Component: DashboardExample1,
  },
];
