import {Router} from 'express';
import {changeCurrentPassword, getCurrentUser, getReferralStats, loginUser, logoutUser, refreshAccessToken, registerUser, trackReferralClick, updateUserAvatar, updateUserCoverImage, updateUserProfile} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(
    upload.fields([
        {name: 'avatar', maxCount: 1},
        {name: 'coverImage', maxCount: 1}
    ]),
    registerUser
);

// secured Routes
router.route('/logout').post(verifyJWT,
    logoutUser
);

router.route('/login').post(loginUser);

router.route('/refresh-token').post(refreshAccessToken);

router.route('/profile').get(verifyJWT, getCurrentUser);

router.route('/change-password').post(verifyJWT, changeCurrentPassword);

router.route("/update-account").patch(verifyJWT, updateUserProfile);

router.route('/update-avatar').patch(verifyJWT, upload.single('avatar'), updateUserAvatar);

router.route('/update-cover-image').patch(verifyJWT, upload.single('coverImage'), updateUserCoverImage);

router.route('/track').post(trackReferralClick);

router.route('/stats').get(verifyJWT, getReferralStats);



export default router;