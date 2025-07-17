import mongoose, { Schema, Document } from "mongoose";

interface IRef extends Document {
    referrer?: mongoose.Schema.Types.ObjectId,
    referred?: mongoose.Schema.Types.ObjectId,
    status : "pending" | "joined",
    joinedAt?: Date;
}

const ReferralSchema : Schema = new Schema<IRef>({
    referrer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    referred : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status : {
        type : String,
        enum : ["pending","joined"],
        default : "pending"
    },
    joinedAt : Date
},{
    timestamps: true
}
);

const Referral = mongoose.model<IRef>("Referral",ReferralSchema);

export default Referral;