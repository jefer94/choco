import IconButton from '@material-ui/core/IconButton'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import React, { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'
import InternalTab from '@material-ui/core/Tab'

function a11yProps(index: any): Record<string, string> {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    display: 'flex',
    alignItems: 'center'
  },
  closeTab: {
    padding: '0 12px',
    color: indigo[500]
  }
}))

type TabProps = {
  readonly title: string
}

export default function Tab({ title }: TabProps): ReactElement {
  const classes = useStyles()

  return (
    <InternalTab
      label={(
        <span className={classes.tab}>
          {title}
          <IconButton className={classes.closeTab}>
            <CloseRoundedIcon />
          </IconButton>
        </span>
      )}
      {...a11yProps(0)}
    />
  )
}
