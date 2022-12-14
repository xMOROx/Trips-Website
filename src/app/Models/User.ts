export interface Roles {
    guess?: boolean;
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
}
