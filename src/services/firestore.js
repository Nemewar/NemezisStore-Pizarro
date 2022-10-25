

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    addDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//para realizar operaciones con la bd
const firestore = getFirestore(app);



const data = [
    {
        id: 1,
        nombre: "CTR nitro Fueled",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/ctr.JPG"
    },
    {
        id: 2,
        nombre: "Ghost of Tsushima",
        precio: "$35",
        stock: 4,
        categoria: "ps4",
        img: "/assets/img/items/ps4/ghostoftsushima.JPG"
    },
    {
        id: 3,
        nombre: "God of war",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/GOW.JPG"
    },
    {
        id: 4,
        nombre: "Grand Theft Auto V",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/GTAVps4.JPG"
    },
    {
        id: 5,
        nombre: "Horizon Zero Dawn",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/HORIZON.JPG"
    },
    {
        id: 6,
        nombre: "Resident Evil Village",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/ReVillage.JPG"
    },
    {
        id: 7,
        nombre: "Marvel's Spider-Man",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/spiderman.JPG"
    },
    {
        id: 8,
        nombre: "Tekken 7",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/tekken.JPG"
    },
    {
        id: 9,
        nombre: "The Las Of Us Part. 1",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/THLUS1.JPG"
    },
    {
        id: 10,
        nombre: "The Last Of Us Part. 2",
        precio: "$30",
        stock: 5,
        categoria: "ps4",
        img: "/assets/img/items/ps4/THLUS2.JPG"
    },
    {
        id: 11,
        nombre: "COD: Black Ops Cold War",
        precio: "$41",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/call of duty black ops cold war.jpg"
    },
    {
        id: 12,
        nombre: "Fallout 76: Wastelanders",
        precio: "$9",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/Fallout76.jpg"
    },
    {
        id: 13,
        nombre: "FIFA 21",
        precio: "$11",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/fifa21.jpg"
    },
    {
        id: 14,
        nombre: "Forza Horizon 4",
        precio: "$22",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/forzahorizon4.jpg"
    },
    {
        id: 15,
        nombre: "Grand Theft Auto V",
        precio: "$20",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/GTAVxbox.jpg"
    },
    {
        id: 16,
        nombre: "Metro Exodus",
        precio: "$14",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/metroexodus.jpg"
    },
    {
        id: 17,
        nombre: "Red Dead Redemption 2",
        precio: "$29",
        stock: 5,
        categoria: "xboxone",
        img: "/assets/img/items/xboxone/readdeadredemption.jpg"
    },
    {
        id: 18,
        nombre: "Just Dance 2022",
        precio: "$19",
        stock: 5,
        categoria: "nintendoswitch",
        img: "/assets/img/items/nintendoswitch/justdance2022.jpg"
    },
    {
        id: 19,
        nombre: "Minecraft",
        precio: "$15",
        stock: 5,
        categoria: "nintendoswitch",
        img: "/assets/img/items/nintendoswitch/minecraft.jpg"
    },
    {
        id: 20,
        nombre: "Pokémon Legends: Arceus",
        precio: "$50",
        stock: 5,
        categoria: "nintendoswitch",
        img: "/assets/img/items/nintendoswitch/pokemonlegendsarkeus.jpg"
    },
    {
        id: 21,
        nombre: "Super Mario Odyssey",
        precio: "$49",
        stock: 5,
        categoria: "nintendoswitch",
        img: "/assets/img/items/nintendoswitch/supermarioodyssey.jpg"
    },
    {
        id: 22,
        nombre: "Super Smash Bros. Ultimate",
        precio: "$49",
        stock: 5,
        categoria: "nintendoswitch",
        img: "/assets/img/items/nintendoswitch/supersmashbros.jpg"
    }
]

const exportDataToFirestore = async () => {
    //si no existe la coleccion la crea
    const miColeccion = collection(firestore, "videojuegos");
    //la data a exportar tiene que ser un objeto
    let nData = data.map(item => {
        const { id, ...itemSinId } = item;
        return itemSinId;
    })

    for (let item of nData) {
        const queryImg = query(miColeccion, where("img", "==", item.img));
        const fItem = await getDocs(queryImg);
        if (fItem.empty) {
            await addDoc(miColeccion, item)
        }
    }
}



export {
    app,
    firestore,
    exportDataToFirestore
}


