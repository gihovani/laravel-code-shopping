export interface Category {
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}

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
}

export interface ProductPhoto {
    id?: number;
    photo_url: string;
    product?: Product;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface ProductCategory {
    product: Product;
    categories: Category[];
}

export interface ProductInput {
    id?: number;
    amount: number;
    product: Product;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface ProductOutput {
    id?: number;
    amount: number;
    product: Product;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    profile?: UserProfile;
    readonly remember_token?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface UserProfile {
    has_photo: boolean;
    photo_url: string;
    phone_number: string;
}

export interface Profile {
    name?: string;
    email?: string;
    password?: string;
    photo_url?: File | false | null;
    phone_number?: string;
    token?: string;
    device_token?: string;
}

export interface ChatGroupLinkInvitation {
    id?: number;
    total: number;
    remaining: number;
    chat_group?: ChatGroup;
    expires_at?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface ChatGroup {
    id?: number;
    name: string;
    photo?: File;
    photo_url: string;
    count_users?: number;
    readonly created_at?: string;
    readonly updated_at?: string;
}