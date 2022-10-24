import {
    useCart,
    CartLineProvider,
    Image,
    useCartLine,
    Money,
    Link,
    CartCost,
    CartLineQuantity,
    CartLineQuantityAdjustButton
} from '@shopify/hydrogen';

import { Suspense } from 'react';

export default function CartPage() {
    return (
        <Suspense>
            <CartTable />
        </Suspense>
    )
}

function CartTable() {
    const { lines, checkoutUrl, status } = useCart();

    console.log(status);

    if(lines.length === 0) {
        if(status == 'idle') {
            return <div>No items are currently in the cart</div>
        }
    } else {
        return (
            <>
                <table className="w-full table-auto">
                    <tbody>
                        {lines.map(line => {
                            return (
                                <CartLineProvider key={line.id} line={line} >
                                    <CartLineItem />
                                </CartLineProvider>
                            )
                        })}
                        <tr className="font-bold">
                            <td className="border-t-2 border-slate-200 pt-4" colSpan="2"></td>
                            <td className="border-t-2 border-slate-200 pt-4">Total:</td>
                            <td className="border-t-2 border-slate-200 pt-4"><CartCost withoutTrailingZeros /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end pt-5">
                        <Link 
                            to={checkoutUrl}
                            className="checkout-button"
                        >Checkout</Link>
                </div>
            </>
        )
    }
}

function CartLineItem() {

    const { lineId, merchandise, cost } = useCartLine();

    const { image, product, selectedOptions } = merchandise

    return (
        <tr key={lineId}>
            <td className="max-w-[100px] sm:max-w-none sm:w-72">
                <Image className="max-w-[100px] sm:max-w-[250px] h-auto mix-blend-multiply" data={image} />
            </td>
            <td className="text-left">
                <Link to={`/products/${product.handle}`} className="font-bold">{product.title}</Link>
                <div className="text-slate-600 text-[8px] sm:text-sm flex gap-1 flex-wrap">
                    {(selectedOptions || []).map(option => (
                        <span key={option.name}>{option.name}: {option.value}</span>
                    ))}
                </div>
                <Money withoutTrailingZeros data={merchandise.priceV2} />
            </td>
            <td>
                <div className="cart-quantity-selector">
                    <CartLineQuantityAdjustButton adjust="decrease">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-slate-800">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </CartLineQuantityAdjustButton>
                    <CartLineQuantity className="w-full min-w-20 text-center select-none font-bold font-12 text-slate-800" />
                    <CartLineQuantityAdjustButton adjust="increase">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-slate-800">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </CartLineQuantityAdjustButton>
                </div>
            </td>
            <td className="relative text-right max-w-[80px] sm:max-w-none">
                <Money withoutTrailingZeros data={ cost.totalAmount } />
                <CartLineQuantityAdjustButton as="div" className='absolute top-3 right-3 cursor-pointer' adjust='remove'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </CartLineQuantityAdjustButton>
            </td>
        </tr>
    )
}