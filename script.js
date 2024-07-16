// logic signup
function signup() {
    var firstName = document.getElementById('firstName').value;
    if (firstName === null || firstName === "") {
        document.getElementById('firstNameError').innerHTML ='First Name Empty';
        document.getElementById('firstNameError').style.color = "red";
    }

    var lastName = document.getElementById('lastName').value;
    if (lastName === null || lastName === "") {
        document.getElementById('lastNameError').innerHTML = "last name is empty"
        document.getElementById('lastNameError').style.color = "red"
    }

    var email = document.getElementById('email').value;
    var verifEmail = validateEmail(email)
    if (verifEmail) {
        document.getElementById('emailError').innerHTML = ""
    } else {
        document.getElementById('emailError').innerHTML = "email invalid"
        document.getElementById('emailError').style.color = "red"
    }
    if (lastName === null || lastName === "") {
        document.getElementById('lastNameError').innerHTML = "last name is empty"
        document.getElementById('lastNameError').style.color = "red"
    }

    var password = document.getElementById('password').value;
    var verifPassword = verifLength(password, 6, 8)
    if (verifPassword) {
        document.getElementById('passwordError').innerHTML = ""
    } else {
        document.getElementById('passwordError').innerHTML = "password between 6 and 8 charactere"
        document.getElementById('passwordError').style.color = "red"
    }
    if (password === null || password === "") {
        document.getElementById('passwordError').innerHTML = "password is empty"
        document.getElementById('passwordError').style.color = "red"
    } 

    var confPwd = document.getElementById('confPwd').value;
    if (password == confPwd) {
        document.getElementById('confPwdError').innerHTML =""
    } else {
        document.getElementById('confPwdError').innerHTML = "password is not identic"
        document.getElementById('confPwdError').style.color = "red"
    }
    if (confPwd === null || confPwd === "") {
        document.getElementById('confPwdError').innerHTML = "conf password is empty"
        document.getElementById('confPwdError').style.color = "red"
    }

    var tel = document.getElementById('tel').value;
    var telVerif = verifLength (tel , 8 , 8)
    if (telVerif) {
        document.getElementById('telError').innerHTML = ""
    } else {
        document.getElementById('telError').innerHTML = "tel 8 number"
        document.getElementById('telError').style.color = "red"
    }
    if (tel === null || tel === "") {
        document.getElementById('telError').innerHTML = "tel is empty"
        document.getElementById('telError').style.color = "red"
    }

    if (!(firstName === null || firstName === "") && !(lastName === null || lastName === "") && verifPassword && !(password === null || password === "") && (password == confPwd) && !(confPwd === null || confPwd === "") && !(tel === null || tel === "") && telVerif) {
        var idUser = JSON.parse(localStorage.getItem('idUser') || "1")
        var user = {
            id : idUser,
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            confPwd : confPwd,
            tel : tel
        }
        var users = JSON.parse(localStorage.getItem("users") || '[]')
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("idUser", idUser+1)
        location.replace('login.html')
    }else{
        console.log('aloo');
    }

}

// generic function : cheks the lenght of a string 

function verifLength(chaine, nb , nn) {
    return (chaine.length >= nb && chaine.length <= nn)
    
  }
  // generic function : validate format email 
  
  function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  }
// logic login
  function login() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var checkUsers = checkUser(email, password)
    if (checkUsers) {
        var user = {
            id : checkUsers.id,
            fName : checkUsers.firstName,
            lName : checkUsers.lastName,
            email : checkUsers.email,
            tel : checkUsers.tel
        }
        localStorage.setItem('connectedUser', JSON.stringify(user))
        if (checkUsers.email == 'oussama@gmail.com') {
            location.replace('admin-index.html')
        } else {
            location.replace('user-index.html')
        }
    } else {
        document.getElementById('loginError').innerHTML = "email or password incorrect"
        document.getElementById('loginError').style.color = "red"
        document.getElementById('loginError').style.fontSize = "20px"
    }
  }

  function checkUser(email , password) {
    var findedUser
    var users = JSON.parse(localStorage.getItem('users') || '[]')
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            findedUser = users[i]
            break;
            
        }  
    }
    return findedUser;
  }
// logOut
  function logOut() {
    localStorage.removeItem('connectedUser')
    location.replace('index.html')
  }

//   navbar
  function header() {
  var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))  
  var carts = JSON.parse(localStorage.getItem('carts'))
  var confirmes = JSON.parse(localStorage.getItem('confirmes'))
  var length =''
  var number = ''
  var nu2 = ''
  var req =''
  var final = ['']


            if (carts) {
              for (let i = 0; i < carts.length; i++) {
                if (carts[i].idUser == connectedUser.id) {
                  final.push(carts[i])
                 length = final.length - 1
                }
                
              }
            } else {
               number = 0
            }

            if (confirmes) {
              for (let i = 0; i < confirmes.length; i++) {
                req = confirmes.length
                
              }
            } else {
              nu2 = 0
            }

  if (connectedUser.email == 'oussama@gmail.com') {
    var menu = `
                    <li class="active"><a href="admin-index.html">Home</a></li>
                <li><a href="admin-shop.html">Store</a></li>
                <li class="has-children">
                    <a href="#">Products</a>
                    <ul class="dropdown">
                      <li><a href="admin-addProduct.html">Add products</a></li>
                      <li><a href="admin-listP.html">List Products</a></li>
                    </ul>
                  </li>
                <li><a href="request.html" class="icons-btn d-inline-block bag">request
              <span class="number">${req} ${nu2}</span>
                </a>
                </li>
                <li><a href="admin-about.html">About</a></li>
                <li><a href="admin-contact.html">Contact</a></li>
              </ul>
            </nav>
          </div>
          
            <a href="admin-cart.html" class="icons-btn d-inline-block bag" style="margin-left: 300px;">
              <span class="icon-shopping-bag"></span>
              <span class="number">${length} ${number}</span>
            </a>
            <a onclick="logOut()" style="color: black; margin-left: 10px;"><i class="fa-sharp fa-solid fa-door-open"></i></a>
            <a  class="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"><span
                class="icon-menu"></span></a>
        
    
    `
  } else {
    var menu = `
                    <li class="active"><a href="user-index.html">Home</a></li>
                <li><a href="user-shop.html">Store</a></li>
                <li><a href="user-about.html">About</a></li>
                <li><a href="user-contact.html">Contact</a></li>
              </ul>
            </nav>
          </div>
          
            <a href="user-cart.html" class="icons-btn d-inline-block bag" style="margin-left: 300px;">
              <span class="icon-shopping-bag"></span>
              <span class="number">${length} ${number}</span>
            </a>
            <a onclick="logOut()" style="color: black; margin-left: 10px;"><i class="fa-sharp fa-solid fa-door-open"></i></a>
            <a  class="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"><span
                class="icon-menu"></span></a>
        
    `
  }  
  document.getElementById('headerMenu').innerHTML = menu

}

function addProd() {
  var pName = document.getElementById('pName').value
  var price = document.getElementById('price').value
  var quantity = document.getElementById('quantity').value
  var mark = document.getElementById('mark').value
  var description = document.getElementById('description').value
  var  image = document.getElementById('image').value
  var img = replaceCh(image)

  var idProduct = JSON.parse(localStorage.getItem('idProduct') || '1')
  var product = {
    id: idProduct,
    pName: pName,
    price: price,
    quantity: quantity,
    mark: mark,
    description: description,
    image: img
  }

  var products = JSON.parse(localStorage.getItem('products') || '[]')
  products.push(product)
  localStorage.setItem('products', JSON.stringify(products))
  localStorage.setItem('idProduct', JSON.stringify(idProduct+1))
  location.reload()
}

function replaceCh(ch) {
  var newCh = ch.replace(/\\/g, "/")
  var res = newCh.replace('fakepath', 'Users/oussama/Desktop/javascript/images')
  return res;
}

function listP() {
  var products = JSON.parse(localStorage.getItem('products'))
  var listP = ''
  for (let i = 0; i < products.length; i++) {
    listP = listP + `
     <tr  id= "table-id">
                  <td></td>
                  <td>${products[i].pName}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].quantity}</td>
                  <td>${products[i].mark}</td>
                  <td>${products[i].description}</td>
                  <td><button class="button button5"  onclick="cartId(${products[i].id})">Edit</button><button class="button button5" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>
    `
    document.getElementById('listP').innerHTML = listP
    
  }
}

function cartId(id) {
  localStorage.setItem('id', id);
  location.replace('admin-edit.html')
}

function cartStore() {
  var idInfo = localStorage.getItem('id');
  var products = JSON.parse(localStorage.getItem('products'));
  var findedPro;
  for (let i = 0; i < products.length; i++) {

    if (products[i].id == idInfo) {
      findedPro = products[i];
      break;
    }
  }

  var editForm = `
                                 
                               <div class="login_form_inner">
                                <h3 style="text-align: center; color: black; font-weight: bold;">Edit Shop</h3>
                                <div>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" value="${findedPro.pName}" id="pName" name="name" placeholder="productName"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Product Name'">
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="number" class="form-control" value="${findedPro.price}" id="price" name="name" placeholder="Price"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Price'">
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="number" class="form-control" value="${findedPro.quantity}" id="quantity" name="name" placeholder="Quantity"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Quantity'">
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <select class="form-control" name="billing_city" id="mark">
                                            <option value=" ${findedPro.mark}" disabled selected>${findedPro.mark}</option>
                                            <option value="parapharmacy">parapharmacy</option>
                                            <option value="Medicine">Medicine</option>
                                        </select>
                                    </div>
                                                                        <div class="form-floating">
                                        <textarea class="form-control" id="description" placeholder="Leave a comment here"
                                            style="height: 100px; width: 515px; margin-left: 13px;">${findedPro.description}</textarea>
                                    </div>
                                    <label for="UrunImage" class="form-label">Product Image</label>
                                    <input type="file" class="form-control"
                                        name="UrunImage" value="${findedPro.image}" id="image">
                                    <div class="col-md-12 form-group">
                                        <button type="submit" value="submit" class="btn btn-danger btn-block"
                                            id="primary-btn"onclick="validateEdit(${findedPro.id})">EDIT PRODUCT</button>

                                    </div>
                                </div>
                            </div>
  `
 document.getElementById('prEdit').innerHTML= editForm
}

// function editProducts(id) {
//   var products = JSON.parse(localStorage.getItem('products'))
//   var findedPro = ''
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id == id) {
//       findedPro = products[i]
    
//   }
// }
// var editForm = `
    
//     <div class="col-lg-12" style ="margin-top: 50px;">
//         <div class="col-md-12 form-group">
//           <input type="text" class="form-control" id="productName" name="name" value ="${findedPro.pName}">
//         </div>
//          <div class="col-md-12 form-group">
//           <input type="number" class="form-control" id="price" name="name" value ="${findedPro.price}">
//         </div>
//         <div class="col-md-12 form-group">
//           <input type="number" class="form-control" id="quantity" name="name" value ="${findedPro.quantity}">
//         </div>
//         <div class="col-md-12 form-group">
//           <input type="text" class="form-control" id="mark" name="name" value ="${findedPro.mark}">
//         </div>
//          <div class="col-md-12 form-group">
//           <input type="text" class="form-control" id="description" name="name" value ="${findedPro.description}">
//         </div>
//         <div class="col-md-12 form-group">
// 		<button type="submit" value="submit" onclick="validateEdit(${id})" class="btn btn-danger" ">Validate Edit</button>
// 		</div>
//       </div>
//     </div>
//   </div>
//     `

//   document.getElementById('prEdit').innerHTML = editForm;
// }
 
function validateEdit(id) {
 var newName = document.getElementById('pName').value;
 var newprice = document.getElementById('price').value;
 var newquantity = document.getElementById('quantity').value;
 var newmark = document.getElementById('mark').value;
 var newdescription = document.getElementById('description').value;
 var newimg = document.getElementById('image').value;
 
 var products = JSON.parse(localStorage.getItem('products'))
 for (let i = 0; i < products.length; i++) {
  if (products[i].id == id) {
    products[i].pName = newName,
    products[i].price = newprice,
    products[i].quantity = newquantity,
    products[i].mark = newmark,
    products[i].description = newdescription
    products[i].image = replaceCh(newimg)
  }

  localStorage.setItem('products', JSON.stringify(products));
  
 }
}

function deleteProduct(pos) {
 var products = JSON.parse(localStorage.getItem('products'))
 products.splice(pos, 1)
 localStorage.setItem('products', JSON.stringify(products))
}

function adminShop() {
  var products = JSON.parse(localStorage.getItem('products'))

  var findedProd = ''
  for (let i = 0; i < products.length; i++) {
    var numb  = Number(products[i].price)
    findedProd = findedProd + `
                      <div class="col">
                    <a> <img onclick='shopSignleId(${products[i].id})' src="${products[i].image}" alt="Image"></a>
                    <h3 class="text-dark"><a>${products[i].pName}</a></h3>
                    <p class="price">${numb.toLocaleString()} TND</p>
                  </div>
    `
  }
  document.getElementById('findedProd').innerHTML = findedProd
}

function shopSignleId(id) {
  localStorage.setItem('id', id)
  location.replace('admin-shopsingle.html')
}

function adminSHopSingle() {
  var idIn = localStorage.getItem('id')
  var products = JSON.parse(localStorage.getItem('products'))
  var finded;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == idIn) {
      finded = products[i]
     
      break;
    }
    
  }
  var numb  = Number(finded.price)
  var showShop = `
                <div class="row">
                <div class="col-md-5 mr-auto">
                  <div class="border text-center">
                    <img id="img" src="${finded.image}" alt="Image" class="img-fluid p-5">
                  </div>
                </div>
                <div class="col-md-6">
                  <h2 id="name" class="text-black">${finded.pName}</h2>
                  <p id="price"><strong  class="text-primary h4">Price: ${numb.toLocaleString()}</strong></p>
        
                  
                  
                  <div class="mb-5">
                    <div class="input-group mb-3" style="max-width: 220px;">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                      </div>
                      <input id="qty" type="text" class="form-control text-center" value="1" placeholder=""
                        aria-label="Example text with button addon" aria-describedby="button-addon1">
                      <div class="input-group-append">
                        <button class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                      </div>
                      <span id="qtyERror"></span>
                    </div>
                  </div>
                  <p onclick="addToCart()"><a  class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary">Add To Cart</a></p>
        
                  <div class="mt-5">
                    <ul class="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                          aria-controls="pills-home" aria-selected="true">Ordering Information</a>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <table class="table custom-table">
                          <thead>
                            <th>Material</th>
                            <th>Description</th>
                            <th>Packaging</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row" id="id">${finded.id}</td>
                              <td id="description">${finded.description}</td>
                              <td id="mark">${finded.mark}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
        
          
                </div>
              </div>
  `
  document.getElementById('showShop').innerHTML = showShop
  document.getElementById('name').innerHTML = finded.pName
}


function addToCart() {
  var qty = document.getElementById('qty').value
  var idIn = localStorage.getItem('id')
  var products = JSON.parse(localStorage.getItem('products'))
  var connectedUser =JSON.parse(localStorage.getItem('connectedUser'))
  var finded;
 
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == idIn) {
      finded = products[i]
     
      break;
    }
  }
if ((Number(qty) > Number(finded.quantity) || (Number(qty) < 0))) {
  document.getElementById('qtyERror').innerHTML = "QTY not Availible";
  document.getElementById('qtyERror').style.color = "red";
} else {
  var idCart = JSON.parse(localStorage.getItem('idCart') || '1')
  var cart = {
    idUser : connectedUser.id,
    id : idCart,
    image : finded.image,
    pName : finded.pName,
    price : finded.price,
    idP : finded.id,
    description : finded.description,
    mark : finded.mark,
    qty : qty
  }
  var carts = JSON.parse(localStorage.getItem('carts')|| '[]')
  carts.push(cart)
  localStorage.setItem('carts', JSON.stringify(carts))
  localStorage.setItem('idCart', JSON.stringify(idCart+1))

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == idIn) {
      products[i].quantity = Number(products[i].quantity) - Number(qty)
     
      break;
    }
  }
  localStorage.setItem('products', JSON.stringify(products))
  location.reload()
}
 
}

function adminCart() {
  var carts = JSON.parse(localStorage.getItem('carts'))
  var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
  var findCart = ''
  var sumCart ;
  var sum = 0
  var foundCart =['']
  for (let i = 0; i < carts.length; i++) {
    var somme = Number(carts[i].qty) * Number(carts[i].price)
    if (carts[i].idUser == connectedUser.id) {
      foundCart.push(carts[i])
      var finall = carts[i]  

      
      sum = sum + somme
      findCart = findCart + `
                              <tr>
                            <td class="product-thumbnail">
                              <img src="${finall.image}" alt="Image" class="img-fluid">
                            </td>
                            <td class="product-name">
                              <h2 class="h5 text-black">${finall.pName}</h2>
                            </td>
                            <td>${finall.price}</td>
                            <td>${finall.qty}</td>
                            <td>${somme.toLocaleString()}</td>
                            <td><a  class="btn btn-primary height-auto btn-sm" onclick="deleteCart(${i},${finall.id})">X</a></td>
                          </tr>
            
      `
      sumCart = `
  
                            <strong class="text-black" >${sum}</strong>
                         
    `
    }
  
  }
  document.getElementById('cartsA').innerHTML = findCart
  document.getElementById('sumA').innerHTML = sum
}

function deleteCart(pos, id) {
  var carts = JSON.parse(localStorage.getItem('carts'))
  var products = JSON.parse(localStorage.getItem('products'))
  var cart = searchObjet(id, carts)
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == cart.idP){
        products[i].quantity = Number(products[i].quantity) + Number(cart.qty)
        
      }
      
   console.log('aloo',products[i].quantity );

  }
  carts.splice(pos, 1)
  localStorage.setItem('products', JSON.stringify(products))
  localStorage.setItem('carts', JSON.stringify(carts))
  location.reload()
 }

function adminCheckout() {
  var carts = JSON.parse(localStorage.getItem('carts'))
  var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
  var findedCheck = ''
  var total = 0
  var subtotal = 0
  var subtotalCh ;
  var foundCart = ['']

  for (let i = 0; i < carts.length; i++) {
if (carts[i].idUser == connectedUser.id) {
  foundCart.push(carts[i])
  var finall = carts[i] 


    checkk = carts[i]
    total = finall.price * finall.qty
    subtotal = subtotal + total
    findedCheck = findedCheck + `
                                <tr>
                              <td>${finall.pName} <strong class="mx-2">x</strong> ${finall.qty}</td>
                              <td>${total}</td>
                            </tr>
    `
    subtotalCh = `
       <tr >
                                <td class="text-black font-weight-bold" ><strong>Cart Subtotal</strong></td>
                                 <td class="text-black"  style="color: black;">${subtotal}</td>
                                    </tr>
                               
                                    
    
    
        
    `
  }
}
  document.getElementById('check').innerHTML = findedCheck
  document.getElementById('subtotalA').innerHTML = subtotalCh
}

function adminOrder(pos , id) {
  var country = document.getElementById('country').value
  if (country === null || country === "") {
    document.getElementById('countryError').innerHTML ='country Empty';
    document.getElementById('countryError').style.color = "red";
}
  var fName = document.getElementById('fName').value
  if (fName === null || fName === "") {
    document.getElementById('fNameError').innerHTML ='fName Empty';
    document.getElementById('fNameError').style.color = "red";
}
  var lName = document.getElementById('lName').value
  if (lName === null || lName === "") {
    document.getElementById('lNameError').innerHTML ='lName Empty';
    document.getElementById('lNameError').style.color = "red";
}
  var address = document.getElementById('address').value
  if (address === null || address === "") {
    document.getElementById('addressError').innerHTML ='address Empty';
    document.getElementById('addressError').style.color = "red";
}
  var stateCountry = document.getElementById('stateCountry').value
  if (stateCountry === null || stateCountry === "") {
    document.getElementById('stateCountryError').innerHTML ='stateCountry Empty';
    document.getElementById('stateCountryError').style.color = "red";
}
  var zip = document.getElementById('zip').value
  if (zip === null || zip === "") {
    document.getElementById('zipError').innerHTML ='zip Empty';
    document.getElementById('zipError').style.color = "red";
}
  var email = document.getElementById('email').value
  if (email === null || email === "") {
    document.getElementById('emailError').innerHTML ='email Empty';
    document.getElementById('emailError').style.color = "red";
}
  var phone = document.getElementById('phone').value
  if (phone === null || phone === "") {
    document.getElementById('phoneError').innerHTML ='phone Empty';
    document.getElementById('phoneError').style.color = "red";
}
  var order = document.getElementById('order').value
  var foundCart = []
  var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
  var carts = JSON.parse(localStorage.getItem('carts'))
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].idUser == connectedUser.id) {
    foundCart.push(carts[i])
  }
}
 console.log('allooaa', foundCart);
    if (!(country === null || country === "") && !(fName === null || fName === "") && !(lName === null || lName === "") && !(address === null || address === "") && !(stateCountry === null || stateCountry === "") && !(zip === null || zip === "") && !(email === null || email === "") && !(phone === null || phone === "")) {
       
      var idConf = JSON.parse(localStorage.getItem('idConf') || '1')
      var confirme = {
        id : idConf,
        country : country,
        fName : fName,
        lName : lName,
        address : address,
        stateCountry : stateCountry,
        zip : zip,
        email : email,
        phone : phone,
        order : order,
        orderCart : foundCart
      }
      var confirmes = JSON.parse(localStorage.getItem('confirmes') || '[]')
      confirmes.push(confirme)
      localStorage.setItem('confirmes', JSON.stringify(confirmes))
      localStorage.setItem('idConf', JSON.stringify(idConf+1))
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].idUser == connectedUser.id) {
          carts.splice(i)
      }
    }
    
    localStorage.setItem('carts', JSON.stringify(carts))
            location.replace('admin-thanks.html')
      }


}

function request() {
  var confirmes = JSON.parse(localStorage.getItem('confirmes'))
  var listC = ''
  var listesCon =''
  var orderCon = ''
  for (let i = 0; i < confirmes.length; i++) {
    listC = confirmes[i]
    orderCon = confirmes[i].orderCart
    listesCon = listesCon + `
  <tr  id= "table-id">
               <td></td>
               <td>${listC.fName} ${listC.lName}</td>
               <td>${listC.country}</td>
               <td>${listC.email}</td>
               <td>${listC.stateCountry}</td>
               <td>${listC.phone}</td>
               <td><button class="button button5"  onclick="printId(${listC.id})">Print</button><button class="button button5" onclick="deleteProduct()">Delete</button></td>
             </tr>
 `
  }
  
 document.getElementById('listC').innerHTML = listesCon
}

function printId(id) {
    localStorage.setItem('id', id)
    location.replace('invoice.html')
}

function invoice() {
 var idP = localStorage.getItem('id')
 var confirmes = JSON.parse(localStorage.getItem('confirmes'))
 var findedInv;
 var today  =  Date.now();
 var today2 = new Date().toLocaleDateString('en-us')
 var findedCart = ''
 var sommeVoice = 0
  for (let i = 0; i < confirmes.length; i++) {
    if (confirmes[i].id == idP) {
      findedInv = confirmes[i]
   

      break;
    }
  }
  for (let i = 0; i < findedInv.orderCart.length; i++) {
    findedCart = findedInv.orderCart[i]
    var sommeTab = findedCart.qty * findedCart.price
    sommeVoice = sommeVoice + sommeTab
    var tabVoice =  tabVoice + `
    <div class="row mb-2 mb-sm-0 py-25">
    <div class="col-9 col-sm-5">${findedCart.pName}</div>
    <div class="d-none d-sm-block col-2">${findedCart.qty}</div>
    <div class="d-none d-sm-block col-2 text-95">${findedCart.price}</div>
    <div class="col-2 text-secondary-d2">${sommeTab}</div>
  </div>
  `
  }
  var print = `                   
                        <div >
                 
                            <span class="text-sm text-grey-m2 align-middle">To:</span>
                            
                            <span class="text-600 text-110 text-blue align-middle">${findedInv.fName} ${findedInv.lName}</span>
                        </div>
                        <div class="text-grey-m2">
                            <div class="my-1">
                                State, Country : ${findedInv.stateCountry} , ${findedInv.country}
                            </div>
                            <div class="my-1"><i class="fa fa-phone fa-flip-horizontal text-secondary"></i> <b class="text-600">Phone : ${findedInv.phone}</b></div>
                        </div>    
    `
    var dateA = `
     <div class="my-2" ><i class="fa fa-circle text-blue-m2 text-xs mr-1" ></i> <span class="text-600 text-90" >ID: ${today}</span></div>

                            <div class="my-2" ><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90" >Issue Date:</span> ${today2}</div>
    `



  document.getElementById('printA').innerHTML = print 
  document.getElementById('printC').innerHTML = dateA  
  document.getElementById('printB').innerHTML =today
  document.getElementById('tabVoice').innerHTML =tabVoice
  document.getElementById('sommeVoice').innerHTML =sommeVoice

}
 function print() {
   window.print()
 
 }

 function userShop() {
  var products = JSON.parse(localStorage.getItem('products'))

  var findedProd = ''
  for (let i = 0; i < products.length; i++) {
    var numb  = Number(products[i].price)
    findedProd = findedProd + `
                      <div class="col">
                    <a> <img onclick='shopSignleId2(${products[i].id})' src="${products[i].image}" alt="Image"></a>
                    <h3 class="text-dark"><a>${products[i].pName}</a></h3>
                    <p class="price">${numb.toLocaleString()} TND</p>
                  </div>
    `
  }
  document.getElementById('findedProd').innerHTML = findedProd
 }

 function shopSignleId2(id) {
  localStorage.setItem('id', id)
  location.replace('user-shopsingle.html')
}

function userSHopSingle() {
  var idIn = localStorage.getItem('id')
  var products = JSON.parse(localStorage.getItem('products'))
  var finded;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == idIn) {
      finded = products[i]
     
      break;
    }
    
  }
  var numb  = Number(finded.price)
  var showShop = `
                <div class="row">
                <div class="col-md-5 mr-auto">
                  <div class="border text-center">
                    <img id="img" src="${finded.image}" alt="Image" class="img-fluid p-5">
                  </div>
                </div>
                <div class="col-md-6">
                  <h2 id="name" class="text-black">${finded.pName}</h2>
                  <p id="price"><strong  class="text-primary h4">Price: ${numb.toLocaleString()}</strong></p>
        
                  
                  
                  <div class="mb-5">
                    <div class="input-group mb-3" style="max-width: 220px;">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                      </div>
                      <input id="qty" type="text" class="form-control text-center" value="1" placeholder=""
                        aria-label="Example text with button addon" aria-describedby="button-addon1">
                      <div class="input-group-append">
                        <button class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                      </div>
                    </div>
                  </div>
                  <p onclick="addToCart()"><a  class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary">Add To Cart</a></p>
        
                  <div class="mt-5">
                    <ul class="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                          aria-controls="pills-home" aria-selected="true">Ordering Information</a>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <table class="table custom-table">
                          <thead>
                            <th>Material</th>
                            <th>Description</th>
                            <th>Packaging</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row" id="id">${finded.id}</td>
                              <td id="description">${finded.description}</td>
                              <td id="mark">${finded.mark}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
        
          
                </div>
              </div>
  `
  document.getElementById('showShop').innerHTML = showShop
  document.getElementById('name').innerHTML = finded.pName
}

function searchObjet(id , objet) {
  var findedObject
  for (let i = 0; i < objet.length; i++) {
    if (objet[i].id == id) {
      findedObject = objet[i]
      break;
    }
    
  }
  return findedObject
}