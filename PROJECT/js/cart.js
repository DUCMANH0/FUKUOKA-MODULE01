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

const USD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
let checkLogin = localStorage.getItem("idUser");
let users = JSON.parse(localStorage.getItem("users")) || [];
function cart() {
    // lấy ra id của user
    // lấy ra danh sách user
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            //check xem user nào đang đăng nhập 
            let text = "";
            let pay = 0;
            for (let index = 0; index < users[i].cart.length; index++) {
                pay += +users[i].cart[index].quantity * users[i].cart[index].price;
                text +=
                    `
                    <tr>
                        <td>
                            <div class="cart-info">
                                <img src="${users[i].cart[index].image}" alt="">
                                <div>
                                     <p>${users[i].cart[index].name}</p>
                                     <small>Price: ${USD.format(users[i].cart[index].price)}</small><br>
                                     <a href="" onclick="deleteProduct ">Remove</a>
                                </div>
                            </div>
                        </td>
                        <td>${users[i].cart[index].quantity}</td>
                        <td>${USD.format(users[i].cart[index].quantity * users[i].cart[index].price)}</td>
                    </tr>
                   `
            }
            document.getElementById("product").innerHTML = text;
            document.getElementsById("subtotal")[0].innerHTML = pay;
        }
        break;
    }
}
cart();

function deleteProduct (x) {
      var tr = x.parentElement.parentElement;
      tr.remove();
}
// function click tăng số lượng sản phẩm
function increase(idProduct) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            for (let j = 0; j < users[i].cart.length; j++) {
                if (users[i].cart[j].id == idProduct) {
                    users[i].cart[j].quantity = ++users[i].cart[j].quantity;
                    localStorage.setItem("users", JSON.stringify(users));
                    cart();
                    break;
                }
            }
            break;
        }
    }
}