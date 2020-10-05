import React, { ReactChildren, ReactElement } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import FolderOpenRoundedIcon from '@material-ui/icons/FolderOpenRounded'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon'
import { homeRoute, docsRoute, consoleRoute, projectsRoute } from '../globals/routes'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: 56
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    bottomList: {
      marginTop: 'auto'
    },
    menuSection: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }))

type MenuItem = {
  readonly name: string
  readonly url: string
  readonly Icon: typeof SvgIcon
}

function menuItem(name: string, url: string, Icon: typeof SvgIcon): MenuItem {
  return { name, url, Icon }
}

type MenuContainerProps = {
  readonly children: ReactElement
}
export default function MenuContainer({ children }: MenuContainerProps): ReactElement {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const top = [
    menuItem('Editor', homeRoute, CodeRoundedIcon),
    menuItem('Search', consoleRoute, PlayArrowRoundedIcon),
    menuItem('Console', consoleRoute, SearchOutlinedIcon),
    menuItem('Projects', projectsRoute, FolderOpenRoundedIcon)
  ]
  const bottom = [
    menuItem('Help', docsRoute, HelpOutlineRoundedIcon),
    menuItem('Setting', docsRoute, TuneRoundedIcon)
  ]

  function handleDrawer(): void {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <List className={classes.menuSection}>
          <ListItem button onClick={handleDrawer}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItem>
          <Divider />
          {top.map(({ name, url, Icon }) => (
            <Link href={url} key={name}>
              <ListItem button component="li">
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <List className={classes.bottomList}>
          {bottom.map(({ name, url, Icon }) => (
            <Link href={url} key={name}>
              <ListItem button component="li">
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main>
        {children}
      </main>
    </div>
  )
}
