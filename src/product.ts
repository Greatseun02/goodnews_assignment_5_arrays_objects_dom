let arrayOfObjects = [
    {
        id: "item-1",
        price:15.99,
        name:"Wireless Mouse",
    },
    {
        id: "item-2",
        price:25.49,
        name:"USB Keyboard",
    },
    {
        id: "item-3",
        price:120,
        name:"HD Monitor",
    },
    {
        id: "item-4",
        price:34.99,
        name:"Laptop Stand",
    },
]

const productList = document.querySelector("#product-list") as HTMLUListElement;    

arrayOfObjects.forEach((item) => {
    productList.innerHTML += `
        <div class="product-card" key=${item.id}>
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button class="add ${item.id}">Add to Cart</button>
        </div>
    `
})

const addButtons = document.querySelectorAll(".add") as NodeListOf<HTMLButtonElement>;
const cartItems = document.querySelector("#cart-items") as HTMLUListElement;
const totalQuantity = document.querySelector("#total-quantity") as HTMLSpanElement;
const totalAmount = document.querySelector("#total-amount") as HTMLSpanElement;
const clear = document.querySelector("#clear") as HTMLButtonElement;

let cart: {id:string, name:string, amount:number, count:number}[] = [];

addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        console.log(button.classList)
        let selectedItem = arrayOfObjects.find(item=> item.id === button.classList[1]);
        
        if (selectedItem) {
            let cartItem = cart.find(item => item.id === selectedItem.id);
            if (cartItem) {
                cartItem.count++;
            } else {
                cart.push({
                    id: selectedItem.id,
                    name: selectedItem.name,
                    amount: selectedItem.price,
                    count: 1
                });
            }
        }

        
            cartItems.innerHTML = 
                cart.map((item) => {
                    return `
                        <li class="cart-item">
                            ${item.name} - $${item.amount} x ${item.count}
                        </li>
                    `
                }).join("");
            let totalCount = cart.reduce((acc, item) => acc + item.count, 0);
            let totalPrice = cart.reduce((acc, item) => acc + (item.amount * item.count), 0);

            totalQuantity.innerHTML = totalCount.toString();
            totalAmount.innerHTML = totalPrice.toFixed(2);
    });    
});


clear.addEventListener("click", (event) => {
    cart = [];
    cartItems.innerHTML = "";
    totalQuantity.innerHTML = "0";
    totalAmount.innerHTML = "0.00";
});