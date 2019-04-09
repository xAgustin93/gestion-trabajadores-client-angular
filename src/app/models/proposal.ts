export class Proposal {
    constructor(
        public _id: String,
        public date: String,
        public title: String,
        public description: String,
        public like: Number,
        public disLike: Number,
        public active: Boolean,
        public user_actions: any[]
    ) {}
}