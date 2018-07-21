// Main Containers
import MainHome from './views/home'
import MainAbout from './views/about'

const HomeRoute = {
  path: '/',
  name: 'Home',
  component: MainHome
}

const AboutRoute = {
  path: '/about',
  name: 'About',
  component: MainAbout
}

export default [
  HomeRoute,
  AboutRoute
]
