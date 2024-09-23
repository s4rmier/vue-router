import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      path: '/teams',
      component: TeamsList,
      // alias: '/' this allows this component to be rendered when path is = to '/'
    },
    {
      path: '/users',
      component: UsersList,
    },
    // {
    //   path: '/teams/new',
    //   //   order matters. teams/new must come first before teams/:teamId because teams/new can be interpreted as /:teamId
    // },
    {
      path: '/teams/:teamId',
      //   dynamic routing. teamId is a name of your choice
      component: TeamMembers,
      props: true,
    },
    { path: '/404', component: NotFound },
    { path: '/:notFound(.*)', redirect: '/404' }, //catch all url/url parameters.. can send to page not found
  ],
  linkActiveClass: 'active', //this can be used for styling purposes. by default, the class assigned to an active route is 'router-link-active'. linkActiveClass is a way to change the default active class.
});

const app = createApp(App);
app.use(router);

app.mount('#app');
