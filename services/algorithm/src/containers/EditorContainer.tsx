import IconButton from '@material-ui/core/IconButton'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'
import AppBar from '@material-ui/core/AppBar'
import InternalTabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import Tab from '../components/Tab'
import useTabs from '../hooks/useTabs'
import { Editor } from '../components'
import FilesContainer from '../containers/FilesContainer'
import Fab from '@material-ui/core/Fab'

type TabPanelProps = {
  readonly children?: React.ReactNode
  readonly index: any
  readonly value: any
}

function getActiveContent(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].content
  return ''
}

function getActiveId(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].id
  return -1
}

function TabPanel(props: TabPanelProps): ReactElement {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    maxWidth: 'calc(100vw - 112px)'
  },
  tab: {
    display: 'flex',
    alignItems: 'center'
  },
  closeTab: {
    padding: '0 12px',
    color: indigo[500]
  },
  header: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 0 black'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function Tabs(): ReactElement {
  const classes = useStyles()
  const { tabs, addTab, changeTab, saveTab, removeTab } = useTabs()
  // const { theme } = setContent(ThemeContext)
  const [value, setValue] = React.useState(0)

  const [id, setId] = useState(getActiveId(tabs))
  const [content, setContent] = useState<string>(getActiveContent(tabs))

  const handleChange = (event: ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue)
  }

  useEffect(() => () => {
    const tab = tabs.filter((v) => v.active)[0]
    if (tab && tab.name) saveTab(tab.name, content)
  })

  useEffect(() => {
    const res = tabs.filter(({ active }) => active)
    if (res.length) {
      const [tab] = res
      if (id === tab.id && content !== tab.content) saveTab(tab.id, content)
      else if (id !== tab.id) setId(tab.id)
    }
  }, [content, tabs])

  return (
    <>
      <div className={classes.root}>
        <FilesContainer />
        <Divider orientation="vertical" flexItem />
        <div>
          <AppBar position="static" color="default" className={classes.header}>
            <Grid container>
              <InternalTabs
                value={value}
                className={classes.tabs}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {tabs.map(({ id, name }) => <Tab key={id} title={name} />)}
              </InternalTabs>
              <IconButton>
                <AddRoundedIcon />
              </IconButton>
            </Grid>
          </AppBar>
          <Divider />
          {tabs.map(({ id, content }, key) => (
            <TabPanel value={value} index={key} key={id}>
              <Editor
                content={content || ''}
                onChange={setContent}
                theme={{}}
              />
              {content}
            </TabPanel>
          ))}
        </div>
      </div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <PlayArrowRoundedIcon />
      </Fab>
    </>
  )
}
