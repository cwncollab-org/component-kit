import { Person } from '@mui/icons-material'
import Form from '@mui/icons-material/Article'
import Home from '@mui/icons-material/Home'
import { IconButton } from '@mui/material'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppLayout, NavList } from '../lib/layout'

const navList: NavList = {
  items: [
    {
      icon: <Home />,
      label: 'Home',
      url: '/',
    },
    {
      icon: <Form />,
      label: 'Form Example',
      url: '/form-example',
    },
    {
      icon: <Form />,
      label: 'Dialogs Example',
      url: '/dialogs-example',
    },
    {
      icon: <Form />,
      label: 'Tabs Example',
      url: '/tabs-example',
    },
  ],
}

export const Route = createRootRoute({
  component: () => (
    <AppLayout
      title='Demo App'
      navList={navList}
      slotProps={{
        appBar: {
          endSlot: (
            <IconButton color='inherit' aria-label='search' onClick={() => {}}>
              <Person />
            </IconButton>
          ),
        },
      }}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </AppLayout>
  ),
})
