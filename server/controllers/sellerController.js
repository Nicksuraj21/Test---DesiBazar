import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import {
    addAdminGrantToUser,
    bulkAddAdminPointsToAllUsers,
    pruneAndPersistUserRewards,
    ADMIN_REWARD_GRANT_DAYS,
    removeRewardPointsFromUser,
    bulkRemoveAdminPointsByBatchId
} from "../utils/rewardGrants.js";

const MAX_REWARD_POINTS_PER_REQUEST = 100000;

// Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // res.cookie('sellerToken', token, {
            //     httpOnly: true, 
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //     maxAge: 7 * 24 * 60 * 60 * 1000,
            // });

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: true,        // 🔥 must be true on Render/HTTPS
                sameSite: 'none',    // 🔥 cross-site cookie allow
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });


            return res.json({ success: true, message: "Logged In" });
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout Seller : /api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
        // res.clearCookie('sellerToken', {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        // });

        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// ==============================
// ADMIN: lookup user for reward points
// GET /api/seller/user-lookup?userId= | ?phone= | ?email=
// ==============================
export const lookupUserForRewards = async (req, res) => {
    try {
        const { userId, phone, email } = req.query;

        if (userId && mongoose.Types.ObjectId.isValid(String(userId))) {
            const user = await User.findById(userId).select("name phone email rewardPoints createdAt");
            if (!user) {
                return res.json({ success: false, message: "User not found" });
            }
            await pruneAndPersistUserRewards(User, user._id);
            const fresh = await User.findById(user._id).select("name phone email rewardPoints createdAt");
            return res.json({ success: true, user: fresh });
        }

        if (phone && String(phone).trim()) {
            const digits = String(phone).replace(/\D/g, "");
            const user = await User.findOne({
                $or: [{ phone: String(phone).trim() }, { phone: digits }]
            }).select("name phone email rewardPoints createdAt");
            if (!user) {
                return res.json({ success: false, message: "No user with this phone" });
            }
            await pruneAndPersistUserRewards(User, user._id);
            const fresh = await User.findById(user._id).select("name phone email rewardPoints createdAt");
            return res.json({ success: true, user: fresh });
        }

        if (email && String(email).trim()) {
            const em = String(email).trim();
            const user = await User.findOne({
                email: { $regex: new RegExp(`^${em.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") }
            }).select("name phone email rewardPoints createdAt");
            if (!user) {
                return res.json({ success: false, message: "No user with this email" });
            }
            await pruneAndPersistUserRewards(User, user._id);
            const fresh = await User.findById(user._id).select("name phone email rewardPoints createdAt");
            return res.json({ success: true, user: fresh });
        }

        return res.json({
            success: false,
            message: "Provide userId, phone, or email"
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ==============================
// ADMIN: add reward points to a user
// POST /api/seller/add-reward-points { userId, points }
// ==============================
export const addUserRewardPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
            return res.json({ success: false, message: "Valid userId required" });
        }

        const p = Math.floor(Number(points));
        if (!Number.isFinite(p) || p <= 0 || p > MAX_REWARD_POINTS_PER_REQUEST) {
            return res.json({
                success: false,
                message: `Points must be between 1 and ${MAX_REWARD_POINTS_PER_REQUEST}`
            });
        }

        const user = await addAdminGrantToUser(User, userId, p);

        if (!user) {
            return res.json({ success: false, message: "User not found or could not update" });
        }

        return res.json({
            success: true,
            message: `Added ${p} points — valid ${ADMIN_REWARD_GRANT_DAYS} days from now`,
            user
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ==============================
// ADMIN: remove reward points from a user
// POST /api/seller/remove-reward-points { userId, points }
// ==============================
export const removeUserRewardPoints = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
            return res.json({ success: false, message: "Valid userId required" });
        }

        const p = Math.floor(Number(points));
        if (!Number.isFinite(p) || p <= 0 || p > MAX_REWARD_POINTS_PER_REQUEST) {
            return res.json({
                success: false,
                message: `Points must be between 1 and ${MAX_REWARD_POINTS_PER_REQUEST}`
            });
        }

        const result = await removeRewardPointsFromUser(User, userId, p);

        if (!result.ok) {
            if (result.reason === "not_found") {
                return res.json({ success: false, message: "User not found" });
            }
            if (result.reason === "no_balance") {
                return res.json({ success: false, message: "User has no points to remove" });
            }
            if (result.reason === "invalid") {
                return res.json({ success: false, message: "Invalid points amount" });
            }
            return res.json({ success: false, message: "Could not update. Try again." });
        }

        let msg = `Removed ${result.removed} points`;
        if (result.capped) {
            msg += " (only this many were available — rest of request ignored)";
        }

        return res.json({
            success: true,
            message: msg,
            user: result.user
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ==============================
// ADMIN: bulk add reward points to EVERY user
// POST /api/seller/bulk-add-reward-points { points }
// ==============================
export const bulkAddRewardPointsToAllUsers = async (req, res) => {
    try {
        const { points } = req.body;

        const p = Math.floor(Number(points));
        if (!Number.isFinite(p) || p <= 0 || p > MAX_REWARD_POINTS_PER_REQUEST) {
            return res.json({
                success: false,
                message: `Points must be between 1 and ${MAX_REWARD_POINTS_PER_REQUEST}`
            });
        }

        const result = await bulkAddAdminPointsToAllUsers(User, p);
        if (!result) {
            return res.json({
                success: false,
                message: "Could not update reward points"
            });
        }

        return res.json({
            success: true,
            message: `Added ${result.pointsPerUser} points to ${result.affectedUsers} users`,
            adminBatchId: result.adminBatchId,
            affectedUsers: result.affectedUsers,
            pointsPerUser: result.pointsPerUser,
            totalAdded: result.totalAdded
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ==============================
// ADMIN: bulk remove only points from a specific bulk action (not order points)
// POST /api/seller/bulk-remove-reward-points { batchId }
// ==============================
export const bulkRemoveRewardPointsByBatchId = async (req, res) => {
    try {
        const { batchId } = req.body;

        if (!batchId || typeof batchId !== "string" || !batchId.trim()) {
            return res.json({ success: false, message: "batchId required" });
        }

        const result = await bulkRemoveAdminPointsByBatchId(User, batchId.trim());
        if (!result) {
            return res.json({ success: false, message: "Invalid batchId" });
        }

        return res.json({
            success: true,
            message: `Removed ${result.totalRemoved} points from ${result.affectedUsers} users (bulk batch)`,
            affectedUsers: result.affectedUsers,
            totalRemoved: result.totalRemoved
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};