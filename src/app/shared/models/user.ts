export class User {
    userId: number;
    userName: string;
    lastName: string;
    name: string;
    password: string;
    email: string;
    phone: string;

    constructor() {
        this.userId = 0;
        this.userName = null
        this.lastName = null;
        this.name = null;
        this.password = null;
        this.email = null;
        this.phone = null;
    }

    isValid(): boolean {
        return (this.name != null && this.lastName != null && this.password != null && this.email != null)
    }
}