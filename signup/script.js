const API_URL="http://localhost:3000/api/user/signup";

async function signup(event){
  event.preventDefault();
  const name=event.target.name.value;
  const email=event.target.email.value;
  const password=event.target.password.value;

  if(!name || !email || !password){
    alert("Please fill all fields.");
    return;
  }
  try{
    const res=await axios.post(API_URL,{name,email,password});
    alert("Signup successful!");
    event.target.reset();

    window.location.href="/expense/expense.html";
  }catch (err){
    const msg = err.response?.data?.message || "Signup failed.";
    alert(msg);
  }

}