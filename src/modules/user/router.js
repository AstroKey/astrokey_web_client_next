// User Containers
import UserList from './views/user_list'
import UserShow from './views/user_show'

const UserListRoute = {
  path: '/users',
  component: UserList
}

const UserShowRoute = {
  path: '/users/:id',
  component: UserShow,
  props: true
}

export default [
  UserListRoute,
  UserShowRoute
]
