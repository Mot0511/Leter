import initApp from "./initApp";
import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

const friends = async (user1, user2, action, callback) => {
    const app = initApp()
    const db = getFirestore(app)

    if (action === 'sendRequest'){
        const data = await getDoc(doc(db, 'users', user2))
        const requests = data.data().requests
        requests.push(user1)
        await updateDoc(doc(db, 'users', user2), {
            requests: requests
        })
        callback()
    }
    else if (action === 'removeRequest') {
        const data2 = await getDoc(doc(db, 'users', user2))
        const requests2 = data2.data().requests.filter(el => el !== user1)

        await updateDoc(doc(db, 'users', user2), {
            request: requests2
        })

        callback()
    }
    else if (action === 'removeFriend') {
        const data = await getDoc(doc(db, 'users', user1))
        const data2 = await getDoc(doc(db, 'users', user2))

        const friends = data.data().friends.filter(el => el !== user2)
        const friends2 = data2.data().friends.filter(el => el !== user1)

        await updateDoc(doc(db, 'users', user1), {
            friends: friends
        })
        await updateDoc(doc(db, 'users', user2), {
            friends: friends2
        })

        callback()

    }
    else if (action === 'addFriend') {
        const data = await getDoc(doc(db, 'users', user1))
        const data2 = await getDoc(doc(db, 'users', user2))

        const friends = data.data().friends
        const friends2 = data2.data().friends


        const ref = doc(db, 'users', user1)
        const ref2 = doc(db, 'users', user2)

        await updateDoc(ref, {
            friends: [...friends, user2]
        })
        await updateDoc(ref2, {
            friends: [...friends2, user1]
        })

        let requests = data.data().requests
        requests = requests.filter(el => el !== user2)
        await updateDoc(ref, {
            requests: requests
        })

        callback(requests)
    }



}

export default friends