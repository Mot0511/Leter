import {initializeApp} from "firebase/app";

const init = () => {
    const app = initializeApp({
        apiKey: "AIzaSyDe7COoUZE1Vdj5BAUdKvpKLGq9o3wjo3Q",
        authDomain: "leter-c9547.firebaseapp.com",
        projectId: "leter-c9547",
        storageBucket: "leter-c9547.appspot.com",
        messagingSenderId: "906396413843",
        appId: "1:906396413843:web:cca0f79575c1bf42c7c266",
        measurementId: "G-0T2DB8N8L5",
        databaseURL: "https://leter-c9547-default-rtdb.firebaseio.com/",
    })

    return app
}
export default init