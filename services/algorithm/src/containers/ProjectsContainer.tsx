import React, { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ProjectCard from '../components/ProjectCard'
import ProjectCardSkeleton from '../components/ProjectCardSkeleton'
import { useFetchProjects } from '../hooks/useFetchProjects'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projects: {
      alignContent: 'flex-start',
      overflowY: 'auto',
      height: '100vh'
    },
    project: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  }))

function LoadingScreen(): ReactElement {
  const classes = useStyles()
  return (
    <>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>

      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>

      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
      <div className={classes.project}>
        <ProjectCardSkeleton />
      </div>
    </>
  )
}

/**
 * Projects container.
 * @returns Menu context provider.
 */
export default function ProjectsContainer(): ReactElement {
  const classes = useStyles()
  const { data = [], error, loading } = useFetchProjects()
  console.info(loading, data, error)

  function Projects(): readonly ReactElement[] {
    if (!(data instanceof Array)) {
      return data?.projects.map(() => (
        <div className={classes.project}>
          <ProjectCard />
        </div>
      ))
    }
    return []
  }

  return (
    <>
      <Grid
        className={classes.projects}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {loading && !(data instanceof Array) ? <LoadingScreen /> : Projects()}
      </Grid>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddRoundedIcon />
      </Fab>
    </>
  )
}
