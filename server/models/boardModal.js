const { Schema, model } = require('mongoose');

// Boards -> 1) boardTitle (string)
//           2) activity (Array of Objects)
//           3) lists (Array + reference lists document)
//           4) members (Araay of objects + refrence to users document)

const boardSchema = new Schema(
    {
        boardTitle: { type: String, required: true },
        activity: [
            {
                text: { type: String },
                date: { type: Date, default: Date.now }
            }
        ],
        lists: [
            { type: Schema.Types.ObjectId, ref: 'List' }
        ],
        // members: [
        //     {
        //         _id: false,
        //         user: { type: Schema.Types.ObjectId, ref: 'User'},
        //         name: { type: String, default: 'admin'}
        //     }
        // ]
    },
    {
        timestamps: true
    }
)

module.exports = BoardModel = model('Board', boardSchema);