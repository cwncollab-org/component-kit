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

export type AppBarProps = {
  title?: string | React.ReactNode
  status?: string
  sidebarOpen: boolean
  drawerWidth: number
  collapsedDrawerWidth: number
  onDrawerToggle: () => void
  endSlot?: React.ReactNode
  sx?: SxProps
}

export function AppBar(props: AppBarProps) {
  const {
    title,
    status,
    sidebarOpen,
    drawerWidth,
    collapsedDrawerWidth,
    onDrawerToggle,
    endSlot,
    sx,
  } = props

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
            {status && (
              <Chip
                label={status}
                size='small'
                color='warning'
                variant='filled'
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
        ) : (
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        )}
        {endSlot && <Box>{endSlot}</Box>}
      </Toolbar>
    </MuiAppBar>
  )
}
