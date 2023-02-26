const socket = io()
const divContainer = document.querySelector("div")

socket.on("change", (data) => {
    console.log(data)
    let innderHTML = ""
    data.forEach(element => {
        innderHTML +=
            `<h2>${element.title}</h2>` +
            `<p>${element.description}</p>`

    });
    console.log(innderHTML)
    divContainer.innerHTML = innderHTML
})


 