import { CardProductComponent } from './clients/components/public/card-product/card-product.component';
import { Routes } from '@angular/router';
import { PublicComponent } from './clients/layouts/public/public.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { NotfoundComponent } from './clients/pages/public/notfound/notfound.component';
import { CardDetailComponent } from './clients/components/public/card-detail/card-detail.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ProductDetailComponent } from './pages/admin/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            {
                path: 'cards/product',
                component: CardProductComponent
            },

            {
                path: 'cards/product/:id',
                component: CardDetailComponent
            }
        ]
    },

    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'product/list',
                component: ProductListComponent
            },

            {
                path: 'add-product',
                component: AddProductComponent
            },
            
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent
            }
        ]
    },

{
    path: 'not-found',
    component: NotfoundComponent
}


];
