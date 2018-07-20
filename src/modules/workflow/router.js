// Workflow Containers
import WorkflowList from './views/list'
import WorkflowNew from './views/new'
import WorkflowShow from './views/show'
import WorkflowEdit from './views/edit'

const WorkflowListRoute = {
  path: '/workflows',
  component: WorkflowList,
  props: true
}

const WorkflowNewRoute = {
  path: '/workflows/new',
  component: WorkflowNew
}

const WorkflowShowRoute = {
  path: '/workflows/:id',
  component: WorkflowShow,
  props: true
}

const WorkflowEditRoute = {
  path: '/workflows/:id/edit',
  component: WorkflowEdit,
  props: true
}

export default [
  WorkflowListRoute,
  WorkflowNewRoute,
  WorkflowShowRoute,
  WorkflowEditRoute
]
