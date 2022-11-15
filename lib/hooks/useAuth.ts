import {User} from "@prisma/client";
import {useCallback, useEffect, useMemo, useState} from "react";
import useLocalStorageState from "use-local-storage-state";

async function getUserByAuthToken(authToken){
    let user = null;
    const req = await fetch(`/api/get_user?auth_token=${authToken}`);
    const response = await req.json();

    if (response.error !== undefined){
        return null;
    }
    user = response.user;
    return user;
}

export function useAuth(){
    const [authToken, setAuthToken] = useLocalStorageState("authToken", {defaultValue: ""});
    const [user, setUser] = useState<User | null>(null);
    const isSigned = useMemo<boolean>(() => user !== null, [user]);
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

    const updateUser = useCallback(async () => {
        if (authToken === ""){
            await setUser(null);
            return;
        }
        const newUser: User = await getUserByAuthToken(authToken);
        setUser(newUser);
    }, [setUser, authToken]);

    useEffect(() => {
        updateUser().then(() => setUserLoaded(true));
    }, [authToken, updateUser, setUserLoaded]);

    const onLogout = useCallback(() => {
        setAuthToken("");
    }, [setAuthToken]);

    const onLogin = useCallback(async (email, password) => {
        const req = await fetch(`/api/login_user?email=${email}&password=${password}`);
        const response = await req.json();
        if (response.error !== undefined){
            return;
        }
        const newAuthToken = response.authToken;
        setAuthToken(newAuthToken);
    }, [setAuthToken]);

    const onSignup = useCallback(async (firstName, secondName, email, password) => {
        const req = await fetch(`/api/register_user?first_name=${firstName}&second_name=${secondName}&email=${email}&password=${password}`);
        const response = await req.json();

        if (response.error !== undefined) {
            return;
        }
        const newAuthToken = response.authToken;
        setAuthToken(newAuthToken);
    }, [setAuthToken]);


    return {
        onLogin,
        onSignup,
        onLogout,
        updateUser,
        isSigned,
        isUserLoaded,
        authToken,
        user
    }
}