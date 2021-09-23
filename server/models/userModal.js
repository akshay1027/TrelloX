const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        boardTitle: { type: String, required: true },
        activity: [
            {
                text: { type: String },
                date: { type: Date, default: Date.now }
            }
        ],
        lists: [
            {
                title: { type: String },
                cards: [{
                    title: { type: String },
                    content: { type: String },
                    date: { type: String }
                }
                ]
            }
        ]
    }
);

module.exports = UserModal = model('UserModel', userSchema);