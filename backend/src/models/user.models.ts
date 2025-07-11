import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    coverImage?: string;
    theme: 'light' | 'dark';
    referredBy?: mongoose.Types.ObjectId;
    referralCode: string;
    xp: number;
    coins: number;
    role: 'free' | 'pro';
    refreshToken?: string;
}

const UserSchema: Schema = new Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        index: true
    },
    avatar: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    referredBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    referralCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    xp: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free'
    },
    refreshToken: {
        type: String,
    }
}
, {
    timestamps: true,
}
);

UserSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAccessToken = function() {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
    }

     const secret = process.env.ACCESS_TOKEN_SECRET!;
  const options: SignOptions = {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '1d',
  };

  return jwt.sign(payload, secret, options);
};

UserSchema.methods.generateRefreshToken = function() {
    const payload = {
        _id: this._id
    }
    const secret = process.env.REFRESH_TOKEN!;
    const options: SignOptions = {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '1d',
  };
    
    return jwt.sign(
        payload,
        secret,
        options
    );
}


const User = mongoose.model('User', UserSchema);
export default User;
