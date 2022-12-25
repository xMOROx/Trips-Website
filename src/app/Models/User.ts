export interface Roles {
    guest?: boolean;
    admin?: boolean;
    manager?: boolean;
    customer?: boolean;
}

export interface User {
    uid: string;
    roles: Roles;
    email: string;
    banned?: boolean;
    displayName: string;
    emailVerified: boolean;
    keysOfLikedTrips?: string[];
}
