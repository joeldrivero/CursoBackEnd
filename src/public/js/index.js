function addCart(value) {  
  fetch(`http://localhost:8080/api/carts/63f90d26c381e7bcd65b3475/product/${value}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
    .then((res) => {
      alert("Producto agregado correctamente")
    }).catch((error) => console.error(error))
}