import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      // alias: '/' this allows this component to be rendered when path is = to '/'
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          //   dynamic routing. teamId is a name of your choice
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log('Users before enter:');
        console.log(to, from);
        next();
        //this works the same as the global before each guard but for this specific route
      },
    },
    // {
    //   path: '/teams/new',
    //   //   order matters. teams/new must come first before teams/:teamId because teams/new can be interpreted as /:teamId
    // },

    { path: '/404', component: NotFound },
    { path: '/:notFound(.*)', redirect: '/404' }, //catch all url/url parameters.. can send to page not found
  ],
  linkActiveClass: 'active', //this can be used for styling purposes. by default, the class assigned to an active route is 'router-link-active'. linkActiveClass is a way to change the default active class.
  scrollBehavior(_, _2, savedPosition) {
    //_ and _2 indicates that arguments had to be declared in order to achieve the third argument but not use the first two
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  }, //scrollBehavior will receive 3 arguments automatically which can be named however you want
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs auth');
    next();
  } else {
    next();
  }
  //besides blank, true, or false, you can also pass a string of route, or a route object.
});

// router.afterEach(function (to, from) {
//   // can be used for sending analytics data to your server
// });

export default router;
