const API_URL="http://localhost:4000/login";

async function login(event){
  event.preventDefault();
  const email=event.target.email.value;
  const password=event.target.password.value;

  if( !email || !password){
    alert("Please fill all fields.");
    return;
  }
  try{
    const response=await axios.post(API_URL,{email,password});
    alert('login successfully');
  }catch (err){
    const msg = err.response?.data?.message || "Login failed.";
    alert(msg);
  }
}