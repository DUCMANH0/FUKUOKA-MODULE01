function uuid() {
    return Math.floor(Math.random()*885688785522+new Date().getMilliseconds());
}
function signUp() {
    let users=JSON.parse(localStorage.getItem("users"))||[];
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let obj={
        name:userName,
        email:email,
        password:password,
        id:uuid(),
        cart:[],
    }
    // lọc xem user đã đăng kí email đó chưa hay chưa
    let find= users.filter((item)=>{
        return item.email==email;
    })
    if(find.length!=0){
        alert("email đã được đăng kí");
        return;
    }
    users.push(obj);
    localStorage.setItem("users",JSON.stringify(users));
    document.getElementById("userName").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("confirmPassword").value="";
    window.location.href="./login.html";
    alert("registered successfully")
}