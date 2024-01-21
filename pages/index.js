import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { Fragment } from "react";
import { getFeaturedPosts } from '@/lib/posts-util.js';
import Head from "next/head";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Arya&apos; Blog</title>
        <meta name="description" content="I post about web development..." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps () {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  }
}
