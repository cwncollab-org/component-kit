import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(1),
})

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
    validators: {
      onSubmit: formSchema,
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
