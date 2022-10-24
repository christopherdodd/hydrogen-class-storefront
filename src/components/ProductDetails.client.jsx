import {
    ProductOptionsProvider,
    useProductOptions,
    Image,
    ProductPrice,
    AddToCartButton
} from '@shopify/hydrogen';

export default function ProductDetails({ product }) {

    console.log(product);

    return (
        <ProductOptionsProvider data={product}>
            <Image data={product.media.nodes[0].image} className="product-page-image"/>
            <ProductForm product={product}/>
        </ProductOptionsProvider>
    )
}

function ProductForm({ product }) {

    const { options, 
            selectedVariant, 
            selectedOptions, 
            setSelectedOption 
        } = useProductOptions();

    const isOutOfStock = !selectedVariant?.availableForSale || false;

    return (
        <div className="prose">
            <h1>{product.title}</h1>
            <ProductPrice 
                className="mb-2" 
                withoutTrailingZeros
                data={product}
                variantId={selectedVariant.id}
            />
            
            <div className="product-options">
                {options.map(({ name, values }) => {
                    if(values.length === 1) {
                        return null;
                    }
                    return (
                        <div key={name} className="product-option-group">
                            <legend className="product-option-name">
                                {name}
                            </legend>
                            {values.map((value) => {
                                const id = `option-${name}-${value}`;
                                const checked = selectedOptions[name] === value;
                                return (
                                    <div key={id} className="product-option-value">
                                        <input
                                            className="opacity-0 fixed w-0"
                                            type="radio"
                                            checked={checked}
                                            name={name}
                                            value={value}
                                            id={id}
                                            onChange={() => setSelectedOption(name, value)}
                                        />
                                        <label 
                                            className="inline-block cursor-pointer font-sans border-b-2 border-transparent hover:border-slate-400" 
                                            htmlFor={id}>{value}</label>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <AddToCartButton disabled={isOutOfStock} className="add-to-cart">
                {isOutOfStock ? 'Out of stock' : 'Add to cart'}
            </AddToCartButton>

            <div className="product-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml}}></div>
        </div>
    )
}