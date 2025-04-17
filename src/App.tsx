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
const theme = createTheme({})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogsProvider>
        <AppPage />
      </DialogsProvider>
    </ThemeProvider>
  )
}

function AppPage() {
  return (
    <Container sx={{ p: 2 }}>
      <Stack spacing={4}>
        <DialogsExample />
        <FormExample />
      </Stack>
    </Container>
  )
}
