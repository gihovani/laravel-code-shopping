interface Category {
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}

interface Product {
    id?: number;
    name: string;
    readonly slug?: string;
    description?: string;
    price: number;
    stock?: number;
    active: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}

interface User {
    id?: number;
    name?: string;
    email: string;
    password: string;
    readonly remember_token?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}