const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
    { 
        cardTitle: {type: String, required: true},
        description: {type: String},
        label: {type: String},
        // members: [
        //     {
        //         _id: false,
        //         user: {type: Schema.Types.ObjectId, ref: 'User'},
        //         name: {type: String, required: true}
        //     }
        // ],
        checklist: [
            {
                text: {type: String},
                complet: {type: Boolean}
            }
        ],
        achieved: {type: Boolean, required: true, default: false}
    }
)

module.exports = CardModal = model('Card', cardSchema);