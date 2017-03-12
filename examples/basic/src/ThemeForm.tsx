import * as React from 'react'
import { compose } from 'redux'
import { withForm, FormProvider, Field, connectForm } from 'form-provider'

import { preventDefault, target } from './domHelpers'
import Form from './Form'

export interface ThemeFormProps {
  baseFontSize: number
  onSubmit: (formState: any) => void
}

function createForm({ baseFontSize }) {
  return {
    baseFontSize
  }
}

function ThemeForm({ form, onSubmit }) {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <h3>Basic Theme</h3>

      <Field path='baseFontSize'>
        {({ value, setValue }) =>
          <div>
            <label>Base Font Size: </label>
            <select value={value} onChange={target((newValue) => setValue(+newValue))}>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={22}>22</option>
              <option value={36}>36</option>
            </select>
          </div>
        }
      </Field>
    </Form>
  )
}

export default withForm<ThemeFormProps>(createForm)(ThemeForm)
