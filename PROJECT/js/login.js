function signIn() {
    // lấy tất cả những user đã đăng kí rồi
   let users = JSON.parse(localStorage.getItem("users")) || [];
   //lấy email người dùng nhập
   let email=document.getElementById("email").value;
   // lấy password người dùng nhập
   let password = document.getElementById("password").value;
   for (let i = 0; i < users.length; i++) {
       if(users[i].email==email&&users[i].password==password){
           // lưu id người dùng lên localstorage
           localStorage.setItem("idUser",users[i].id);
           window.location.href="../page/home.html";
       }else{
        alert("Account does not exist!");
       }
   }
}