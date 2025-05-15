import { Avatar, IconButton, Menu } from '@mui/material'
import { useState } from 'react'
import { Person as PersonIcon } from '@mui/icons-material'

type AppBarMenuProps = {
  menuItems?: React.ReactNode[]
}

export function AppBarMenu(props: AppBarMenuProps) {
  const { menuItems } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton color='inherit' aria-label='search' onClick={handleClick}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <PersonIcon />
        </Avatar>
      </IconButton>
      {menuItems && (
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          {menuItems}
        </Menu>
      )}
    </div>
  )
}
