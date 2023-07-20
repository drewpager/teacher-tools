import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { 
  HomeInfo, 
  CardGrid, 
  ProductValues, 
  Footer, 
  HomeDetails, 
  CTA, 
  ProductDetails, 
  HomeDetailsSkeleton, 
  HomeInfoSkeleton 
} from '../../lib/components/'
import { Viewer, usePlaylistQuery } from '../../graphql/generated';
import { PlaylistCard } from '../../lib/components/';

type Props = {
  viewer: Viewer;
}

export const Home = ({ viewer }: Props) => {
  const { data, loading, error } = usePlaylistQuery({
    variables: {
      id: "6436c2965c489f0612b0b2ef"
    }
  })

  if (loading) {
    return (
      <Box sx={{ marginTop: 15 }}>
        <HomeInfoSkeleton />
        <HomeDetailsSkeleton />
      </Box>
    )
  }

  if (error) {
    return (<></>)
  }

  return (
    <Box>
      <HomeInfo />
      {/* <HomeDetails /> */}
      <ProductValues />
      <ProductDetails />
      {data && <PlaylistCard playlist={data?.playlist} />}
      <CTA />
      {/* <CardGrid /> */}
      {/* <TimelineEl /> */}
      <Footer viewer={viewer} />
    </Box>
  );
}