import { ReactElement } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  display: block;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-radius: 0;
  outline: 0;
  height: 48px;
  box-sizing: border-box;
  background-color: transparent;
  line-height: 1.5;
  padding: 12px 6px;
  width: 400px;

  &:-internal-autofill-selected {
    background-color: transparent !important;
  }

  &:focus {
    border-color: hsl(194deg 70% 52%);
    color: hsl(194deg 70% 40%);
  }
`

const Label = styled.label`
  line-height: 1.5;
  display: block;
  padding-bottom: 8px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-radius: 0;
  outline: 0;
`

interface OnChangeProps {
  readonly target: {
    readonly value?: string
    readonly files?: FileList
  }
}


type FieldProps = {
  readonly type?: 'text' | 'password' | 'number' | 'email'
  readonly id: string
  readonly label: string
  readonly value?: number | string
  readonly onChange: (v: OnChangeProps) => void
  readonly placeholder?: string
  readonly autoComplete?: string
}

const FieldGroup = styled.div`
  display: block;
  margin-bottom: 16px;
`

export default function Field(props: FieldProps): ReactElement {
  const { id, type, label, value, onChange, placeholder, autoComplete } = props
  return (
    <FieldGroup>
      <Label>
        {label}
      </Label>

      <Input
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        type={type || 'text'}
        name={id}
        id={id}
        placeholder={placeholder}
      />
    </FieldGroup>
  )
}
