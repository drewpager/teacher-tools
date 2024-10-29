import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../BlogHub/useFetch';
import { Box, Card, CardMedia, Typography, CardContent, Divider, Chip } from '@mui/material'
import '../BlogHub/blogHub.scss';
import { formatDate, titleCase } from '../../lib/utils';
import { Footer } from '../../lib/components';
import { Helmet } from 'react-helmet';
import { BlogHubSkeleton } from '../BlogHub/blogHubSkeleton';
import { useParams } from 'react-router-dom';

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

export const BlogCategory = () => {
  let categoryName = useParams();
  let category = categoryName?.category?.toLowerCase().replaceAll("-", " ");


  const { data, loading, error } = useFetch(`https://platos-peach-blog-app.onrender.com/api/posts?filters[categories][name][$eq]=${category}&populate=*`);


  error && console.error('error', error.message);

  return (
    <>
      {loading && <BlogHubSkeleton />}
      <Helmet>
        <title>{titleCase(`${category}`)}</title>
        <meta name='description' content={`Learn through our ${category} articles written by teachers and students.`} />
      </Helmet>
      <Box className="blog-hub--box">
        <h1>{titleCase(`${category}`)} Category</h1>
      </Box>
      <Box className="card-container">
        {data?.data.map((post: BlogPost) => (
          <Card className="blog-card" key={post.id}>
            <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                alt={`${post.title} hero image`}
                height="140"
                image={`${post.hero.url}`}
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