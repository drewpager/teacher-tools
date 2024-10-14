import React, { useState } from "react"
import { useParams } from "react-router-dom"
// import { useFetch } from "../BlogHub/useFetch"
import { Link } from "react-router-dom"
import Markdown from "react-markdown"
// import { useQuery, gql } from "@apollo/client"
import { useFetch } from "../BlogHub/useFetch"
import { Alert, Box } from "@mui/material"
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
  console.log(params.slug)
  // const { loading, error, data } = useQuery(BLOG_POST, {
  //   variables: {
  //     id
  //   }
  // })

  // const { data, loading, error } = useFetch(`http://localhost:1337/api/posts/${id}?populate=*`)
  const { data, loading, error } = useFetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${params.slug}&populate=*`);

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
      <Box className="blog-post--header">
        <Box className="blog-post--header-left">
          <p><Link to="/blog" style={{ color: "#000" }}>blog</Link> <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} /> {post?.title}</p>
          <h1 className="blog-post--title">{post?.title}</h1>
          <p>{post?.metaDescription}</p>
          <h5>Last Updated: {post && post.updated && formatDate(post.updated)}</h5>
        </Box>
        <Box className="blog-post--header-right">
          <img
            src={post && post.hero && `http://localhost:1337${post.hero.url}`}
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