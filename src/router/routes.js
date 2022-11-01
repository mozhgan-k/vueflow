
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/emptyFlow', component: () => import('pages/emptyFlow') },
      { path: '/dragDrop', component: () => import('pages/dragDrop') },
      { path: '/customEdges', component: () => import('pages/customEdges') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
