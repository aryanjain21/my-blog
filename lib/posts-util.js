import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "posts");

export function getPostsFiles () {
  return fs.readdirSync(postDir);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, '') // removes the extension
  const filePath = path.join(postDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA, postB) => postA.data > postB.data ? -1 : 1);

  return sortedPosts;
}

export function getFeaturedPosts () {
  const allPosts = getAllPosts();

  const fearturedPosts = allPosts.filter(post => post.isFeatured);

  return fearturedPosts;
}
