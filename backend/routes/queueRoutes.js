const router=require('express').Router();
const auth=require('../middleware/authMiddleware');
const {createToken,getQueue,updateToken}=require('../controllers/queueController');
router.post('/token',auth,createToken);
router.get('/status',auth,getQueue);
router.patch('/:id',auth,updateToken);
module.exports=router;
