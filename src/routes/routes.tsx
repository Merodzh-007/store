import { Route, Routes } from "react-router"
import MainPage from "../pages/MainPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import CartPage from "../pages/CartPage/CartPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import HistoryPage from "../pages/HistoryPage"
import HistoryPageID from "../pages/HistoryPageID"


const AppRoutes = () => {
    const navigationsRoutes = [
        { path: '/', element: <MainPage /> },
        { path: '/product/:id', element: <ProductPage /> }, 
        { path: '/cart', element: <CartPage /> },
        { path: '/order', element: <OrderPage /> },
        { path: '/history', element: <HistoryPage /> },
        { path: '/history/:id', element: <HistoryPageID /> },
    ]
    return (
        <>
            <Routes>
                {navigationsRoutes.map((route) => (
                    <Route key={route.path} element={route.element} path={route.path}/>
                ))}
            </Routes>
        </>
    )
}
export default AppRoutes