export interface Category {
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
};

export interface Product {
    id?: number;
    name: string;
    readonly slug?: string;
    description?: string;
    price: number;
    stock?: number;
    active: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
};

export interface ProductCategory {
    product: Product;
    categories: Category[];
};

export interface ProductInput {
    id?: number;
    amount: number;
    product: Product;
    readonly created_at?: string;
    readonly updated_at?: string;
};

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    readonly remember_token?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
};

export interface SortColumn {
    column: string;
    sort: string;
}