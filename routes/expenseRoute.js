const express=require('express');
const router=express.Router();
const expenseController=require('../controller/expenseController');
const auth=require('../middleware/auth');

router.post('/',expenseController.addExpense);
router.get('/', expenseController.getExpense);
router.delete('/:id',auth, expenseController.deleteExpense);

module.exports=router;