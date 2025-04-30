import { Button, ButtonProps } from '@mui/material'
import { useFormContext } from './formContext'

export type SubscribeButtonProps = ButtonProps

export function SubscribeButton(props: SubscribeButtonProps) {
  const form = useFormContext()
  const { children, disabled, ...rest } = props
  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button disabled={isSubmitting || disabled} {...rest}>
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
