import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, MenuItem, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(1),
  role: z.enum(['admin', 'user']),
  agree: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/form-example')({
  component: FormExample,
})

export function FormExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)
  const form = useAppForm({
    defaultValues: {
      username: '',
      role: '',
      agree: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      setValue(value as FormValues)
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
          <form.AppField
            name='agree'
            children={field => <field.Checkbox label='Agree to terms' />}
          />

          <form.AppField
            name='role'
            children={field => (
              <field.Select label='Role'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='user'>User</MenuItem>
              </field.Select>
            )}
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
