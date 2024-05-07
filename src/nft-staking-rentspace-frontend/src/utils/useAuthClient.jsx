import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import {createActor} from '../../../declarations/nft-staking-rentspace-backend'

const AuthContext = createContext();

export const useAuthClient = () => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [actors, setActors] = useState(null);
    const canID="ahw5u-keaaa-aaaaa-qaaha-cai"
        
    const clientInfo = async (client) => {
        const isAuthenticated = await client.isAuthenticated();
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        console.log(principal)

        setAuthClient(client);
        setIsAuthenticated(isAuthenticated);
        setIdentity(identity);
        setPrincipal(principal);

        if (isAuthenticated && identity && principal && principal.isAnonymous() === false) {
            let userActor = createActor(canID, { agentOptions: { identity: identity } });

            setActors({
                userActor:userActor,
            })
            
            
        }
    }

    useEffect(() => {
        (async () => {
            const authClient = await AuthClient.create();
            clientInfo(authClient);
        })();
    }, []);

    const login = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (authClient.isAuthenticated() && ((await authClient.getIdentity().getPrincipal().isAnonymous()) === false)) {
                    resolve(clientInfo(authClient));
                } else {
                    await authClient.login({
                        identityProvider: `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
                        onError: (error) => reject((error)),
                        onSuccess: () => resolve(clientInfo(authClient)),
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const logout = async () => {
        await authClient?.logout();
        setIsAuthenticated(false)
        console.log("logging out")
    }

    return {
        login, logout, authClient, isAuthenticated, identity, principal, canID, actors
    };
}

export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);