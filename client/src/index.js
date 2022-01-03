import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './views/admin/Admin';
import AdminProducts from './views/admin/AdminProducts/AdminProducts';
import AdminUsers from './views/admin/AdminUsers/AdminUsers';
import ProductPage from './views/productPage/ProductPage'
import ProductDetailPage from './views/productDetailPage/ProductDetailPage'
import CartPage from './views/cartPage/CartPage'
import PaymentPage from './views/PaymentPage/PaymentPage';

import ProductContextProvider from './store/contexts/ProductContext';
import CartContextProvider from './store/contexts/CartContext';
import PaymentContextProvider from './store/contexts/PaymentContext'
import AuthContextProvider from './store/contexts/AuthContext';
import PaymentSuccessPage from './views/PaymentSuccessPage/PaymentSuccessPage';
import HomePage from './views/HomePage/HomePage';
import ProfilePage from './views/ProfilePage/ProfilePage';
import AuthPage from './views/Auth/AuthPage';
import AdminContextProvider from './store/contexts/AdminContext';
import AdminInvoices from './views/admin/AdminInvoices/AdminInvoices';
import GlobalContextProvider from './store/contexts/GlobalContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>

      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <PaymentContextProvider>

              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<App />} >
                    <Route path='' element={<HomePage />} />
                    <Route path='products/all' element={<ProductPage productRoute='all' />} />
                    <Route path='products/watch' element={<ProductPage productRoute='watch' />} />
                    <Route path='products/ring' element={<ProductPage productRoute='ring' />} />
                    <Route path='products/earring' element={<ProductPage productRoute='earring' />} />
                    <Route path='products/necklace' element={<ProductPage productRoute='necklace' />} />
                    <Route path="products/:id" element={<ProductDetailPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="payment/success" element={<PaymentSuccessPage />} />
                    <Route path="login" element={<AuthPage authRoute='login' />} />
                    <Route path="register" element={<AuthPage authRoute='register' />} />
                    <Route path="profile" element={<ProfilePage />} />

                  </Route>
                  <Route path='admin' element={<AdminContextProvider ><Admin /></AdminContextProvider>} >
                    <Route path='products' element={<AdminProducts />} />
                    <Route path='users' element={<AdminUsers />} />
                    <Route path='invoices' element={<AdminInvoices />} />
                  </Route>

                </Routes>
              </BrowserRouter>
            </PaymentContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

