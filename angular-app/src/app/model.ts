interface Category {
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}