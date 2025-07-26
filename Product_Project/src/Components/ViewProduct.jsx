import { Grid } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));
export default function ViewProduct() {
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteid, setDeleteid] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    //step 8.1
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
//step 8.2
    const handleDeleteConfirm = async () => {
      const idd = deleteid;
      const updatedData = data.filter((e) => e.p_id !== idd);
      setData(updatedData);
      await localStorage.setItem('Plant', JSON.stringify(updatedData));
      setDeleteid(null);
      setDialogOpen(false);
    };
     {/* step 6.1 */}
     const handleMenuClose = () => {
      setAnchorEl(null);
    };
  const handleDeleteClick = () => {
    setDialogOpen(true);     //step 6.2.1
    handleMenuClose();
  };

  //step 7
  const handleMenuClick = (event, id) => {
      setAnchorEl(event.currentTarget);
      setDeleteid(id);      //step 7 declare state
    };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [data,setData] = useState([]);
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('Plant'));
    if(storedData){
        setData(storedData);
    }
  },[])
  const handleClear = () => {
    localStorage.removeItem('Plant'); // Clear the specific item from localStorage
    setData([]); // Reset the data state to an empty array
  };
  console.log(data,"data")
  return (
    <div>
      <Grid container spacing={2}>
      {data.map((card, index) => (
      <Grid item xs={12}>
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            K
          </Avatar>
        }
        action={
          <>
          <IconButton aria-label="settings" onClick={(event) => handleMenuClick(event, card.p_id)}>
            <MoreVertIcon />
          </IconButton>
          {/* step 6 */}
           {/* action code to delete  */}
           {/* step 6.1 */}
           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
           {/* <MenuItem onClick={handleUpdate}>Update</MenuItem> */}
            {/* step 6.2 */}
           <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
         </Menu>
</>
        }
        // title="Shrimp and Chorizo Paella"
        // subheader="September 14, 2016"
        title={card.name}
        
      />
      <CardMedia
        component="img"
        height="194"
        // image="/static/images/cards/paella.jpg"
        // alt="Paella dish"
        image={card.image}
        alt={card.title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like. */}
          availibility:{card.availability}
        </Typography>
        <Typography>
          price={card.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" >
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

        </Grid>
      ))
    }
        </Grid>
        <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this item?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to delete this item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="secondary" onClick={handleClear} fullWidth sx={{ mt: 2 }}>
        Clear All Data
      </Button>
    </div>
  )
}
