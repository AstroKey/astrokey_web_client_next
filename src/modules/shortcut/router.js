// Shortcut Containers
import ShortcutList from './views/list'
import ShortcutNew from './views/new'
import ShortcutShow from './views/show'
import ShortcutEdit from './views/edit'

const ShortcutListRoute = {
  path: '/shortcuts',
  component: ShortcutList,
  props: true
}

const ShortcutNewRoute = {
  path: '/shortcuts/new',
  component: ShortcutNew
}

const ShortcutShowRoute = {
  path: '/shortcuts/:id',
  component: ShortcutShow,
  props: true
}

const ShortcutEditRoute = {
  path: '/shortcuts/:id/edit',
  component: ShortcutEdit,
  props: true
}

export default [
  ShortcutListRoute,
  ShortcutNewRoute,
  ShortcutShowRoute,
  ShortcutEditRoute
]
