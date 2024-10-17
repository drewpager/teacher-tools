import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useFetch } from './useFetch';
import { Box, Card, CardMedia, Typography, CardContent, Divider, Chip } from '@mui/material'
import './blogHub.scss';
import { formatDate, titleCase, formatSlug } from '../../lib/utils';
import { Footer } from '../../lib/components';
import { Helmet } from 'react-helmet';
import { BlogHubSkeleton } from './blogHubSkeleton';

type BlogPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  bodyCopy: string;
  metaDescription: string;
  updated: string;
  hero: {
    url: string;
  }
  categories: {
    name: string;
  }[]
};

// const BLOG_POSTS = gql`
//   query Posts {
//     posts {
//       id
//       documentId
//       title
//       slug
//       updated
//       copy
//       bodyCopy
//     }
//   }
// `;

export const BlogHub = () => {
  // const { loading, error, data } = useQuery(BLOG_POSTS);
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_STRAPI_URL}/api/posts?populate=*`);


  error && console.error('error', error.message);

  return (
    <>
      {loading && <BlogHubSkeleton />}
      <Helmet>
        <title>Plato's Peach Learn & Teach Center</title>
        <meta name='description' content="Teacher and student resources for the journey of history from the classroom and beyond." />
      </Helmet>
      <Box className="blog-hub--box">
        <h1>Plato's Peach Learn & Teach Center</h1>
      </Box>
      <Box className="blog-hub--recent">
        <h2>Recent Posts</h2>
        <Divider />
      </Box>
      <Box className="card-container">
        {data?.data.map((post: BlogPost) => (
          <Card className="blog-card" key={post.id}>
            <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                alt={`${post.title} hero image`}
                height="140"
                image={`${process.env.REACT_APP_STRAPI_URL}${post.hero.url}`}
                className="blog-card-img"
              />
            </Link>
            <CardContent>
              {post.categories.map((c) => (
                <Link to={`/category/${c.name.toLowerCase().replaceAll(" ", "-")}`} style={{ textDecoration: "none" }}>
                  <Chip label={titleCase(c?.name)} variant='outlined' className="category--chip" />
                </Link>
              ))}
              <Typography variant="h6" className="title"><Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "#000" }}>{post.title}</Link></Typography>
              <Typography variant="caption" className="date">{formatDate(post.updated)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Footer />
    </>
  );
}