document.addEventListener('DOMContentLoaded', loadExpenses);
const API_URL="http://localhost:3000/expenses";
const token=localStorage.getItem('token');

async function handleSubmitForm(event){
  event.preventDefault();

  const amount=event.target.amount.value;
  const description=event.target.description.value;
  const category=event.target.category.value;

  try {
    const res=await axios.post(API_URL,{amount,description,category},{
      headers:{
        Authorization:token
      }
    });
    displayExpense(res.data.expense);
    alert('Expenses added successfully');
    event.target.reset();
  } catch (error) {
    console.error(error);
    alert('Failed to add expense');
  }
}

async function loadExpenses() {
  try {
    const res = await axios.get(API_URL);
    res.data.expenses.forEach(displayExpense);
  } catch (error) {
    console.error(error);
    alert('Failed to fetch expenses');
  }
}

function displayExpense(expense) {
  const list = document.getElementById('expense-list');
  const li = document.createElement('li');
  li.innerHTML = `₹${expense.amount} - ${expense.description} - ${expense.category}<button onclick="deleteExpense(${expense.id})">Delete</button>`;
  list.appendChild(li);
}

async function deleteExpense(id) {
  try {
    await axios.delete(`${API_URL}/${id}`,{
      headers:{
        Authorization:token
      }
    });
    document.getElementById(`expense-${id}`).remove();
    alert('Expense deleted!');
  } catch (err) {
    alert('Failed to delete expense');
    console.error(err);
  }
}

