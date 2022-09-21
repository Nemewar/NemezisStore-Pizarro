const data = [
    {
        id: 1,
        nombre: "CTR nitro Fueled",
        precio: "$30",
        stock: 5,
        categoría: "Carrera",
        img: "/assets/img/items/ctr.JPG",
        consola: "ps4"
    },
    {
        id: 2,
        nombre: "Ghost of Tsushima",
        precio: "$35",
        stock: 4,
        categoría: "Aventura",
        img: "/assets/img/items/ghostoftsushima.JPG",
        consola: "ps4"
    },
    {
        id: 3,
        nombre: "God of war",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/GOW.JPG",
        consola: "ps4"
    },
    {
        id: 4,
        nombre: "Grand Theft Auto V",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/GTAV.JPG",
        consola: "ps4"
    },
    {
        id: 5,
        nombre: "Horizon Zero Dawn",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/HORIZON.JPG",
        consola: "ps4"
    },
    {
        id: 6,
        nombre: "Resident Evil Village",
        precio: "$30",
        stock: 5,
        categoría: "Terror",
        img: "/assets/img/items/ReVillage.JPG",
        consola: "ps4"
    },
    {
        id: 7,
        nombre: "Marvel's Spider-Man",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/spiderman.JPG",
        consola: "ps4"
    },
    {
        id: 8,
        nombre: "Tekken 7",
        precio: "$30",
        stock: 5,
        categoría: "lucha",
        img: "/assets/img/items/tekken.JPG",
        consola: "ps4"
    },
    {
        id: 9,
        nombre: "The Las Of Us Part. 1",
        precio: "$30",
        stock: 5,
        categoría: "Terror",
        img: "/assets/img/items/THLUS1.JPG",
        consola: "ps4"
    },
    {
        id: 10,
        nombre: "The Last Of Us Part. 2",
        precio: "$30",
        stock: 5,
        categoría: "Terror",
        img: "/assets/img/items/THLUS2.JPG",
        consola: "ps4"
    },
]


function getData(){
    return new Promise( (resolve,reject) => {
        setTimeout(() => {
            resolve(data)
        }, 1000);
    })
}

function getSingleItem(id){
    return new Promise( (resolve,reject) => {
        const item = data.find( item => item.id===id);
        if(item){
            setTimeout(() => {
               resolve(item) 
            }, 2000);
        }
        else{
            reject("No existe un item con ese id")
        }
    })
}

export{
    getData,
    getSingleItem
}