const Expense=require('../models/expense');

const addExpense=async (req ,res)=>{
  try {
    const { amount, description, category }=req.body;
    const newExpense=await Expense.create({amount, description, category});
    res.status(201).json({ message: 'Expense added', expense: newExpense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getExpense=async (req ,res)=>{
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deleted = await Expense.destroy({ where: { id: expenseId } });

    if (deleted) {
      res.status(200).json({ message: 'Expense deleted successfully' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};
module.exports={
  addExpense,
  getExpense,
  deleteExpense
}