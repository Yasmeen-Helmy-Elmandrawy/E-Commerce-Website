const Pname = document.getElementById("Pname")
const catagory = document.getElementById("Pcatagory")
const budget = document.getElementById("budget")
const productsContainer = document.getElementById("productsContainer")
let storedData = JSON.parse(localStorage.getItem("data"))
let products = [
    {
        id: 0,
        name: "Realme C53",
        image: "images/realmeC53.jpg",
        price: "$295", 
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 1,
        name: "Huawel Nova Y90",
        image: "images/huawelnovaY90.jpg",
        price: "$276", 
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 2,
        name: "Infinix Hot 20",
        image: "images/infinixhot20.jpg",
        price: "$221", 
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 3,
        name: "Iphone 14 Plus",
        image: "images/iphone14plus.jpg",
        price: "$1999", 
        catagory: "Iphone",
        amount: 0,
        fav: false

    },
    {
        id: 4,
        name: "Iphone 14 Pro Max",
        image: "images/iphone14promax.jpg",
        price: "$2023", 
        catagory: "Iphone",
        amount: 0,
        fav: false

    },
    {
        id: 5,
        name: "Iphone 15 Plus",
        image: "images/iphone15plus.jpg",
        price: "$2116", 
        catagory: "Iphone",
        amount: 0,
        fav: false

    },
    {
        id: 6,
        name: "Redmi 12",
        image: "images/redmi12.jpg",
        price: "$345", 
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 7,
        name: "Redmi Not 12",
        image: "images/redminot12.jpg",
        price: "$363", 
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 8,
        name: "Sumsung Galaxy A54",
        image: "images/sumsunggalaxyA54.jpg",
        price: "$410",
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 9,
        name: "Sumsung Galaxy M34",
        image: "images/sumsunggalaxyM34.jpg",
        price: "$366",
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 10,
        name: "Xiaomi Redmi 10",
        image: "images/xiaomiredmi10.jpg",
        price: "$232",
        catagory: "Phone",
        amount: 0,
        fav: false

    },
    {
        id: 11,
        name: "Nokia C10",
        image: "images/nokiaC10.jpg",
        price: "$103",
        catagory: "Phone",
        amount: 0,
        fav: false

    }
]
let productsToDraw = [...products]
let favourites = JSON.parse(localStorage.getItem("favs"))

Pname.addEventListener("keyup", filterInput)
catagory.addEventListener("keyup", filterInput)
budget.addEventListener("keyup", filterInput)

function filterInput() {
    productsToDraw = products.filter((product) => product.name.toLowerCase().includes(Pname.value.toLowerCase().trim()))
    productsToDraw = productsToDraw.filter((product) => product.catagory.toLowerCase().includes(catagory.value.toLowerCase().trim()))
    if (budget.value) {
        productsToDraw = productsToDraw.filter((product) => {
            let price = +product.price.replace("$", "")
            console.log(price)
            return price <= budget.value
        })
    }
    renderProducts()
}

function renderProducts() {
    
    productsContainer.textContent = ""
    for (let i = 0; i < products.length; i++) {
        if (productsToDraw.indexOf(products[i]) != -1) {
            productsContainer.innerHTML += `
                <div class="col-md-6 col-lg-3 box"  >
                    <div class="text-center rounded" >
                        <div class="image overflow-hidden position-relative">
                            <img src="${products[i].image}" loading="lazy" class="img-fluid bg-secondary bg-opacity-10 rounded-top" style="width:100%; height:350px;" alt="Realme C53">
                        </div>
                        <div class="px-4 py-4 border border-top-0 position-relative">
                            <h5 class="fw-bold">${products[i].name}</h5>
                            <p class="opacity-75 mb-1 " style="">Price: ${products[i].price}</p>
                            <i class="fas fa-star py-2" style="color: rgb(255, 192, 34);"></i>
                            <i class="fas fa-star" style="color: rgb(255, 192, 34);"></i>
                            <i class="fas fa-star" style="color: rgb(255, 192, 34);"></i>
                            <i class="fas fa-star" style="color: rgb(255, 192, 34);"></i>
                            <i class="fas fa-star" style="color: rgb(255, 192, 34);"></i>
                            <p class="opacity-75">Catagory: ${products[i].catagory}</p>
                            <span class='opacity-75 fw-bold'>Quantity: </span>
                            <input type="number" id='amount${products[i].id}'  onblur="reset(event)" min="1" max="99" value="1"  class='fw-bold mb-3 text-center ' style='width:40px; '>
                            <i onclick='favourite(${products[i].id})' class="favBtn position-absolute rounded-circle p-2  fav${products[i].id} fas fa-heart fa-2x " style="top: -25px; right: -20px; background-color: rgb(230, 230, 230); transition: .3s; cursor: pointer;"></i>
                            <div class="d-flex flex-column  ">
                                <button onclick="addToCart(${products[i].id})"class="mb-3 border-2 border-black bg-white cartBtn${products[i].id} btn py-2 rounded-0 fw-bold btn4 text-black" style="transition: .3s; border: 2px solid #FECD18; ">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            drawFav(i)
            if (products[i].amount != 0) {
                let btn = document.querySelector(`.cartBtn${i}`)
                btn.setAttribute("onclick", `removeFromCart(${i})`)
                btn.textContent = "Remove From Cart"
            }
            if (products[i].fav) {
                let heart = document.querySelector(`.fav${i}`)
                heart.style.color = "red"
            }
        }
    }
    
    productsContainer.innerHTML += `
        <div class="toast-container position-fixed bottom-0 end-0 p-3 text-white ">
            <div id="liveToast" class="toast bg-success " role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-success text-white">
                    <i class="fas fa-check-circle pe-2"></i>
                    <strong class="me-auto">Item Added!</strong>
                    <small>1 min ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">

                </div>
            </div>
        </div>
        <div class="toast-container position-fixed bottom-0 end-0 p-3 text-white ">
            <div id="liveToast" class="toast bg-danger " role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-danger text-white">
                    <i class="fas fa-check-circle pe-2"></i>
                    <strong class="me-auto">Item Removed!</strong>
                    <small>1 min ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">

                </div>
            </div>
        </div>`
    
    if (productsToDraw.length == 0) {
        let h2 = document.createElement("h2")
        h2.textContent = "No products were found!"
        h2.style.textAlign = "center"
        productsContainer.appendChild(h2)
    }
}

function getStoredData() {
    if (localStorage.getItem("signed") === "true") {
        products.forEach((ele, index) => {
            let i = storedData.findIndex((x) => x.id == ele.id)
            if (i != -1) {
                products[index].amount = storedData[i].amount
            }
        })
        favourites.forEach((ele) => {
            let i = ele.id
            products[i].fav = true
        })
    }

}
getStoredData()
renderProducts()

function drawFav(id) {
    let fav = document.querySelector(`.fav${id}`)
    if (products[id].fav) {
        fav.style.color = "red"
    }
    else {
        fav.style.color = ""
    }
}