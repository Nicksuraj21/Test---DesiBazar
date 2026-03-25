import express from 'express';
import {
    isSellerAuth,
    sellerLogin,
    sellerLogout,
    lookupUserForRewards,
    addUserRewardPoints,
    removeUserRewardPoints
} from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', sellerLogout);

sellerRouter.get('/user-lookup', authSeller, lookupUserForRewards);
sellerRouter.post('/add-reward-points', authSeller, addUserRewardPoints);
sellerRouter.post('/remove-reward-points', authSeller, removeUserRewardPoints);

export default sellerRouter;