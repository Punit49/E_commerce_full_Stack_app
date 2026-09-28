import { useState } from 'react';
import { createContext } from 'react'

export const MyStore = createContext();

const AppContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [accessToken, setAccessToken] = useState(null);

    const value = {
        user, setUser, products, setProducts, accessToken, setAccessToken
    }

    return (
        <MyStore.Provider value={value}>
            {children}
        </MyStore.Provider>
    )
}

export default AppContext