export interface ChatGroup {
    readonly id: number;
    readonly name: string;
    readonly photo_url: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface ChatMessage {
    type: string;
    content: string;
    user_id: string;
    user?: Promise<ChatUser>;
    readonly created_at?: number;
}


export interface ChatUser {
    name: string;
    photo_url: string;
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
    firebase_uid: string;
}