import {
  Container,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from '@mui/material'
import { DialogsProvider } from './lib'
import { DialogsExample } from './examples/DialogsExample'
import { FormExample } from './examples/FormExample'
import { router } from './router'
import { RouterProvider } from '@tanstack/react-router'

const theme = createTheme({})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogsProvider>
        <RouterProvider router={router} />
      </DialogsProvider>
    </ThemeProvider>
  )
}
