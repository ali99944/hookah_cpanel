import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import RootLayout from "./components/layout/root-layout";
import { DashboardPage } from "./features/dashboard/pages/dashboard_page";
import { LoginPage } from "./features/auth/pages/login_page";
import { CategoriesPage } from "./features/categories/pages/categories_page";
import { CreateProductPage } from "./features/products/pages/create_product_page";
import { EditProductPage } from "./features/products/pages/edit_products_page";
import { ProductsPage } from "./features/products/pages/products_page";
import { OrderDetailsPage } from "./features/orders/pages/order_details_page";
import { OrdersPage } from "./features/orders/pages/orders_page";
import { ContactDetailsPage } from "./features/contact/pages/contact_details_page";
import { ContactPage } from "./features/contact/pages/contact_page";
import { SettingsPage } from "./features/settings/pages/settings_page";
import { SeoEditPage } from "./features/seos/pages/seo_edit_page";
import { SeoListPage } from "./features/seos/pages/seos_list_page";
import { PoliciesListPage } from "./features/policies/pages/policies_list_page";
import { PolicyEditPage } from "./features/policies/pages/policy_edit_page";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },

          {
            path: 'categories',
            element: <CategoriesPage />,
          },

          { path: 'products', element: <ProductsPage /> },
          { path: 'products/create', element: <CreateProductPage /> },
          { path: 'products/edit/:id', element: <EditProductPage /> },

          { path: 'orders', element: <OrdersPage /> },
          { path: 'orders/:id', element: <OrderDetailsPage /> },

          { path: 'contact-requests', element: <ContactPage /> },
          { path: 'contact-requests/:id', element: <ContactDetailsPage /> },

          { path: 'settings', element: <SettingsPage /> },

          { path: 'seos', element: <SeoListPage /> },
          { path: 'seos/:key', element: <SeoEditPage /> },

          { path: 'policies', element: <PoliciesListPage /> },
          { path: 'policies/:key', element: <PolicyEditPage /> }
        ]
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
])

export default router;