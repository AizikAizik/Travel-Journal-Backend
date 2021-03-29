import mongoose from "mongoose";

const { Schema } = mongoose;

const requiredSchema = {
    type: 'String',
    required: true
}

const travelJournalSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: requiredSchema,
    comments: requiredSchema,
    image: String,
    rating:{
        type: Number,
        max: 10,
        min: 0,
        default: 0
    },
    latitude:{
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude:{
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    visitDate:{
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

const Journal = mongoose.model('Journal', travelJournalSchema);

export default Journal;