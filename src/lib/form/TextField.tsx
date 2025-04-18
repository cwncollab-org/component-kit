import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { useFieldContext } from './formHooks'
import { useMemo } from 'react'

type Props = Omit<MuiTextFieldProps, 'name'> & {}

export function TextField(props: Props) {
  const { label, ...rest } = props
  const field = useFieldContext<string>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <MuiTextField
      name={field.name}
      label={label}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={e => field.handleChange(e.target.value)}
      slotProps={{ inputLabel: { shrink: true } }}
      error={field.state.meta.errors.length > 0}
      helperText={errorText}
      {...rest}
    />
  )
}
