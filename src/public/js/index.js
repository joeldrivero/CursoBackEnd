function addCart(value) {  
  fetch(`http://localhost:8080/api/carts/63f8163ce01c0e40116afbba/product/${value}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
    .then((res) => {
      alert("Producto agregado correctamente")
    }).catch((error) => console.error(error))
}