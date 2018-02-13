export class UserResidence {

    id: string;
    user_id: string;
    resident_id: string;
    email: String;
    residence_id: string;
    residence_name: String;
    residence_address: String;
    residence_photo: String;
    residence_slogan: String;
    residence_owner_id: string;
    status: string;

    constructor() {
        this.status = 'Pending';
    }
    
}