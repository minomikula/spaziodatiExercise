export class User {
    login: string;
    password: string;
    token: string;

    constructor(props: Partial<User>) {
        Object.assign(this, props);
    }
}