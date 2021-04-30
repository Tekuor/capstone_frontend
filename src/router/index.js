import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Movie from "../views/Movie.vue";
import AddMovie from "../views/AddMovie.vue";
import Dashboard from "../views/Dashboard.vue"
import Actor from "../views/Actors";
import EditMovie from "../views/EditMovie.vue";
import AddActor from "../views/AddActor.vue";
import EditActor from "../views/EditActor.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movie
  },
  {
    path: '/add-movie',
    name: 'add-movie',
    component: AddMovie
  },
  {
    path: '/edit-movie/:id',
    name: 'edit-movie',
    component: EditMovie
  },
  {
    path: '/actors',
    name: 'actors',
    component: Actor
  },
  {
    path: '/add-actor',
    name: 'AddActor',
    component: AddActor
  },
  {
    path: '/edit-actor/:id',
    name: 'edit-actor',
    component: EditActor
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
