import { createFileRoute } from '@tanstack/react-router'
import { FormExample } from '../examples/FormExample'

export const Route = createFileRoute('/form-example')({
  component: FormExample,
})
