# Component Kit

A React component library built with TypeScript and Vite.

## Development

To run the project in development mode:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

This will start a local development server with hot module replacement (HMR) enabled.

## Building for Production

To build the library for production:

```bash
npm run build
```

This command will:
1. Build the TypeScript files
2. Bundle the components using Vite
3. Generate type definitions

## Publishing to npm

Before publishing, make sure you:
1. Have an npm account
2. Are logged in to npm (`npm login`)
3. Have updated the version number in `package.json`

To publish the package:

```bash
npm publish --access public
```

## Project Structure

- `src/` - Source code directory
- `lib/` - Built files (generated)
- `public/` - Static assets
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

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
      Open Dialog
    </Button>
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
        placeholder='Name'
      />
      <Button
        variant='contained'
        onClick={async () => {
          await openDialog(
            'example-dialog-with-payload',
            ExampleDialogWithPayload,
            { payload: { name } }
          )
        }}
      >
        Open Dialog
      </Button>
    </>
  )
}
```

### Dialog with Result

```tsx
import { DialogsProvider, useDialogs } from '@cwncollab-org/component-kit'
import ExampleDialogWithResult from './examples/ExampleDialogWithResult'

function AppPage() {
  const { openDialog } = useDialogs()
  const [result, setResult] = useState('')

  return (
    <>
      <Button
        variant='contained'
        onClick={async () => {
          const result = await openDialog(
            'example-dialog-with-result',
            ExampleDialogWithResult
          )
          setResult(JSON.stringify(result))
        }}
      >
        Open Dialog
      </Button>
      <Typography variant='body1'>
        Result: {result}
      </Typography>
    </>
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
      Open Dialog
    </Button>
  )
}
```

## Dependencies

This package requires:
- React ^19.0.0
- React DOM ^19.0.0

## Development Dependencies

- TypeScript
- Vite
- ESLint
- Prettier

## License

[Add your license information here]
