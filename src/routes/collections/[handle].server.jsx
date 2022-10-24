import { useShopQuery, CacheLong, gql, useRouteParams } from '@shopify/hydrogen';
import { Suspense } from 'react';

import Layout from '../../components/Layout.server';
import ProductCard from '../../components/ProductGridItem.server';

export default function Collection() {
    const { handle } = useRouteParams();

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
        variables: {
            handle
        }
    });

    const { data: { collection: collection }} = data;
    const { products: { nodes } } = collection;
    

    return (
        <Layout>
            <Suspense>
                <div className="container pt-3">
                    <h1 className="collection-title">{collection.title}</h1>
                    <div className="product-grid">
                        {nodes.map((product) => (
                            <ProductCard product={product}></ProductCard>
                        ))}
                    </div>
                </div>
            </Suspense>
        </Layout>
    )
}

const QUERY = gql`
query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
        id
        title
        description
        seo {
            description
            title
        }
        products(first: 9) {
            nodes {
              title
              handle
              featuredImage {
                url
                altText
                height
                width
              }
              variants(first: 1) {
                nodes {
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
        }
    }
  }
`;