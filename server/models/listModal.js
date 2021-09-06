const { Schema, model } = require('mongoose');

const listSchema = new Schema(
    {
        listTitle: {type: String, required: true},
        achieved: {type: Boolean, required: true, default: false},
        cards: [
            {type: Schema.Types.ObjectId, ref: 'Card'}
        ]
    }
)

module.exports = ListModal = model('List', listSchema);