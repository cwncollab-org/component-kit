import { createFileRoute } from '@tanstack/react-router'
import { DialogsExample } from '../examples/DialogsExample'

export const Route = createFileRoute('/dialogs-example')({
  component: DialogsExample,
})
