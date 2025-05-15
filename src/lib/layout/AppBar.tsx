import {
  Box,
  Chip,
  IconButton,
  AppBar as MuiAppBar,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBarMenu } from './AppBarMenu'

export type AppBarProps = {
  title?: string | React.ReactNode
  status?: string | React.ReactNode
  sidebarOpen: boolean
  drawerWidth: number
  collapsedDrawerWidth: number
  onDrawerToggle: () => void
  endSlot?: React.ReactNode
  menuItems?: React.ReactNode[]
  sx?: SxProps
}

export function AppBar(props: AppBarProps) {
  const {
    title,
    sidebarOpen,
    drawerWidth,
    collapsedDrawerWidth,
    onDrawerToggle,
    endSlot,
    menuItems,
    sx,
  } = props

  const renderedEndSlot = endSlot ?? <AppBarMenu menuItems={menuItems} />

  return (
    <MuiAppBar
      position='fixed'
      sx={{
        ...sx,
        width: {
          sm: `calc(100% - ${
            sidebarOpen ? drawerWidth : collapsedDrawerWidth
          }px)`,
        },
        ml: { sm: `${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px` },
        transition: 'width 0.2s, margin-left 0.2s',
      }}
    >
      <Toolbar variant='dense'>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={() => onDrawerToggle()}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {typeof title === 'string' ? (
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        ) : (
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        )}
        {renderedEndSlot && <Box>{renderedEndSlot}</Box>}
      </Toolbar>
    </MuiAppBar>
  )
}
