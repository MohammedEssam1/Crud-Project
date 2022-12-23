var nameInput = document.getElementById('productName')
var categoryInput = document.getElementById('productCategory')
var priceInput = document.getElementById('productPrice')
var descriptionInput = document.getElementById('productDescription')
var tableBody = document.getElementById('tbody')
var AddBut = document.getElementById('AddBut')
var alertDiv = document.querySelector('.alert')
var myArray = []

if (localStorage.getItem('productData')!=null){
    myArray = JSON.parse(localStorage.getItem('productData'))
   displayProduct()  
}


function Add() {
    if ( document.getElementById('AddBut').innerHTML != 'update' &&validateProductName()){
        var product = {
        index:'',
        pname:  nameInput.value ,
        category:  categoryInput.value ,
        price: priceInput.value  ,
        description:  descriptionInput.value ,
    }
    myArray.push (product)  
    localStorage.setItem('productData' , JSON.stringify(myArray))
    displayProduct() 
   Clear();
    }
}
function Clear() {
    nameInput.value = ''
    categoryInput.value = ''
    priceInput.value = ''
    descriptionInput.value = ''
}
function displayProduct() {
    var trs ='' ;
    for (var i = 0; i < myArray.length; i++) {
        myArray[i].index = i
        trs +=   `<tr>
        <td>${myArray[i].index}</td>
        <td>${myArray[i].pname}</td>
        <td>${myArray[i].category}</td>
        <td>${myArray[i].price}</td>
        <td>${myArray[i].description}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-pen"></i></button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`     
    }

    tableBody.innerHTML = trs

}
function Search (){
    
    var searchInput = document.getElementById('searchProduct')
    var trs ='' ;
    for (var i = 0; i < myArray.length; i++) {
    if ( myArray[i].pname.includes(searchInput.value)   ) {
        var searchLength = searchInput.value.length
        var searchIndex = myArray[i].pname.indexOf(searchInput.value)
        var searchSlice = myArray[i].pname.slice(searchIndex + searchLength)
        var searchSlice2 = myArray[i].pname.slice(0,searchIndex)
        
        trs +=   `<tr>
        <td>${i}</td>
        <td>${searchSlice2}<mark>${searchInput.value}</mark>${searchSlice}</td>
        <td>${myArray[i].category}</td>
        <td>${myArray[i].price}</td>
        <td>${myArray[i].description}</td>
        <td><button class="btn btn-outline-warning"><i class="fa-solid fa-pen"></i></button></td>
        <td><button class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`  
    } 
    }
    tableBody.innerHTML = trs
}

function deleteProduct(indexOfProduct) {

   myArray.splice(indexOfProduct,1)
   localStorage.setItem('productData' , JSON.stringify(myArray) ) 
    displayProduct()
}


var x;
function updateProduct(indexOfProduct) {
    nameInput.value = myArray[indexOfProduct].pname
    categoryInput.value = myArray[indexOfProduct].category
    priceInput.value = myArray[indexOfProduct].price
    descriptionInput.value = myArray[indexOfProduct].description
    x = myArray[indexOfProduct].index
    console.log(x)
    document.getElementById('AddBut').innerHTML = 'update'
}

function update(){
    if ( document.getElementById('AddBut').innerHTML == 'update') {
        var product = {
            index:x,
            pname:  nameInput.value ,
            category:  categoryInput.value ,
            price: priceInput.value  ,
            description:  descriptionInput.value ,
        }
        myArray.splice( x, 1 , product)
        localStorage.setItem('productData' , JSON.stringify(myArray))
        displayProduct() 
       Clear();
       document.getElementById('AddBut').innerHTML = 'add product'
    }
}

function validateProductName() {
    var pNameRegex=/^[A-Z]\w{5,15}/;
    var pname1 = nameInput.value;
    if (pNameRegex.test(pname1)) {
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        alertDiv.classList.add('d-none')
        AddBut.classList.remove('disabled')
        return true;
    }
    else{
        alertDiv.classList.remove('d-none')
        nameInput.classList.add('is-invalid')
        AddBut.classList.add('disabled')
        return false;
    }
}

nameInput.addEventListener('blur',validateProductName)

console.log(AddBut)