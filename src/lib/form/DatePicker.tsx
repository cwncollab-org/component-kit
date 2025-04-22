import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { useFieldContext } from './formHooks'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMemo } from 'react'

type Props = Omit<
  MuiDatePickerProps,
  'name' | 'value' | 'onChange' | 'defaultValue'
>

export function DatePicker(props: Props) {
  const field = useFieldContext<Date>()

  const errorText = useMemo(() => {
    if (field.state.meta.errors.length === 0) return null
    return field.state.meta.errors.map(error => error.message).join(', ')
  }, [field.state.meta.errors])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        {...props}
        name={field.name}
        value={dayjs(field.state.value)}
        onChange={value => {
          if (value) {
            field.handleChange(value.toDate())
          }
        }}
        slotProps={{
          textField: {
            error: Boolean(errorText),
            helperText: errorText,
          },
        }}
      />
    </LocalizationProvider>
  )
}
