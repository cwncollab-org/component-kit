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

### Form Example with Zod Validation

```tsx
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '@cwncollab-org/component-kit'
import { useState } from 'react'
import { z } from 'zod'

// Define your form schema with Zod
const formSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age'),
  subscribe: z.boolean()
    .refine(val => val === true, 'You must subscribe to continue'),
  role: z.string()
    .min(1, 'Please select a role'),
  birthDate: z.date()
    .min(new Date('1900-01-01'), 'Please enter a valid birth date')
    .max(new Date(), 'Birth date cannot be in the future'),
})

// Infer the form type from the schema
type FormValues = z.infer<typeof formSchema>

export function FormExample() {
  const [value, setValue] = useState<FormValues>({
    username: '',
    email: '',
    age: 18,
    subscribe: false,
    role: '',
    birthDate: new Date(),
  })

  const form = useAppForm({
    defaultValues: {
      username: '',
      email: '',
      age: 18,
      subscribe: false,
      role: '',
      birthDate: new Date(),
    },
    onSubmit: ({ value }) => {
      setValue(value as FormValues)
    },
    // Add Zod validation
    validators: { onChange: formSchema },
  })

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography>Form Example with Zod Validation</Typography>
      </Box>
      <Box
        component='form'
        sx={{ py: 2 }}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Stack spacing={2}>
          <form.AppField
            name='username'
            children={field => (
              <field.TextField 
                label='Username' 
                fullWidth 
              />
            )}
          />
          <form.AppField
            name='email'
            children={field => (
              <field.TextField 
                label='Email' 
                fullWidth
              />
            )}
          />
          <form.AppField
            name='age'
            children={field => (
              <field.TextField 
                label='Age' 
                type='number'
                fullWidth 
              />
            )}
          />
          <form.AppField
            name='birthDate'
            children={field => (
              <field.DatePicker
                label='Birth Date'
              />
            )}
          />
          <form.AppField
            name='role'
            children={field => (
              <field.Select
                label='Role'
                fullWidth
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='user'>User</MenuItem>
              </field.Select>
            )}
          />
          <form.AppField
            name='subscribe'
            children={field => (
              <field.Checkbox 
                label='Subscribe to newsletter'
              />
            )}
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
          <Button type='reset' variant='contained' onClick={() => form.reset()}>
            Reset
          </Button>
          <Typography variant='body1'>{JSON.stringify(value)}</Typography>
        </Stack>
      </Box>
    </Paper>
  )
}
```

### Layout Components

The library provides a flexible and responsive layout system built on top of Material-UI. The main layout component is `AppLayout` which includes a responsive app bar, collapsible sidebar, and main content area.

#### Basic Layout Usage

```tsx
import { AppLayout, NavList } from '@cwncollab-org/component-kit'
import { Home, Article, Person } from '@mui/icons-material'
import { IconButton } from '@mui/material'

// Define navigation items
const navList: NavList = {
  items: [
    {
      icon: <Home />,
      label: 'Home',
      url: '/',
    },
    {
      icon: <Article />,
      label: 'Form Example',
      url: '/form-example',
    },
    {
      icon: <Article />,
      label: 'Dialogs Example',
      url: '/dialogs-example',
    },
  ],
}

function App() {
  return (
    <AppLayout
      title='Demo App'
      navList={navList}
      slotProps={{
        appBar: {
          endSlot: (
            <IconButton color='inherit' aria-label='profile'>
              <Person />
            </IconButton>
          ),
        },
      }}
    >
      {/* Your app content goes here */}
      <div>Main Content</div>
    </AppLayout>
  )
}
```

#### Layout Features

- Responsive design with mobile-friendly drawer
- Collapsible sidebar with smooth transitions
- Customizable app bar with optional end slot
- Type-safe navigation list configuration
- Support for multiple navigation lists
- Customizable drawer widths for expanded and collapsed states

#### Layout Props

```tsx
type AppLayoutProps = {
  title?: string                    // App bar title
  navList?: NavList | NavList[]     // Navigation items
  drawerWidth?: number             // Width of expanded drawer (default: 240)
  collapsedDrawerWidth?: number    // Width of collapsed drawer (default: 64)
  slotProps?: {
    appBar?: Omit<AppBarProps, 'title' | 'status' | 'sidebarOpen' | 'drawerWidth' | 'collapsedDrawerWidth' | 'onDrawerToggle'>
  }
  sx?: SxProps                     // Custom styles
  children: React.ReactNode        // Main content
}
```

#### Navigation List Configuration

```tsx
type NavList = {
  items: Array<{
    icon: React.ReactNode          // Navigation item icon
    label: string                  // Navigation item label
    url?: string                   // Optional URL for navigation
  }>
}
```