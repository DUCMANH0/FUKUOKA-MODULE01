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

let products = [
    {
        name: "Cruise Lavender HaLong",
        price: 1250,
        image: "../assets/download.jpeg",
        id: 100,
        location: "✈ Ha Long Bay",
        time: "1 Day"
    },
    {
        name: "Cruise Phoenix HaLong",
        price: 870,
        image: "../assets/Phoenix_Cruises_1.jpg",
        id: 101,
        location: "✈ Lan Ha Bay",
        time: "1 Day"
    },
    {
        name: "Ambassador Cruise",
        price: 1830,
        image: "../assets/image001.jpg",
        id: 102,
        location: "✈ Ha Long Bay",
        time: "2 Days"
    },
    {
        name: "Elite Of The Seas Cruise",
        price: 1570,
        image: "../assets/thue-du-thuyen-o-quang-ninh-0.jpg",
        id: 103,
        location: "✈ Ha Long Bay",
        time: "2 Days"
    },
    {
        name: "Essence Grand SuperYacht",
        price: 1250,
        image: "../assets/EGY_Overview-1.jpg",
        id: 104,
        location: "✈ Ha Long Bay",
        time: "1 Day"
    },
    {
        name: "Sena Cruise",
        price: 870,
        image: "../assets/du-thuyen-sena-640a9abb354da-848x477.jpg",
        id: 105,
        location: "✈ Bai Tu Long Bay",
        time: "1 Day"
    },
    {
        name: "Scarlet Pearl Cruise",
        price: 1370,
        image: "../assets/Du thuyền Scarlet Pearl .jpeg",
        id: 106,
        location: "✈ Ha Long Bay",
        time: "1 Day"
    },
    {
        name: "Mon Cheri Cruise",
        price: 1570,
        image: "../assets/Du-thuyền-Mon-Cheri.jpeg",
        id: 107,
        location: "✈ Ha Long Bay",
        time: "2 Days"
    },
    {
        name: "Peony Cruise",
        price: 970,
        image: "../assets/du-thuyen-peony-646b4975cb12d.jpg",
        id: 108,
        location: "✈ Ha Long Bay",
        time: "1 Day"
    },
    {
        name: "Rosy Cruise",
        price: 1170,
        image: "../assets/du-thuyen-rosy-6475c9b63b9d6.jpg",
        id: 109,
        location: "✈ Bai Tu Long Bay",
        time: "1 Day"
    }
]
localStorage.setItem("products", JSON.stringify(products));
//
let itemPage = 3;
let totalPage = Math.ceil(products.length / itemPage);
let currentPage = 1;
let start;
let end;
// FUNCTION TÍNH START VÀ END DỰA VÀO currentPage
function startEnd(current) {
    start = (current - 1) * itemPage;//6
    end = current * itemPage;//9
}
startEnd(1);
// viết function hiển thị danh sách sản phẩm
function showProduct() {
    let text = "";
    for (let i = 0; i < products.length; i++) {
        if (i >= start && i < end) {
            text +=
                `
                    <div class="card">
                      <div class="zoom-img">
                        <div class="img-card">
                            <img src="${products[i].image}">
                        </div>
                      </div>
                      <div class="text">
                        <span class="rating">⭐⭐⭐⭐⭐</span>
                        <h2>${products[i].name}</h2>
                        <p class="cost">${products[i].price} / Per Person</p>
                        <div class="card-box">
                            <p class="time">${products[i].time}</p>
                            <p class="location">${products[i].location}</p>
                            <div class="add-card" onclick=addToCart(${products[i].id})><i class="fa-solid fa-cart-plus"></i></div>
                        </div>                        
                    </div>
                    </div>
                        `
        }
    }
    document.getElementsByClassName("cards")[0].innerHTML = text;
}
showProduct();
// function hiển thị số trang sản phẩm
function showListPage() {
    let text = "";
    for (let i = 1; i <= totalPage; i++) {
        text +=
            `
                     <li onclick=choosePage(${i}) class="page-item ">${i}</li>
                `
    }
    document.getElementsByClassName("list-page")[0].innerHTML =
        `
              <span  onclick="prePage()" class="material-symbols-outlined pre">
              <i class="fa-solid fa-angle-right fa-rotate-180"></i>
              </span>
                ${text}
                <span onclick="nextPage()" class="material-symbols-outlined next">
                <i class="fa-solid fa-angle-right"></i>
                </span>
            `
    // cho trang đầu tiên có màu tomato
    document.getElementsByClassName("page-item")[0].classList.add("page");
}
showListPage()
// function click chọn trang
function choosePage(a) {
    // console.log("1111",nowPage);
    let pageItem = document.getElementsByClassName("page-item");
    // gán trang hiện tại bằng trang vừa click
    currentPage = a;
    for (let i = 0; i < pageItem.length; i++) {
        if (i == a - 1) {
            pageItem[i].classList.add("page");
        } else {
            pageItem[i].classList.remove("page");

        }
    }
    startEnd(a);
    showProduct();
}
// function next ảnh tiếp theo
function nextPage() {
    currentPage++;
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    choosePage(currentPage);
}
function prePage() {
    currentPage--;
    if (currentPage < 1) {
        currentPage = 1;
    }
    choosePage(currentPage);
}
// function đi mua hàng
function addToCart(idProduct) {
    console.log("idProduct", idProduct);
    // kiểm tra xem người dùng đã đăng nhập hay chưa.
    let checkLogin = localStorage.getItem("idUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];


    if (!checkLogin) {
        alert("Please log in to purchase");
        return;
    }
    // đi lấy giỏ hàng của user để đi mua hàng
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            // lấy ra được giỏ hàng của user
            // users[i].cart
            // có id sản phẩm rồi thì xét xem đó là sản phẩm nào
            for (let j = 0; j < products.length; j++) {
                if (products[j].id == idProduct) {
                    // lấy ra được sản phẩm
                    console.log("33333", products[j]);
                    // trước khi thêm vào giỏ hàng thì phải xác định sản phẩm này
                    // đã có trong giỏ hàng hay chưa
                    /* 
                    nếu có thì tăng quality lên
                    nếu chưa có sản phẩm thì push vào bình thường
                     */
                    let result = users[i].cart.findIndex((item) => {
                        return item.id == products[j].id
                    })
                    if (result != -1) {
                        // chứng tỏ sản phẩm đã có trong giỏ hàng
                        users[i].cart[result].quantity = ++users[i].cart[result].quantity;
                        localStorage.setItem("users", JSON.stringify(users));
                        alert("Added to cart");
                    } else {
                        users[i].cart.push({ ...products[j], quantity: 1 });
                        localStorage.setItem("users", JSON.stringify(users));
                        alert("Added to cart");
                    }
                    break;
                    
                }

            }
        }
    }
}
addToCart();
function loginAccount(){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let checkLogin = localStorage.getItem("idUser");
    for (let i = 0; i < users.length; i++) {
        let text = "";
        if (users[i].id == checkLogin) {
            text +=
            `
            <a href="./register.html"><i class="fa-solid fa-user-plus"></i> ${users[i].name}</a>
                <a href="./login.html"><i class="fa-solid fa-arrow-right-to-bracket"></i> Log out</a>
            
            `
        }else{
            text +=
            `
            <a href="./register.html"><i class="fa-solid fa-user"></i> </a>
                <a href="./login.html"><i class="fa-solid fa-arrow-right-to-bracket"></i> Log In</a>
            `
        }

        }
        document.getElementsByClassName("cards")[0].innerHTML = text;
}
loginAccount()