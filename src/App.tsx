// App.tsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/home/Home';

import RegisterUser from './components/auth/RegisterUser';
import LoginUser from './components/auth/LoginUser';

import AddContact from './components/contact/AddContact';

import ListArticles from './components/blog/ListArticles';
import AddArticle from './components/blog/AddArticle';
import ViewArticle from './components/blog/ViewArticle';

import ListProducts from './components/product/ListProducts';
import ViewProduct from './components/product/ViewProduct';

import Backoffice from './components/backoffice/Backoffice';
import AdminAddArticle from './components/backoffice/articles/AddArticle';
import AdminUpdateArticle from './components/backoffice/articles/UpdateArticle';
import AdminViewArticle from './components/backoffice/articles/ViewArticle';
import AdminAddProduct from './components/backoffice/products/AddProduct';
import AdminUpdateProduct from './components/backoffice/products/UpdateProduct';
import AdminViewProduct from './components/backoffice/products/ViewProduct';
import ListLabels from './components/backoffice/labels/ListLabels';
import AddLabel from './components/backoffice/labels/AddLabel';
import ListCategories from './components/backoffice/categories/ListCategories';
import AddCategory from './components/backoffice/categories/AddCategory';
import ViewUser from './components/backoffice/users/ViewUser';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/contact" element={<AddContact />} />

          <Route path="/articles">
            <Route index element={<ListArticles />} />
            <Route path="create" element={<AddArticle />} />
            <Route path=":id" element={<ViewArticle />} />
          </Route>

          <Route path="/products">
            <Route index element={<ListProducts />} />
            <Route path=":id" element={<ViewProduct />} />
          </Route>

          <Route path="/backoffice">
            <Route index element={<Backoffice />} />

            <Route path="articles">
              <Route path="create" element={<AdminAddArticle />} />
              <Route path=":id" element={<AdminViewArticle />} />
              <Route path=":id/update" element={<AdminUpdateArticle />} />
            </Route>

            <Route path="products">
              <Route path="create" element={<AdminAddProduct />} />
              <Route path=":id" element={<AdminViewProduct />} />
              <Route path=":id/update" element={<AdminUpdateProduct />} />
            </Route>

            <Route path="labels">
              <Route index element={<ListLabels />} />
              <Route path="create" element={<AddLabel />} />
            </Route>

            <Route path="categories">
              <Route index element={<ListCategories />} />
              <Route path="create" element={<AddCategory />} />
            </Route>

            <Route path="users/:id" element={<ViewUser />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;