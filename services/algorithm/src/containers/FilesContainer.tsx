import React, { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  }))

export default function NestedList(): ReactElement {
  const classes = useStyles()
  const [openSrc, setOpenSrc] = React.useState(true)
  const [openTest, setOpenTest] = React.useState(true)

  function clickSrc(): void {
    setOpenSrc(!openSrc)
  }

  function clickTest(): void {
    setOpenTest(!openTest)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={(
        <>
          <ListSubheader component="div" id="nested-list-subheader">
            Files
          </ListSubheader>
          <Divider />
        </>
      )}
      className={classes.root}
    >
      <ListItem button onClick={clickSrc}>
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
        <ListItemText primary="src" />
        {openSrc ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSrc} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <InsertDriveFileOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="add" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <InsertDriveFileOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="exp" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={clickTest}>
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
        <ListItemText primary="test" />
        {openTest ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openTest} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <CheckRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="add" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <CheckRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="exp" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  )
}
