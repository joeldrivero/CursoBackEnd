const socket = io()
const productForm = document.getElementById('productForm')

socket.on('getProducts', products => {
  document.getElementById('productList').innerHTML = updateTable(products)
});

const url = 'http://localhost:8080/api/products'

productForm.addEventListener('submit', handleSubmit_productForm)

function handleSubmit_productForm(event) {
  event.preventDefault()
  const { title, description, code, price, stock, category } = event.target
  addProduct({
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
    status: true
  })
}

function addProduct({ title, description, code, price, stock, category, status }) {

  const newProduct = { title, description, code, price, stock, category, status }

  fetch("http://localhost:8080/api/products", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((res) => {
      socket.emit('addProduct');
      productForm.reset()
    })
    .catch((error) => console.error(error))
}

function updateTable(products) {

  const productList = `
    {{#if allProductos.[0]}}
    <table class="table table-sm table-hover">
      <caption>Lista total de productos</caption>
      <thead>
        <tr>
          <th scope="col">Codigo</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Precio</th>
          <th scope="col">Categoria</th>
        </tr>
      </thead>
      <tbody>
        {{#each allProductos}}
        <tr>
          <td>{{this.code}}</td>
          <td>{{this.title}}</td>
          <td>{{this.description}}</td>
          <td>{{this.price}}</td>
          <td>{{this.category}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
    {{else}}
    <h2>No hay productos en la lista</h2>
    {{/if}}
    `

  var template = Handlebars.compile(productList);
  let html = template({ allProductos: products });
  return html;
}
