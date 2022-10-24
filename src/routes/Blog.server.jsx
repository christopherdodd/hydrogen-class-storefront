import { useShopQuery, CacheLong, gql, Link, Image } from "@shopify/hydrogen";
import { Suspense } from 'react';
import Layout from '../components/Layout.server';

export default function Blog() {

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong,
        preload: true
    });

    const { data: { blog: { articles: { nodes: articles } } }} = data;

    console.log(articles);

    return (
        <Layout>
            <Suspense>
                <div className="container pt-3">
                    <div className="article-grid">
                        {articles.map(article => <ArticleGridItem article={article} /> )}
                    </div>
                </div>
            </Suspense>
        </Layout>
    )
}

function ArticleGridItem({ article }) {
    return (
        <div className="article-grid-item">
            <Link to={`/blog/${article.handle}`} className="aspect-[1.5] block mb-2">
                <Image data={article.image} alt={article.image.altText} className="object-cover object-center w-full h-full" />
            </Link>
            <Link to={`/blog/${article.handle}`} className="font-bold">{ article.title }</Link> 
        </div>
    )
}

const QUERY = gql`
  query articles {
    blog(handle: "journal") {
      articles(first: 9) {
        nodes {
          title
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`;
