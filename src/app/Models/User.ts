export interface Roles {
    guest?: boolean;
    customer?: boolean;
    manager?: boolean;
    admin?: boolean;
}


export interface User {
    uid: string;
    email: string;
    displayName: string;
    roles: Roles;
    emailVerified: boolean;
    keysOfLikedTrips?: string[];
    banned?: boolean;
}
