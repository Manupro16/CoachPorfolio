// components/AuthContext.tsx
'use client';

import React, {createContext, useContext} from 'react';
import {Session} from 'next-auth';

interface AuthContextType {
    session: Session | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
                                 session,
                                 children,
                             }: {
    session: Session | null;
    children: React.ReactNode;
}) => {
    const isAuthenticated = !!session;
    const isAdmin = session?.user?.role === 'ADMIN';

    return (
        <AuthContext.Provider value={{session, isAuthenticated, isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
