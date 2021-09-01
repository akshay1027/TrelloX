const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    { 
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
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
);

module.exports =  UserModal = model('User', userSchema);