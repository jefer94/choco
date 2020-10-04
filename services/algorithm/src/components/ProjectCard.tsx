import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { ReactElement, useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      height: 248,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    avatar: {
      backgroundColor: red[500]
    },
    content: {
      height: 80
    },
    rightButton: {
      marginLeft: 'auto'
    }
  }))

export default function ProjectCard(): ReactElement {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="show more" className={classes.rightButton}>
          <NavigateNextIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
