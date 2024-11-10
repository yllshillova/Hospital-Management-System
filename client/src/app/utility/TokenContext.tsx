import React, { createContext } from 'react';
import useTokenRefresh from './useTokenRefresh';

interface TokenProviderProps {
    children: React.ReactNode;
}

const TokenContext = createContext(null);

const TokenProvider = ({ children }: TokenProviderProps) => {
    useTokenRefresh(); // This will now run only once per app lifecycle

    return (
        <TokenContext.Provider value={null}>
            {children}
        </TokenContext.Provider>
    );
};

export { TokenProvider, TokenContext };
