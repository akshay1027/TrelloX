import {Schema, model} from 'mongoose';

const listSchema = new Schema(
    {
        listTitle: {type: String, required: true},
        achieved: {type: Boolean, required: true, default: false},
        cards: [
            {type: Schema.Types.ObjectId, ref: 'Board'}
        ]
    }
)

export const ListModal = model('List', listSchema);