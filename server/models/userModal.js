import {Schema, model} from 'mongoose';
import { BoardModal } from './boardModal';

const userSchema = new Schema(
    { 
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        pasword: {type: String, required: true},
        profileImage: {type: String},
        activity: [
            {
                text: {type: String},
                date: {type: Date, default: Date.now}
            }
        ],
        boards: [
            {type: Schema.Types.ObjectId, ref: 'Board'}
        ]
    },
    {
        timestamps: true
    }
)

export const UserModal = model('User', userSchema);