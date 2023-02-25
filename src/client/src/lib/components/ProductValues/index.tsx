import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Avatar, Icon, Typography } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import ConstructionIcon from '@mui/icons-material/Construction';
import LockIcon from '@mui/icons-material/Lock';
import theme from '../../../theme';
import './productvalues.scss';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
  justifyContent: 'space-between'
};

export const ProductValues = () => {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden' }}
    >
      <Container className="values--container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={item} >
              {/* <Box
                component="img"
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              /> */}
              <Avatar className="product--icons">
                <ConstructionIcon sx={{ color: theme.palette.info.light, fontSize: 50 }} />
              </Avatar>
              <Typography variant="h2" sx={{ my: 5 }}>
                Tools for Teachers
              </Typography>
              <Typography variant="h5">
                {
                  'With the “Create Lesson Plan” feature teachers can string together multiple short films around a given topic or event'
                }
                {
                  ', along with custom assessment questions, which can then be streamed in the classroom or assigned as homework by providing a unique timeline url for students.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar className="product--icons">
                <LockIcon sx={{ color: theme.palette.info.light, fontSize: 50 }} />
              </Avatar>
              <Typography variant="h2" sx={{ my: 5 }}>
                Trusted Content
              </Typography>
              <Typography variant="h5">
                {
                  'We pride ourselves in producing meticulously-researched short documentaries that engages both students and teachers alike. Our short films are based on the most widely-accepted curriculums for K6-12 and early college, helping students to gain a foundational understanding through short sessions that promote long-term retention.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar className="product--icons">
                <PaletteIcon sx={{ color: theme.palette.info.light, fontSize: 50 }} />
              </Avatar>
              <Typography variant="h2" sx={{ my: 5 }}>
                Freedom to Create
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access specially negotiated rates '}
                {'that you will not find anywhere else.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}