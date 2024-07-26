import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthencated, setIsAuthencated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(' --- Got User : ', user);
            if (user) {
                setIsAuthencated(true);
                setUser(user);
                updateUserData(user.uid);
            }
            else {
                setIsAuthencated(false);
                setUser(null);
            }
        })
        return unsub;
    }, [])

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId, })
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('User Login : ', response?.user);
            return { success: true }
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
            if (msg.includes('(auth/invalid-credential)')) msg = 'Incorrect email or password ';
            return { success: false, msg }
        }
    }
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response?.user);
            // setUser(response?.user);
            // setIsAuthencated(true);

            await setDoc(doc(db, "users", response?.user.uid), {
                username,
                profileUrl,
                email,
                userId: response?.user.uid
            })
            return { success: true, data: response?.user }
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
            if (msg.includes('(auth/email-already-in-user')) msg = 'This email is already';
            return { success: false, msg }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true }
        } catch (e) {
            return { success: false, msg: e.message, error: e }
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthencated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider')
    }
    return value;
}