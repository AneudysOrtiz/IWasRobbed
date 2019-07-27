export class PostModel {
    title: string;
    description: string;
    date: Date;
    userId: number;
    latitude: number;
    longitude: number;
    file: string;

    constructor() {
        this.title = null;
        this.description = null;
        this.date = new Date();
        this.latitude = null;
        this.longitude = null;
        this.file = null;
    }
}