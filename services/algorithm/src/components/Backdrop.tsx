import React, { ReactElement } from 'react'
import MaterialUiBackdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

type BackdropProps = {
  readonly open: boolean
}

export default function Backdrop({ open }: BackdropProps): ReactElement {
  const classes = useStyles()
  return (
    <MaterialUiBackdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </MaterialUiBackdrop>
  )
}
