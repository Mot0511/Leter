import initApp from "./initApp";
import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";
import {getDatabase, ref, set} from "firebase/database";

const createChat = async (user1, user2, callback) => {
    const app = initApp()
    const db = getFirestore()
    const dbr = getDatabase()

    const chatid = Math.floor(Math.random() * 1000000)

    let data1 = await getDoc(doc(db, 'users', user1))
    data1 = data1.data().chats
    data1.push({
        user: user2,
        chatid: String(chatid)
    })

    let data2 = await getDoc(doc(db, 'users', user2))
    data2 = data2.data().chats
    data2.push({
        user: user1,
        chatid: String(chatid)
    })

    await updateDoc(doc(db, 'users', user1), {
        chats: data1
    })
    await updateDoc(doc(db, 'users', user2), {
        chats: data2
    })

    set(ref(dbr, `chats/${chatid}`), {
        users: [user1, user2],
        chat: []
    })

    callback()

}
export default createChat