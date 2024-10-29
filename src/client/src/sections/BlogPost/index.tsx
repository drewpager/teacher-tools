import React, { useState } from "react"
import { useParams } from "react-router-dom"
// import { useFetch } from "../BlogHub/useFetch"
import { Link } from "react-router-dom"
import Markdown from "react-markdown"
// import { useQuery, gql } from "@apollo/client"
import { useFetch } from "../BlogHub/useFetch"
import { Alert, Box, Typography } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./blogPost.scss"
import { formatDate } from "../../lib/utils"
import { Footer } from "../../lib/components"
import { CTA } from "../../lib/components"
import { Helmet } from "react-helmet"
import { BlogPostSkeleton } from "./blogPostSkeleton"

type BlogItem = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  bodyCopy: string;
  metaDescription: string;
  updated: string;
  categories: {
    name: string;
  }[]
  hero: {
    url: string;
  }
  users: {
    name: string;
    headshot: {
      url: string;
    },
  }[]
}

// const BLOG_POST = gql`
//   query Post($id: ID!) {
//     post(id: $id) {
//       id
//       documentId
//       title
//       slug
//       updated
//       copy
//       bodyCopy
//     }
//   }`;

export const BlogPost = () => {
  let params = useParams()
  // const { loading, error, data } = useQuery(BLOG_POST, {
  //   variables: {
  //     id
  //   }
  // })

  // const { data, loading, error } = useFetch(`http://localhost:1337/api/posts/${id}?populate=*`)
  const { data, loading, error } = useFetch(`https://platos-peach-blog-app.onrender.com/api/posts?filters[slug][$eq]=${params.slug}&populate[0]=categories&populate[1]=hero&populate[2]=users.headshot`);

  let post: BlogItem = data && data.data[0];

  return (
    <>
      {loading && <BlogPostSkeleton />}
      {error && (
        <>
          <BlogPostSkeleton />
          <Alert severity="error">Error loading post. Please try again later.</Alert>
        </>
      )}
      <Helmet>
        <title>{post?.title}</title>
        <meta name='description' content={post?.metaDescription} />
      </Helmet>
      {console.log(post)}
      <Box className="blog-post--header">
        <Box className="blog-post--header-left">
          <p><Link to="/blog" style={{ color: "#000" }}>blog</Link>
            <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
            <Link to={`/category/${post?.categories[0].name}`} style={{ color: "#000" }}>{post?.categories[0].name}</Link>
            <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
            {post?.title}</p>
          <h1 className="blog-post--title">{post?.title}</h1>
          <p>{post?.metaDescription}</p>
          <Box className="author-bio--section">
            <img
              src={`${post?.users[0].headshot.url}`}
              alt={`${post?.users[0].name} author headshot`}
              className="blog-post--author-headshot"
            />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{post?.users.length === 1 ? post?.users[0].name : `${post?.users[0].name}, ${post?.users[1].name}`}</Typography>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 800 }}>Last Updated: {post && post.updated && formatDate(post.updated)}</Typography>
        </Box>
        <Box className="blog-post--header-right">
          <img
            src={post && post.hero && `${post.hero.url}`}
            alt={post?.title}
          />
        </Box>
      </Box>
      <Box className="blog-post--body">
        <Markdown>{post?.bodyCopy}</Markdown>
      </Box>
      <CTA />
      <Footer />
    </>
  )
}