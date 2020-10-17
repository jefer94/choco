import React, { ReactElement } from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField/TextField'

const useStyles = makeStyles((theme) => ({
  fieldGroup: {
    display: 'block',
    marginBottom: 16
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 400
  }
}))

type OnChangeProps = {
  readonly target: {
    readonly value?: string
    readonly files?: FileList
  }
};

type FieldProps = {
  readonly type?: 'text' | 'password' | 'number' | 'email'
  readonly id: string
  readonly label: string
  readonly value?: number | string
  readonly onChange: (v: OnChangeProps) => void
  readonly placeholder?: string
  readonly autoComplete?: string
  readonly error?: string
  readonly multiline?: boolean
}

export default function Field(props: FieldProps): ReactElement {
  const { id, type, label, value, onChange, placeholder, autoComplete, error, multiline } = props
  const classes = useStyles()

  return (
    <TextField
      variant="outlined"
      label={label}
      rows={4}
      defaultValue="Default Value"
      className={classes.textField}
      autoComplete={autoComplete}
      value={value}
      multiline={multiline}
      onChange={onChange}
      type={type || 'text'}
      placeholder={placeholder}
      id={id}
    />
  )
}
