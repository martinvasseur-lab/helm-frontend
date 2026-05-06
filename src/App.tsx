import RegisterForm from './components/auth/RegisterFrom';
import LoginForm from './components/auth/LoginForm';
import Home from './components/home/Home';
import Backoffice from './components/backoffice/Backoffice';
import TableArticle from './components/blog/TableArticle';
import FormArticle from './components/blog/FormArticle';
import ArticleDetail from './components/blog/ArticleDetail';
import GetProduct from './components/product/GetProduct';
import ViewProduct from './components/backoffice/products/ViewProduct';
import AddProduct from './components/backoffice/products/AddProduct';
import AddArticle from './components/backoffice/articles/AddArticle';
import UpdateArticle from './components/backoffice/articles/UpdateArticle';
import ViewArticle from './components/backoffice/articles/ViewArticle';
import UpdateProductForm from './components/backoffice/products/UpdateProduct';
import ProductDetail from './components/product/ProductDetail';
import FormContact from './components/contact/FormContact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';


function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <ArticleDetail articleId={Number(id)} />;
}

function ViewProductPage() {
  const { id } = useParams<{ id: string }>();
  return <ViewProduct productId={Number(id)} />;
}

function UpdateProductPage() {
  const { id } = useParams<{ id: string }>();
  return <UpdateProductForm productId={Number(id)} />;
}

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <ProductDetail productId={Number(id)} />;
}

function ViewArticlePage() {
  const { id } = useParams<{ id: string }>();
  return <ViewArticle articleId={Number(id)} />;
}

function UpdateArticlePage() {
  const { id } = useParams<{ id: string }>();
  return <UpdateArticle articleId={Number(id)} />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/backoffice" element={<Backoffice />} />

        <Route path="/article" element={<TableArticle />} />
        <Route path="/article/create" element={<FormArticle />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />

        <Route path="/backoffice/article/create" element={<AddArticle />} />
        <Route path="/backoffice/article/:id" element={<ViewArticlePage />} />
        <Route path="/backoffice/article/:id/update" element={<UpdateArticlePage />} />

        <Route path='/product' element={<GetProduct/>} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="/backoffice/product/create" element={<AddProduct />} />
        <Route path="/backoffice/product/:id" element={<ViewProductPage />} />
        <Route path="/backoffice/product/:id/update" element={<UpdateProductPage />} />

        <Route path='/contact' element={<FormContact />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
