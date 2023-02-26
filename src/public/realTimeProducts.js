const socket = io()
const divContainer = document.querySelector("div")

socket.on("change", (data) => {
    let innderHTML = ""
    data.forEach(element => {
        innderHTML +=
            `<h2>${element.title}</h2>` +
            `<p>${element.description}</p>`
    });
    divContainer.innerHTML = innderHTML
})

