import {Observable} from "rxjs";

export interface ChatGroup {
    readonly id: number;
    readonly name: string;
    readonly photo_url: string;
    is_member?: Observable<boolean>;
    last_message: Observable<ChatMessage>;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface ChatMessage {
    type: string;
    content: string;
    user_id: string;
    user$?: Promise<ChatUser>;
    user?: User;
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
    role: Role;
    password?: string;
    profile?: UserProfile;
    readonly remember_token?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export enum Role {
    SELLER = 1,
    CUSTOMER = 2
}

export interface UserProfile {
    has_photo: boolean;
    photo_url: string;
    phone_number: string;
    firebase_uid: string;
}

export interface AudioPlatformConfig {
    basePath: string;
    name: string;
    mimeType: string;
    fullPath: string;
}