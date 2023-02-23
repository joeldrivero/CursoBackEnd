function addCart(value) {
  console.log(value)
  fetch(`http://localhost:8080/api/carts/63f01165551d1485d03d172c/product/${value}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
    .then((res) => {
      console.log(res)
      alert("Producto agregado correctamente")
    }).catch((error) => console.error(error))
}

