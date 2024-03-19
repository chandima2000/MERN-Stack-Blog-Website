import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
    {

        username : {
            type : String,
            required : true,
            unique : true,
        },

        email : {
            type : String,
            required : true,
            unique : true,
        },

        password :  {
            type : String,
            required : true,
        },
        profilePicture : {
            type :String,
            default : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1710787146~exp=1710787746~hmac=f7f673fe1c3b32b60d6de879b4e8aab205a86f0938199d4c70b920a4da43e934"
        },
    },
    {timestamps : true}

);

const User = mongoose.model('User',userSchema);

export default User;