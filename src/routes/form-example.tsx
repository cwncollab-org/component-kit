import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, MenuItem, Paper, Stack, Typography } from '@mui/material'
import { useAppForm } from '../lib'
import { useState } from 'react'
import { z } from 'zod'

import dayjs from 'dayjs'
const formSchema = z.object({
  username: z.string().min(1),
  role: z.enum(['admin', 'user']),
  date: z.date().max(dayjs().add(1, 'day').toDate()),
  time: z.date(),
  agree: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export const Route = createFileRoute('/form-example')({
  component: FormExample,
})

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
]

export function FormExample() {
  const [value, setValue] = useState<FormValues | undefined>(undefined)
  const form = useAppForm({
    defaultValues: {
      username: '',
      role: undefined,
      agree: false,
      date: undefined,
      time: undefined,
    } as Partial<FormValues>,
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
            children={field => (
              <field.TextField
                label='Username'
                fullWidth
                required
                labelShrink
                size='small'
              />
            )}
          />
          <form.AppField
            name='agree'
            children={field => <field.Checkbox label='Agree to terms' />}
          />

          <form.AppField
            name='role'
            children={field => (
              <field.Select
                label='Role'
                required
                options={roles}
                labelShrink
                size='small'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
              </field.Select>
            )}
          />

          <form.AppField
            name='date'
            children={field => (
              <field.DatePicker
                label='Date'
                required
                labelShrink
                size='small'
              />
            )}
          />

          <form.AppField
            name='time'
            children={field => (
              <field.TimePicker label='Time' labelShrink size='small' />
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
