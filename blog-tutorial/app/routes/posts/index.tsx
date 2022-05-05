import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

type LoaderData = {
    // this is a handy way to say: "posts is whatever type getPosts resolves to
    posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
    return json<LoaderData>({
      posts: [
        {
          slug: "my-first-post",
          title: "My First Post",
        },
        {
          slug: "90s-mixtape",
          title: "A Mixtape I Made Just For You",
        },
      ],
    });
  };

export default function Posts() {
    const { posts } = useLoaderData() as LoaderData;
    return (
      <main>
        <Link to="admin" className="text-red-600 underline">
            Admin
        </Link>
        <h1>Posts</h1>
        <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      </main>
    );
  }