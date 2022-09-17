import Layout from '../components/Layout.server';
import CartPage from '../components/CartPage.client';

export default function Cart() {
    return (
        <Layout>
            <div className="container">
                <CartPage />
            </div>
        </Layout>
    )
}