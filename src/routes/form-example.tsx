import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'

export const Route = createFileRoute('/form-example')({
  component: FormExample,
})

export function FormExample() {
  const [value, setValue] = useState({
    username: '',
  })
  const form = useAppForm({
    defaultValues: {
      username: '',
    },
    onSubmit: ({ value }) => {
      setValue(value)
    },
  })
  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Typography>Form Example</Typography>
      </Box>
      <Box
        component='form'
        sx={{ py: 2 }}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Stack spacing={2}>
          <form.AppField
            name='username'
            validators={{
              onChange: ({ value }) =>
                value.length < 1 ? 'Requires at least 1 character.' : undefined,
            }}
            children={field => <field.TextField label='Username' fullWidth />}
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
          <Button type='reset' variant='contained' onClick={() => form.reset()}>
            Reset
          </Button>
          <Typography variant='body1'>{JSON.stringify(value)}</Typography>
        </Stack>
      </Box>
    </Paper>
  )
}
