import React from 'react';
import { Viewer, useAllUsersQuery } from '../../graphql/generated';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';

type props = {
  viewer: Viewer;
}

export const Dashboard = ({ viewer }: props) => {

  const { data, loading, error } = useAllUsersQuery({
    variables: {
      limit: 1000,
      page: 1
    }
  })

  if (loading) return (<h1>Loading...</h1>);
  if (error) return (<h1>Error</h1>);
  return (
    <Box sx={{ marginTop: 15 }}>
      <Helmet>
        <title>Dashboard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      {viewer.id === "112129642735396482304" ? (
        <Box>
          <h1>{viewer.id} Authorized</h1>
          <h2>Total Users: {data?.allUsers.totalCount}</h2>
        </Box>
      ) : (<h1>Unauthorized: This Page is Locked</h1>)}
    </Box>
  )
}