import { ReactElement } from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core'

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
}

export default function Field(props: FieldProps): ReactElement {
  const { id, type, label, value, onChange, placeholder, autoComplete, error } = props
  const classes = useStyles()

  return (
    <FormControl fullWidth className={classes.fieldGroup} error={!!error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        startAdornment={<InputAdornment position="start"> </InputAdornment>}
        className={classes.textField}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        type={type || 'text'}
        placeholder={placeholder}
        id={id}
      />
      {error ? <FormHelperText id={id}>{error}</FormHelperText> : <></>}
    </FormControl>
  )
}
