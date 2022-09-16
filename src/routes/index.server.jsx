import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";

export default function Home() {

  const data = useShopQuery({
      query: SHOP_QUERY,
      cache: CacheLong(),
      preload: true,
  });

const { data: { shop } } = data;

  return (
    <div className="home-page container">
        <h1>{shop.name}</h1>
        <div>{shop.description}</div>
    </div>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;