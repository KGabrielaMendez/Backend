import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './index.css';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';


export default function Modulos({ image, alt, title, ruta }) {


const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 0,
  width: '5rem',
  height: '5rem',
};

  return (
    <>
    <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        
      >

      <Link to={ruta} className="Link">
        <Card sx={{
          maxWidth: 300, maxHeight: 400, display: '-webkit-flex',
          flexWrap: 'wrap'
        }} spacing={2}>
          <CardMedia
            alt={alt}
            >
            <img align="center" src={image} alt="ganado" className="imgRedonda" />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>

          </CardContent>
        </Card>
      </Link>
      <Box sx={{ ...commonStyles,border:0}}  />
         
            </Stack>
    </>

  );
}
