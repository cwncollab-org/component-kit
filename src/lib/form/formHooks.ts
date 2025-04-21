import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { TextField } from './TextField'
import { Checkbox } from './Checkbox'
import { Select } from './Select'

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, Checkbox, Select },
  formComponents: {},
})
