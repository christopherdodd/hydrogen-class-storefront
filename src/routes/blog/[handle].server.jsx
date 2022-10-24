import {
    useShopQuery,
    useLocalization,
    Seo,
    gql,
    Image,
    useRouteParams
} from '@shopify/hydrogen';
import { Suspense } from 'react';
import Layout from '../../components/Layout.server';

export default function Article() {

    const { handle } = useRouteParams();

    const { data: { blog: { articleByHandle } } } = useShopQuery({
        query: QUERY,
        variables: {
            handle
        }
    });

    const article = articleByHandle;

    const { 
        language: {isoCode: languageCode},
        country: {isoCode: countryCode}
     } = useLocalization();

    const formattedDate = new Intl.DateTimeFormat(
        `${languageCode}-${countryCode}`,
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    ).format(new Date(article.publishedAt));

    if(!article) {
        return (
            <Layout>
                <div className="container pt-3">
                    <div>Article not found</div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Suspense>
                <Seo type="article" data={article} />
            </Suspense>
            <div className="prose container mt-4">
                <div className="article-page-header">
                    <h1 className="mb-0">{article.title}</h1>
                    <span>{formattedDate} · {article.authorV2.name}</span>
                </div>
                <article>
                    <Image data={article.image} altText={article.image.altText} />
                    <div 
                        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                        className="article-body"
                    />
                </article>
            </div>
        </Layout>
    )
}

const QUERY = gql`
query article($handle: String!) {
    blog(handle: "journal") {
      articleByHandle(handle: $handle) {
        title
        publishedAt
        authorV2 {
          name
        }
        image {
          url
          altText
        }
        contentHtml
      }
    }
  }
`;