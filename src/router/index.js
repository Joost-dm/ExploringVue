import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Todo from '../views/Todo'
import MarketPlace from '../views/marketplace/MarketPlace'
import AddProduct from '../views/marketplace/AddProduct'
import Cart from '../views/marketplace/Cart'
import Product from '../views/marketplace/Product'
import Favorites from '../views/marketplace/Favorites'
import ProductList from '../views/marketplace/ProductList'
import EditProduct from '../views/marketplace/EditProduct'
import CreateOrder from '../views/marketplace/CreateOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MarketPlace
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/marketplace',
    name: 'MarketPlace',
    component: MarketPlace
  },
  {
    path: '/marketplace/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/marketplace/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/marketplace/create',
    name: 'CreateOrder',
    component: CreateOrder
  },
  {
    path: '/marketplace/product/:id',
    props: true,
    name: 'Product',
    component: Product
  },
  {
    path: '/marketplace/list',
    props: true,
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/marketplace/product/:id/edit',
    props: true,
    name: 'EditProduct',
    component: EditProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
