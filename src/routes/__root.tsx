import { Box, Container, Link, MenuItem, MenuList } from '@mui/material'
import { createRootRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Link as RouterLink } from '@tanstack/react-router'
export const Route = createRootRoute({
  component: () => (
    <Container sx={{ p: 2 }}>
      <Box component='nav'>
        <MenuList>
          <MenuItem>
            <Link component={RouterLink} to='/'>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link component={RouterLink} to='/form-example'>
              Form Example
            </Link>
          </MenuItem>
          <MenuItem>
            <Link component={RouterLink} to='/dialogs-example'>
              Dialogs Example
            </Link>
          </MenuItem>
          <MenuItem>
            <Link component={RouterLink} to='/tabs-example'>
              Tabs Example
            </Link>
          </MenuItem>
        </MenuList>
      </Box>
      <Box component='main'>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Container>
  ),
})
