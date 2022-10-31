import mongoose from "mongoose";


const mensagemSchema = new mongoose.Schema(
    {
        id: {type: String},
        autor: {type: mongoose.Schema.Types.ObjectId, ref : 'autores',  required: true},
        msg: {type: String}
    },
    {timestamps:true}
);


const mensagens = mongoose.model('mensagens',mensagemSchema);


export default mensagens;