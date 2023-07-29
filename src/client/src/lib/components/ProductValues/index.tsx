import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Avatar, Icon, Typography, SvgIcon } from '@mui/material';
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
              <Box sx={{ position: "relative" }}>
                <svg width="129" height="120" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#DFAF4E" fillOpacity="0.2" />
                </svg>
                <ConstructionIcon sx={{ color: "#DFAF4E", position: "absolute", top: "20%", left: "22%", fontSize: 70 }} />
              </Box>
              {/* <Avatar className="product--icons">
                <ConstructionIcon sx={{ color: theme.palette.info.light, fontSize: 50 }} />
              </Avatar> */}
              <Typography variant="h2" className='productValues-title--font'>
                Tools For Teachers
              </Typography>
              <Typography variant="h5" className='productValues-subtitle--font'>
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
              <Box sx={{ position: "relative" }}>
                <svg width="129" height="120" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M108.176 47.3474C108.61 67.2137 97.8946 85.662 79.3595 92.9821C56.1531 102.147 27.478 104.874 12.0644 85.3048C-4.72641 63.9871 -2.01006 32.6185 15.4491 11.841C30.1665 -5.67369 56.0946 -0.751328 77.4918 7.44197C94.845 14.0868 107.771 28.8238 108.176 47.3474Z" fill="#DFAF4E" fillOpacity="0.2" />
                </svg>
                <LockIcon sx={{ color: "#DFAF4E", position: "absolute", top: "20%", left: "22%", fontSize: 70 }} />
              </Box>
              <Typography variant="h2" className='productValues-title--font'>
                Trusted Content
              </Typography>
              <Typography variant="h5" className='productValues-subtitle--font'>
                {
                  'We pride ourselves in producing meticulously-researched short documentaries that engages both students and teachers alike. Our short films are based on the most widely-accepted curriculums for K6-12 and early college, helping students to gain a foundational understanding through short sessions that promote long-term retention.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ position: "relative" }}>
                <svg width="129" height="120" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#DFAF4E" fillOpacity="0.2" />
                </svg>
                <PaletteIcon sx={{ color: "#DFAF4E", position: "absolute", top: "20%", left: "22%", fontSize: 70 }} />
              </Box>
              <Typography variant="h2" className="productValues-title--font">
                Freedom To Create
              </Typography>
              <Typography variant="h5" className='productValues-subtitle--font'>
                {
                  'With Teacher to Teacher sharing enabled, you will be able to share your custom lesson plans with other teachers in your school, district, state and more. You can also share your lesson plans with the entire world, and in return, you will be able to access lesson plans created by other teachers.'
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}