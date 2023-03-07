const form = document.getElementById("loginForm")
form.addEventListener("submit", e => {
    e.preventDefault()

    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    console.log(obj)

    const url = "/api/auth"
    const headers = {
        "Content-Type": "application/json"
    }
    const method = "POST"
    const body = JSON.stringify(obj);

    fetch(url, {
        headers, method, body
    })
        .then(res => {
            res.json()
            window.location.href = "/products";

        })
        .then(data => console.log(data))
        .catch(error => console.log(error))


})