import mongoose from "mongoose";


const messageSchema = mongoose.Schema(
    {
        id: {type: String},
        msg: {type: String,required:true},
        autor:[{type: mongoose.Schema.Types.ObjectId, ref:'autores'}]
    },
    {timestamps:true}
)


const messages = mongoose.model("message",messageSchema);

export default messages;