import React, { ReactElement } from 'react'
import MaterialUiSnackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Color } from '@material-ui/lab/Alert/Alert'

type SnackbarProps = {
  readonly open: boolean
  readonly message: string
  readonly severity?: Color
}

export default function Snackbar({ open, message, severity }: SnackbarProps): ReactElement {
  return (
    <MaterialUiSnackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
    >
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </MaterialUiSnackbar>
  )
}
