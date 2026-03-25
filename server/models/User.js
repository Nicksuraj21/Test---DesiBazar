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

        /** Sum of non-expired grant amounts (kept in sync with rewardGrants) */
        rewardPoints: {
            type: Number,
            default: 0,
            min: 0,
        },

        /** Ledger: admin grants expire in 10 days; order grants in 365 days */
        rewardGrants: [
            {
                amount: { type: Number, required: true, min: 0 },
                source: { type: String, enum: ["admin", "order"], required: true },
                expiresAt: { type: Date, required: true },
                createdAt: { type: Date, default: Date.now },
            },
        ],
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