import React from "react"
import { styled } from "@mui/material/styles"
import { Card, Skeleton, Switch, Grid, Box } from "@mui/material"
import "./createPlaylist.scss"
import { Footer } from "../../lib/components";

const BookmarkSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/> </svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const CreatePlaylistSkeleton = () => {
  return (
    <div>
      <Box className="createPlaylist--box">
        <h1 className='createPlaylist--h1'>Create Lesson Plan</h1>
        {/* Reset button placeholder */}
        <Skeleton variant="rectangular" width={75} height={40} sx={{ ml: 2 }} />
        <Grid container>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Card variant="outlined" className="createPlaylist-drop--card">
              {/* Title Field placeholder */}
              <Skeleton variant="rectangular" width={"100%"} height={50} />
              <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
                <div>
                  <br />
                  {/* Instructions placeholder */}
                  <Skeleton variant="rectangular" width={"100%"} height={400} sx={{ borderRadius: 5 }} />
                </div>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BookmarkSwitch checked={true} />
              <Skeleton variant="text" width={160} height={50} />
            </div>
            <div style={{ width: "100%", display: "flex" }}>
              {/* Category chip placeholders */}
              <Skeleton variant="rectangular" width={50} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
              <Skeleton variant="rectangular" width={50} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
              <Skeleton variant="rectangular" width={50} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
              <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
              <Skeleton variant="rectangular" width={60} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
              <Skeleton variant="rectangular" width={50} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
              <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: "100px", m: 0.25 }} />
            </div>

            <Card variant="outlined" className="createPlaylist--card">
              <Skeleton variant="rectangular" width={"100%"} height={50} />
              <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                  <Box>
                    <div>
                      <Skeleton variant="rectangular" width={"90%"} height={140} sx={{ mt: 1, ml: 0, borderRadius: 5 }} />
                      <Skeleton variant="rectangular" width={"90%"} height={140} sx={{ mt: 1, ml: 0, borderRadius: 5 }} />
                      <Skeleton variant="rectangular" width={"90%"} height={140} sx={{ mt: 1, ml: 0, borderRadius: 5 }} />
                      <Skeleton variant="rectangular" width={"90%"} height={140} sx={{ mt: 1, ml: 0, borderRadius: 5 }} />
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Card>
            {/* Add Quiz Button */}
            <Skeleton variant="rectangular" width={200} height={50} sx={{ mt: 2, ml: 15, mb: 2 }} />
          </Grid>
        </Grid>
        {/* Create Button */}
        <Skeleton variant="rectangular" width={150} height={50} sx={{ ml: 2 }} />
      </Box>
      <Footer />
    </div>
  )
}