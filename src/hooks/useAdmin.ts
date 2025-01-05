import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/configFirebase";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

if (!ADMIN_EMAIL) {
    throw new Error("NEXT_PUBLIC_ADMIN_EMAIL must be defined in environment variables");
}

export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAdmin(user?.email === ADMIN_EMAIL);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { isAdmin, loading };
}; 