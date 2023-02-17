export interface FormInterface {
    email: string,
    password: string
}

export interface LoginInterface {
    onLogin: (email: string, password: string) => Promise<void>;
}