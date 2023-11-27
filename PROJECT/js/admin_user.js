function showUser() {
  let isLogin = localStorage.getItem("idUser");
  if (isLogin) {
      document.getElementsByClassName("header__sign--signIn")[0].style.display = "none";
      document.getElementsByClassName("header__sign--signUp")[0].style.display = "none";
      let user = JSON.parse(localStorage.getItem("users"));
      let userName = user.find((item) => {
          return item.id == isLogin
      })
      document.getElementById("hello").innerHTML = `<i class="fa-solid fa-user"></i> ${userName.name}`;
      // document.getElementById("cart").style.display = "block";
      // document.getElementsByClassName("cart-total")[0].innerHTML = userName.cart.length;
      document.getElementsByClassName("header__sign--signIn").innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> Log out`
  } else {
      document.getElementById("hello").style.display = "none";
  }
}
showUser();

let userList = JSON.parse(localStorage.getItem("userList")) || [];
function userAdmin() {
  let text = "";
  for (let i = 0; i < userList.length; i++) {
    let actived = userList[i].status == 1 ? "Đang hoạt động" : "Đang khóa";
    let btn = userList[i].status == 1 ? "Khóa" : "Mở khóa";
    text += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${userList[i].id}</td>
                    <td>${userList[i].name}</td>
                    <td>${userList[i].email}</td>
                    <td>${userList[i].sdt}</td>
                    <td>${actived}</td>
                    <td><button onclick="statusUserClick(${
                      userList[i].id
                    })">${btn}</button></td>
                    <td>${userList[i].time}</td>
                </tr>
    `;
  }
  document.getElementById("userControl").innerHTML = text;
}
userAdmin();

function statusUserClick(id) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id == id) {
      userList[i].status = userList[i].status == 1 ? 0 : 1;
      localStorage.setItem("userList", JSON.stringify(userList));
      userAdmin();
      break;
    }
  }
}

function dropUp() {
  userList.sort(function (a, b) {
    return a.timeSort - b.timeSort;
  });
  userAdmin();
}

function dropDown() {
  userList.sort(function (a, b) {
    return b.timeSort - a.timeSort;
  });
  userAdmin();
}