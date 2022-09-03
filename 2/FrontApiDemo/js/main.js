let productss = []
let prodName = document.getElementById('productName')
let prodDesc = document.getElementById('productDesc')
let prodPrice = document.getElementById('productPrice')
let data = {}
function  clearForm(){
  prodDesc.value = '';
  prodName.value = '';
  prodPrice.value = '';
  prodDesc.classList.remove('is-valid')
  prodName.classList.remove('is-valid')
  prodPrice.classList.remove('is-valid')
}
function getProd() {
  fetch('http://localhost:5000/allProd')
    .then(response => response.json())
    .then(response => {
      productss = response.products 
      showData(productss)

    }

    ).catch(e=>{
      console.log(e);

    }) 
}
getProd()
function setInputsData() {

  data = {
    name: prodName.value,
    price: prodPrice.value,
    description: prodDesc.value,
  } 
}
function validateInputs(){
  return nameValidate() == 0 &
  descValidate() == 0 &
  priceValidate() == 0
}
function addProd() { 
  if(
    validateInputs()
    ) {
       alert("product added successfully :)")
  setInputsData() 
  sendData("addProd", "POST", data)
    }
 
}
function showData(productss) {
  let str = ``;
  for (let count = 0; count < productss.length; count++) {

    str += `
        <tr>
        <td>${productss[count].name}</td>
        <td>${productss[count].description}</td>
        <td>${productss[count].price}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteProd(${productss[count].id})">delete</button>
            <button class="btn btn-success" onclick="update(${count})">update</button> 
            </td> 
    </tr>
        `
  }
  document.getElementById('tbody').innerHTML = str;
}

function sendData(endPoint, method, data) {
  fetch(`http://localhost:5000/${endPoint}`, {

    // Adding method type
    method: method,

    // Adding body or contents to send
    body: JSON.stringify(data),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })

    // Converting to JSON
    .then(response => response.json())

    // Displaying results to console
    .then(obj => {
      if (obj.message == "success") { 
        getProd()
        if (method == "PUT") {
          
          document.getElementById('add').style.display = 'block'
          document.getElementById('update').style.display = 'none'
        }
        else if(method == 'DELETE'){
          alert('data deleted successfully')
        }
        clearForm()
      }
      else{
        alert('err')
      }
    });
}
function deleteProd(id) {
  sendData("deleteProd", "DELETE", { id })
}
let productID
function update(index) {
  prodDesc.value = productss[index].description;
  prodName.value = productss[index].name;
  prodPrice.value = productss[index].price;
  productID = productss[index].id;
  document.getElementById('add').style.display = 'none'
  document.getElementById('update').style.display = 'block'
}
function updateData() {
  if(
    validateInputs()
    ) {
      alert("product updated successfully :)")
      setInputsData()
      sendData("updateProd", "PUT", { id: productID, ...data })
    }
}
function search() {
  let searchTxt = document.getElementById('searchInp').value;
  let newProd = [...productss].filter((product) => {
    return product.name.includes(searchTxt)
  }) 
  showData(newProd)
}
function isNotEmpty(str) {
  return str.length  !== 0;
}
function isName(str) {
  return /^[A-Za-z][A-Z a-z *-.~'_0-9]{2,}/.test(str);
}
function isDecimal(str) { 
  return /^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(str);
}  
let correct = 0;
function validateInputWithoutErr(input){
  input.classList.remove('is-invalid')
  input.classList.add('is-valid')
}
function validateInputWithErr(input){
  input.classList.add('is-invalid')
  input.classList.remove('is-valid')
}
function nameValidate(){
  correct = 0
  let pName = prodName.value  
  if(!isNotEmpty(pName)){
    correct++
    document.getElementById('pNameErrReq').classList.remove('d-none') 
    validateInputWithErr(prodName)
  }
  else{
    document.getElementById('pNameErrReq').classList.add('d-none')
    validateInputWithoutErr(prodName) 
  }
  if(!isName(pName)){
    correct++
    validateInputWithErr(prodName)
    document.getElementById('pNameErrIncorrect').classList.remove('d-none')
  }else{ 
      document.getElementById('pNameErrIncorrect').classList.add('d-none') 
      validateInputWithoutErr(prodName) 
  } 
   return correct
}
function priceValidate(){
  let pPrice = prodPrice.value  
   correct = 0;
  if(!isNotEmpty(pPrice)){
    correct++
    validateInputWithErr(prodPrice) 
    document.getElementById('pPriceErrReq').classList.remove('d-none') 
    
  }
  else { 
   validateInputWithoutErr(prodPrice)
    document.getElementById('pPriceErrReq').classList.add('d-none')

   
 
}
if(!isDecimal(pPrice)){
  correct++ 
  validateInputWithErr(prodPrice)
  document.getElementById('pPriceErrIncorrect').classList.remove('d-none') 
}
else{ 
    document.getElementById('pPriceErrIncorrect').classList.add('d-none')
    validateInputWithoutErr(prodPrice)
  
}
 
return correct
}
function descValidate(){
  correct  = 0
  let pDesc = prodDesc.value 
  if(!isNotEmpty(pDesc)){
    correct++
    document.getElementById('pDescErrReq').classList.remove('d-none')
    validateInputWithErr(prodDesc)
  } else{
    document.getElementById('pDescErrReq').classList.add('d-none')
    validateInputWithoutErr(prodDesc)
  }  
 return correct
}
