export class User{
    constructor(
        public name: string,
        public email: string,
        public passwd: string,
        public img?: string,
        public role?: string,
        public google?: string,
        public _id?: string
    ) {}
};