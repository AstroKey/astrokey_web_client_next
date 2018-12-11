// Main Containers
import MainHome from './pages/home'
import MainAbout from './pages/about'

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
