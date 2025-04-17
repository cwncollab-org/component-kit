import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { TextField } from './TextField'
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: {},
})
