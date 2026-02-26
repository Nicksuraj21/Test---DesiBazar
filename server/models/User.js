// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {type: String, required: true },
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true },
//     cartItems: {type: Object, default: {} },
// }, {minimize: false})

// const User = mongoose.models.user || mongoose.model('user', userSchema)

// export default User










import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, default: "User" },

        email: {
            type: String,
            unique: true,
            sparse: true,   // google + otp dono allow karega
        },

        password: {
            type: String,
            default: "otp-login",
        },

        phone: {
            type: String,
            unique: true,
            sparse: true,
        },

        cartItems: {
            type: Object,
            default: {},
        },
    },
    { minimize: false, timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;













// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String },
//     email: { type: String },
//     password: { type: String },
//     phone: { type: String, unique: true, sparse: true },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;