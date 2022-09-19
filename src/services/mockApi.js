const data = [
    {
        id: 1,
        nombre: "CTR nitro Fueled",
        precio: "$30",
        stock: 5,
        categoría: "Carrera",
        img: "/assets/img/items/ctr.JPG"
    },
    {
        id: 2,
        nombre: "Ghost of Tsushima",
        precio: "$35",
        stock: 4,
        categoría: "Aventura",
        img: "/assets/img/items/ghostoftsushima.JPG"
    },
    {
        id: 3,
        nombre: "God of war",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/GOW.JPG"
    },
    {
        id: 4,
        nombre: "Grand Theft Auto V",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/GTAV.JPG"
    },
    {
        id: 5,
        nombre: "Horizon Zero Dawn",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/HORIZON.JPG"
    },
    {
        id: 6,
        nombre: "Resident Evil Village",
        precio: "$30",
        stock: 5,
        categoría: "Terror",
        img: "/assets/img/items/ReVillage.JPG"
    },
    {
        id: 7,
        nombre: "Marvel's Spider-Man",
        precio: "$30",
        stock: 5,
        categoría: "Aventura",
        img: "/assets/img/items/spiderman.JPG"
    },
    {
        id: 8,
        nombre: "Tekken 7",
        precio: "$30",
        stock: 5,
        categoría: "lucha",
        img: "/assets/img/items/tekken.JPG"
    },
    {
        id: 9,
        nombre: "The Las Of Us Part. 1",
        precio: "$30",
        stock: 5,
        categoría: "Terror",
        img: "/assets/img/items/THLUS1.JPG"
    },
    {
        id: 10,
        nombre: "The Last Of Us Part. 2",
        precio: "$30",
        stock: 5,
        categoría: "Terror",
        img: "/assets/img/items/THLUS2.JPG"
    },
]


function getData(){
    return new Promise( (resolve,reject) => {
        setTimeout(() => {
            resolve(data)
        }, 1000);
    })
}

export{
    getData
}