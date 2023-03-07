const form = document.getElementById("signupForm")
form.addEventListener("submit", e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)

  console.log(obj)

  const url = "/api/users"
  const headers = {
    "Content-Type": "application/json"
  }
  const method = "POST"
  const body = JSON.stringify(obj);

  fetch(url, {
    headers, method, body
  }).then(res => {
    res.json()
    window.location.href = "/login";

  }).then(data => console.log(data)).catch(error => console.log(error))

})

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

