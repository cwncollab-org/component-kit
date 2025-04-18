import { Tab, TabProps } from '@mui/material'
import { Link, ValidateToPath } from '@tanstack/react-router'

type Props = TabProps & {
  to: ValidateToPath
}

export function LinkTab({ label, to, ...props }: Props) {
  return <Tab label={label} component={Link} to={to} {...props} />
}
