const inputSearch = document.querySelector(".inputSearch");
const inputCantidad = document.querySelector(".inputCantidad");
const inputButton = document.querySelector(".inputButton");
const inputButtonRestore = document.querySelector(".restoreButton");
const listTable = document.querySelector("div.listTable");
let idCount = 1;

const saveLocalList = () => {
    localStorage.setItem("lista", JSON.stringify(listaArray));
}
const restoreLocalList = () => {
    return JSON.parse(localStorage.getItem("lista"));
}

let listaArray = restoreLocalList() || [];
const addListProduct = () => {
    let id = idCount;
    idCount += 1;
    let name = inputSearch.value;
    let cantidad = inputCantidad.value
    if (name.length > 0) {
        listaArray.push({ id: id, name: name, cantidad: cantidad })
        cargarList(listaArray);
        saveLocalList();
    } else {
        return
    }
}
inputButton.addEventListener("click", addListProduct);
inputSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addListProduct();
    }
});
inputCantidad.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

const returnList = (producto) => {
    return `<article>
                <h2>${producto.name}</h2>
                <span>x${producto.cantidad}</span>
                <button id="${producto.id}" class="deleteItem">❌</button>
            </article>`;
}

const deleteItem = () => {
    const buttonDelete = document.querySelectorAll(".deleteItem");
    buttonDelete.forEach((button) => {
        button.addEventListener("click", (e) => {
            let deleteProduct = listaArray.findIndex(producto => producto.id === parseFloat(e.currentTarget.id))
            listaArray.splice(deleteProduct, 1);
            cargarList(listaArray);
            saveLocalList();
        })
    })
}
const restoreLista = () => {
    localStorage.removeItem("lista");
    window.location.reload();
}
inputButtonRestore.addEventListener("click", restoreLista)

const cargarList = (productList) => {
    listTable.innerHTML = ""
    if (listaArray.length > 0) {
        productList.forEach((producto) => listTable.innerHTML += returnList(producto))
        deleteItem();
    } else {
        listTable.innerHTML = `<div class="emptyList">
                                  <h2>🛒</h2>
                                  <p>La Lista esta Vacía</p>
                                </div>`
    }
}
cargarList(listaArray);