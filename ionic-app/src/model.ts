export interface ChatGroup {
    readonly id: number;
    readonly name: string;
    readonly photo_url: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}