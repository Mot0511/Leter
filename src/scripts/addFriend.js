import initApp from "./initApp";
import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

const addFriend = async (user1, user2, callback) => {
    const app = initApp()
    const db = getFirestore(app)
    const data = await getDoc(doc(db, 'users', user1))
    const friends = data.data().friends
    const countFriends = data.data().countFriends + 1
    const ref = doc(db, 'users', user1)
    await updateDoc(ref, {
        friends: [...friends, user2]
    })
    await updateDoc(ref, {
        countFriends: countFriends
    })
    callback()

}

export default addFriend