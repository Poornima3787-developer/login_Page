const API_URL="http://localhost:3000/api/user/login";

async function login(event){
  event.preventDefault();
  const email=event.target.email.value;
  const password=event.target.password.value;

  console.log('Email:', email);
  console.log('Password:', password);

  if( !email || !password){
    alert("Please fill all fields.");
    return;
  }
  try{
    const response=await axios.post(API_URL,{email,password});
    const token=response.data.token;
    localStorage.setItem('token',token);
    
    alert('login successfully');
    window.location.href="/expense/expense.html";
  }catch (err){
    const msg = err.response?.data?.message || "Login failed.";
    alert(msg);
  }
}