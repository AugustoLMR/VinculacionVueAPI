import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoList from '../views/TodoList.vue'
import IssueList from '../views/IssueList.vue'
import TodosIssues from '../views/TodosIssues.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/todo-list',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/todos-issues',
    name: 'TodosIssues',
    component: TodosIssues
  },
  {
    path: '/issue-list',
    name: 'IssueList',
    component: IssueList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
