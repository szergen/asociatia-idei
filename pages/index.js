import Link from "next/link";
import groq from "groq";
import client from "../client";


const Index = ({posts}) => {
  return (
    <div>
      <h1>Welcome to a blog!</h1>
      {posts.length > 0 && posts.map(
        ({ _id, title = '', slug = '', publishedAt = '' }) =>
          slug && (
            <li key={_id}>
              <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                <a>{title}</a>
              </Link>{' '}
              ({new Date(publishedAt).toDateString()})
            </li>
          )
      )}
    </div>
  )
}

const query = groq`
*[_type == "post" && publishedAt < now()] | order(publishedAt desc)
`;

export async function getStaticProps() {
  const posts = await client.fetch(query)
  return {
    props: {
      posts
    }
  }
}

export default Index;