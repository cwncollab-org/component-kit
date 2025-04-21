import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  InputLabel as MuiInputLabel,
  InputLabelProps as MuiInputLabelProps,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
} from '@mui/material'
import { useFieldContext } from './formHooks'
import { useId, useMemo } from 'react'

type Props = MuiFormControlProps & {
  label?: string
  slotProps?: {
    inputLabel?: MuiInputLabelProps
    select?: MuiSelectProps
    helperText?: MuiFormHelperTextProps
  }
}
export function Select(props: Props) {
  const field = useFieldContext<string>()
  const { children, slotProps, ...rest } = props

  const id = useId()
  const labelId = `${id}-label`
  const selectId = `${id}-select`

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <MuiFormControl error={Boolean(errorText)} {...rest}>
      <MuiInputLabel id={labelId} {...slotProps?.inputLabel}>
        {props.label}
      </MuiInputLabel>
      <MuiSelect
        id={selectId}
        labelId={labelId}
        {...slotProps?.select}
        label={props.label}
        name={field.name}
        value={field.state.value}
        onChange={ev => field.handleChange(ev.target.value as string)}
      >
        {children}
      </MuiSelect>
      {Boolean(errorText) && (
        <MuiFormHelperText {...slotProps?.helperText}>
          {errorText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  )
}
