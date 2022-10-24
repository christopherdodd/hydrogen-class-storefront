import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductCard({ product }) {

    const { priceV2: price, compareAtPriceV2: compareAtPrice} = product.variants?.nodes[0] || {};

    const isDiscounted = compareAtPrice?.amount > price?.amount;

    return (
        <div className="product-grid-item group">
            <Link to={`/products/${product.handle}`} className="image-container">
                <Image alt={product.featuredImage.altText} data={product.featuredImage} />
            </Link>
            <div className="mb-1 text-slate-800 group-hover:text-black font-bold">{product.title}</div>
            <div className="flex gap-1 text-slate-800 group-hover:text-black">
                <Money withoutTrailingZeros data={price} />
                {isDiscounted && (
                    <Money withoutTrailingZeros className="product-compare-at-price line-through text-slate-400" data={compareAtPrice} />
                )}
            </div>
        </div>
    )
}