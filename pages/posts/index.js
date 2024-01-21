import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import Head from "next/head";
import { Fragment } from "react";

const AllPostPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all web development related tutorial!" />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  )
}

export function getStaticProps () {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostPage;