import express from 'express';
import {
    isSellerAuth,
    sellerLogin,
    sellerLogout,
    lookupUserForRewards,
    addUserRewardPoints,
    removeUserRewardPoints,
    bulkAddRewardPointsToAllUsers,
    bulkRemoveRewardPointsByBatchId
} from '../controllers/sellerController.js';
import {
    getSellerStoreSettings,
    putSellerStoreSettings
} from '../controllers/storeController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', sellerLogout);

sellerRouter.get('/user-lookup', authSeller, lookupUserForRewards);
sellerRouter.post('/add-reward-points', authSeller, addUserRewardPoints);
sellerRouter.post('/remove-reward-points', authSeller, removeUserRewardPoints);

sellerRouter.post('/bulk-add-reward-points', authSeller, bulkAddRewardPointsToAllUsers);
sellerRouter.post('/bulk-remove-reward-points', authSeller, bulkRemoveRewardPointsByBatchId);

sellerRouter.get('/store-settings', authSeller, getSellerStoreSettings);
sellerRouter.put('/store-settings', authSeller, putSellerStoreSettings);

export default sellerRouter;