import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { TextField } from './TextField'
import { Checkbox } from './Checkbox'
import { Select } from './Select'
import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import { MaskTextField } from './MaskTextField'
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    Checkbox,
    Select,
    DatePicker,
    TimePicker,
    MaskTextField,
  },
  formComponents: {},
})
