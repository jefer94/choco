import React, { ReactElement } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import CardActions from '@material-ui/core/CardActions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    content: {
      height: 112
    },
    rightButton: {
      marginLeft: 'auto'
    }
  }))

export default function ProjectCardSkeleton(): ReactElement {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={(
          <IconButton aria-label="settings">
            <Skeleton animation="wave" variant="circle" width={24} height={24} />
          </IconButton>
        )}
        title={(
          <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        )}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <CardContent className={classes.content}>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <Skeleton animation="wave" variant="circle" width={24} height={24} />
        </IconButton>
        <IconButton aria-label="share">
          <Skeleton animation="wave" variant="circle" width={24} height={24} />
        </IconButton>
        <IconButton aria-label="share" className={classes.rightButton}>
          <Skeleton animation="wave" variant="circle" width={24} height={24} />
        </IconButton>
      </CardActions>
    </Card>
  )
}
