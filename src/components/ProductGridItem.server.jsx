import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductCard({ product }) {

    const { priceV2: price, compareAtPriceV2: compareAtPrice} = product.variants?.nodes[0] || {};

    const isDiscounted = compareAtPrice?.amount > price?.amount;

    return (
        <div className="product-grid-item">
            <Link to={`/products/${product.handle}`} className="image-container">
                <Image alt={product.featuredImage.altText} data={product.featuredImage} />
            </Link>
            <div className="product-grid-item-title">{product.title}</div>
            <div className="product-grid-prices">
                <Money withoutTrailingZeros data={price} />
                {isDiscounted && (
                    <Money withoutTrailingZeros className="product-compare-at-price" data={compareAtPrice} />
                )}
            </div>
        </div>
    )
}