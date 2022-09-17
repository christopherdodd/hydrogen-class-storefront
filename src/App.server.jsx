import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider, Route, CartProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';

import Layout from './components/Layout.server';

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <CartProvider>
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);

function NotFound() {
  return (
    <Layout>
      <div className="container">
        <div>Page not found</div>
      </div>
    </Layout>
  )
}
