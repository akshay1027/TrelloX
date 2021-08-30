import {Schema, model} from 'mongoose';

const cardSchema = new Schema(
    { 
        cardTitle: {type: String, required: true},
        description: {type: String},
        label: {type: String},
        members: [
            {
                _id: false,
                user: {type: Schema.Types.ObjectId, ref: 'User'},
                name: {type: String, required: true}
            }
        ],
        checklist: [
            {
                text: {type: String},
                complet: {type: Boolean}
            }
        ],
        boards: [
            {type: Schema.Types.ObjectId, ref: 'Board'}
        ],
        achieved: {type: Boolean, required: true, default: false},

    }
)

export const CardModal = model('Card', cardSchema);