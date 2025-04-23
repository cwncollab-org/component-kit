import { InputLabel, FormControl, Input, InputProps } from '@mui/material'
import { useFieldContext } from './formHooks'
import IMaskInput from 'react-imask/esm/input'
import React, { useEffect, useMemo, useState } from 'react'
import { IMask } from 'react-imask'
import Imask, { createMask } from 'imask'
import { useDebounce } from 'use-debounce'

type Props = Omit<InputProps, 'name'> & {
  label?: string
  labelShrink?: boolean
  mask: string
  definitions: Record<string, RegExp>
}

export function MaskTextField(props: Props) {
  const { label, labelShrink, mask, definitions, ...rest } = props
  const field = useFieldContext<string>()
  const [debouncedValue, setDebouncedValue] = useDebounce(
    field.state.value,
    1000
  )
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.handleChange(event.target.value)
  }

  useEffect(() => {
    if (debouncedValue !== field.state.value) {
      field.handleChange(debouncedValue)
    }
  }, [debouncedValue, field])

  return (
    <FormControl>
      <InputLabel shrink={labelShrink}>{label}</InputLabel>
      <Input
        // {...rest}
        name={field.name}
        value={field.state.value}
        onChange={handleChange}
        onBlur={field.handleBlur}
        inputComponent={TextMaskCustom as any}
        inputProps={{
          mask,
          definitions,
        }}
      />
    </FormControl>
  )
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  mask: string
  definitions: Record<string, RegExp>
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, mask, definitions, ...other } = props
    const [imask, setImask] = useState<any>(null)

    useEffect(() => {
      setImask(Imask.createMask({ mask, definitions }))
    }, [mask, definitions])

    return (
      <IMaskInput
        {...other}
        mask={imask}
        inputRef={ref}
        onAccept={(value: any) => {
          console.log('value', value)
          onChange({ target: { name: props.name, value } })
        }}
        overwrite
      />
    )
  }
)
