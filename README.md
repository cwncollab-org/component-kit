# Component Kit

A React component library built with TypeScript and Vite. This package provides a set of reusable components built on top of [Material-UI (MUI)](https://mui.com/) and [Tanstack Form](https://tanstack.com/form/latest) for form handling.

## Features

- Built on Material-UI 
- Type-safe dialog management
- Lazy loading support
- Payload and result handling for dialogs

## Usage Examples

### Basic Dialog Usage

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialog from './examples/ExampleDialog'

function App() {
  return (
    <DialogsProvider>
      <AppPage />
    </DialogsProvider>
  )
}

function AppPage() {
  const { openDialog } = useDialogs()

  return (
    <Button
      variant='contained'
      onClick={() => openDialog('example-dialog', ExampleDialog)}
    >
      Open Basic Dialog
    </Button>
  )
}
```

#### ExampleDialog Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogProps,
} from '@mui/material'

export default function ExampleDialog({ open, onClose, ...rest }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>This is an example dialog</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

### Dialog with Payload

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialogWithPayload from './examples/ExampleDialogWithPayload'

function AppPage() {
  const { openDialog } = useDialogs()
  const [name, setName] = useState('')

  return (
    <>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Enter your name'
      />
      <Button
        variant='contained'
        onClick={() => {
          openDialog(
            'example-dialog-with-payload',
            ExampleDialogWithPayload,
            { payload: { name } }
          )
        }}
      >
        Open Dialog with Payload
      </Button>
    </>
  )
}
```

#### ExampleDialogWithPayload Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from '@mui/material'
import { DialogProps } from '../lib'

type Payload = {
  name: string
}

export default function ExampleDialogWithPayload({
  open,
  onClose,
  payload,
  ...rest
}: DialogProps<Payload>) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an example dialog with payload {JSON.stringify(payload)}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

### Dialog with Result

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialogWithResult from './examples/ExampleDialogWithResult'

function AppPage() {
  const { openDialog } = useDialogs()
  const [result, setResult] = useState<{ name: string } | null>(null)

  return (
    <>
      <Button
        variant='contained'
        onClick={async () => {
          const result = await openDialog(
            'example-dialog-with-result',
            ExampleDialogWithResult,
            { payload: { name: 'Initial Name' } }
          )
          if (result?.success) {
            setResult(result.data)
          }
        }}
      >
        Open Dialog with Result
      </Button>
      {result && (
        <Typography variant='body1'>
          Result: {result.name}
        </Typography>
      )}
    </>
  )
}
```

#### ExampleDialogWithResult Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  DialogActions,
  Button,
} from '@mui/material'
import { DialogProps } from '../lib'
import { useState } from 'react'

type Payload = {
  name: string
}

type ResultData = {
  name: string
}

export default function ExampleDialogWithResult({
  open,
  onClose,
  payload,
  ...rest
}: DialogProps<Payload, ResultData>) {
  const [name, setName] = useState(payload?.name || '')
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Name'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ev => onClose(ev, { success: true, data: { name } })}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

### Lazy Loading Dialog

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import { lazy } from 'react'

const ExampleDialog2 = lazy(() => import('./examples/ExampleDialog2'))

function AppPage() {
  const { openDialog } = useDialogs()

  return (
    <Button
      variant='contained'
      onClick={() => openDialog('example-dialog2', ExampleDialog2)}
    >
      Open Lazy Loaded Dialog
    </Button>
  )
}
```

#### ExampleDialog2 Implementation

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogProps,
} from '@mui/material'

export default function ExampleDialog2({
  open,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>This is an example dialog 2</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
```

## Dependencies

This package requires:
- React ^19.0.0
- React DOM ^19.0.0
- @mui/material ^5.0.0
- @mui/icons-material ^5.0.0
- @tanstack/react-form ^1.0.0

## Development Dependencies

- TypeScript
- Vite
- ESLint
- Prettier

## License

[Add your license information here]
