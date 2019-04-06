export class Employee {
    constructor(
        public _id: String,
        public name: String,
        public lastname: String,
        public dni: String,
        public date_start: String,
        public date_end: String,
        public type_contract: String,
        public bank_name: String,
        public back_holder: String,
        public back_number: String,
        public email: String,
        public password: String,
        public role: String,
        public active: Boolean
    ) {}
}