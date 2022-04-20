export interface Role {
    id: number;
    name: string;
    description: string;
    disabled: boolean;
}

export interface LoginInfo {
    username: string;
    email: string;
    phone: string;
    userId: number;
    clientId: number;
    base64EncodedAuthenticationKey: string;
    authenticated: boolean;
    officeId: number;
    officeName: string;
    roles: Role[];
    permissions: string[];
    lastLogin: number[];
    shouldRenewPassword: boolean;
    isTwoFactorAuthenticationRequired: boolean;
    userMessageGlobalisationCode?: string;
}


