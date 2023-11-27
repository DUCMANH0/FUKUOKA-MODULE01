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

function showProductControl() {
    let productControl = JSON.parse(localStorage.getItem("products"));
    let text = "";
    for (let i = 0; i < productControl.length; i++) {
      let onActived =
        productControl[i].actived == true
          ? "Đang hoạt động"
          : "Không hoạt động";
      text += `
          <tr>
              <td>${i + 1}</td>
              <td>${productControl[i].name}</td>
              <td>${productControl[i].id}</td>
              <td><img id="imgBolt" src="${
                productControl[i].img
              }" alt=""> </td>
              <td>${productControl[i].price}</td>
              <td>${onActived}</td>
              <td><button onclick="editClick()">Edit</button></td>
              <td><button onclick="deleteClick(${
                productControl[i].id
              })">Delete</button></td>
          </tr>
          `;
    }
    document.getElementById("productsCtl").innerHTML = text;
  }
  showProductControl();

  function deleteClick(id) {
    productControl = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < productControl.length; i++) {
      if (productControl[i].id == id) {
        let confirmDelete = confirm("Bạn có muốn xóa không");
        if (confirmDelete) {
          productControl[i].actived = false;
          localStorage.setItem("products", JSON.stringify(productControl));
          showProductControl();
        }
      }
    }
  }
  let imgBase64 = "";
  function changeImage(a) {
    /* console.log(a); */
    var fileImg = a.files[0];
    /* console.log("aaaa",fileImg); */
    var khoiTao = new FileReader();
    khoiTao.onloadend = function name(params) {
      /* console.log(khoiTao.result); */
      imgBase64 = khoiTao.result;
    };
    khoiTao.readAsDataURL(fileImg);
  }

  function saveProduct() {
      let productSave = JSON.parse(localStorage.getItem("products"))||[]
    let nameValue = document.getElementById("addNameProduct").value;
    let priceValue = document.getElementById("addPriceProduct").value;

    let addObj = {
      name: nameValue,
      price: priceValue,
      img: imgBase64,
      id: Math.floor(Math.random() * 848985956562) + new Date().getMilliseconds(),
      actived: true,
    };
productSave.push(addObj)
localStorage.setItem("products",JSON.stringify(productSave))
showProductControl()
  }