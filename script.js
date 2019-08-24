//variables
const clothes = document.querySelector('.items');
const cart = document.querySelector('#tableBody');
const clearCart = document.getElementById('clearCartBtn');


//event listeners


function eventLoad(){
    clothes.addEventListener('click', buyClothes);
    cart.addEventListener('click',removeListedItem);
    clearCart.addEventListener('click', clearCartItems);
    document.addEventListener('DOMContentLoaded', showItemsLS);
    
}
eventLoad();


//functions

function showItemsLS(){
   let itemHaru = checkLS();
    itemHaru.forEach(function(clothesInfo){

        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td class = "td1"><img src = "${clothesInfo.photo}" ></td>
            <td>${clothesInfo.title}</td>
            <td>${clothesInfo.price}</td>
            <td >
            <span 
            style = " color: red;
            font-weight:bold;
            cursor:pointer;"
             class = "removeX" >X</span>
             </td>
        
        `;
        cart.appendChild(tr);
    });
    
    
}

function buyClothes(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-primary')){
        const item = e.target.parentElement;
        getItemInfo(item);
    }
}

function getItemInfo(item){
    const clothesInfo = {
        photo: item.querySelector('img').src,
        title: item.querySelector('h4').textContent,
        price: item.querySelector('h5').textContent
    }

    function removeItem(e){
        console.log(e.target.parentElement);

    }

    addToCart(clothesInfo);
}

function addToCart(clothesInfo){
    // var removeBtn = document.createElement('a');
    // removeBtn.textContent = 'X';
    // removeBtn.classList = 'removeBtn';

    var tr = document.createElement('tr');
    tr.innerHTML = `
        <td class = "td1"><img src = "${clothesInfo.photo}" ></td>
        <td>${clothesInfo.title}</td>
        <td>${clothesInfo.price}</td>
        <td >
        <span 
        style = " color: red;
        font-weight:bold;
        cursor:pointer;"
         class = "removeX" >X</span>
         </td>
    
    `;



    const tbody = document.getElementById('tableBody');
    tbody.appendChild(tr);
    addToLS(clothesInfo);

}

function addToLS(clothesInfo){
    let fit = checkLS();
    fit.push(clothesInfo);
    console.log(fit);
    localStorage.setItem('lugaFato', JSON.stringify(fit));
}


function checkLS(){
    let lugaFato;
    const fits = localStorage.getItem('lugaFato');
    if(fits === null){
        lugaFato = [];
    }
    else{
        lugaFato = JSON.parse(fits)
    }
    console.log(lugaFato);
    return lugaFato;
}

function removeListedItem(e){
    if(e.target.classList.contains('removeX')){
        let rem = e.target.parentElement.parentElement;
        rem.remove();
        removeItemsFromLS(rem);
        }
    
   
}

function removeItemsFromLS(rem){
    let fit = checkLS();
    fit.forEach(function(title){
        console.log(title);
    }); 
}

function clearCartItems(){
     cart.innerHTML = '';
     localStorage.clear();
}