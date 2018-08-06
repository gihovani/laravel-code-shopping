import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/pages/login/login.component";
import {ProductListComponent} from "./components/pages/product/product-list/product-list.component";
import {UserListComponent} from "./components/pages/user/user-list/user-list.component";
import {ProductCategoryListComponent} from "./components/pages/product-category/product-category-list/product-category-list.component";
import {CategoryListComponent} from "./components/pages/category/category-list/category-list.component";
import {ProductInputListComponent} from "./components/pages/product-input/product-input-list/product-input-list.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'categories/list', component: CategoryListComponent, canActivate: [AuthGuard]},
    {path: 'products/:product/categories/list', component: ProductCategoryListComponent, canActivate: [AuthGuard]},
    {path: 'products/list', component: ProductListComponent, canActivate: [AuthGuard]},
    {path: 'inputs/list', component: ProductInputListComponent, canActivate: [AuthGuard]},
    {path: 'users/list', component: UserListComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
