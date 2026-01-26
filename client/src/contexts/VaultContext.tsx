import React, { createContext, useContext, useState, useEffect } from 'react';

interface SystemMetrics {
    cpu: number;
    memory: number;
    bandwidth: string;
    latency: string;
    uptime: string;
    threatLevel: string;
    shieldStatus: string;
    activeConnections: number;
}

interface RegulatoryResult {
    id: number;
    title: string;
    status: string;
    date: string;
    code: string;
}

interface VaultContextType {
    isSecureMode: boolean;
    setSecureMode: (enabled: boolean) => void;
    metrics: SystemMetrics | null;
    searchRegulatory: (query: string) => Promise<RegulatoryResult[]>;
    toggleSecureMode: () => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSecureMode, setIsSecureMode] = useState(false);
    const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('/api/system/metrics');
            const data = await response.json();
            setMetrics(data);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        }
    };

    useEffect(() => {
        if (isSecureMode) {
            fetchMetrics();
            const interval = setInterval(fetchMetrics, 5000);
            return () => clearInterval(interval);
        }
    }, [isSecureMode]);

    const searchRegulatory = async (query: string): Promise<RegulatoryResult[]> => {
        try {
            const response = await fetch(`/api/intelligence/search?q=${encodeURIComponent(query)}`);
            return await response.json();
        } catch (error) {
            console.error('Search failed:', error);
            return [];
        }
    };

    const toggleSecureMode = () => {
        setIsSecureMode(prev => !prev);
    };

    return (
        <VaultContext.Provider value={{
            isSecureMode,
            setSecureMode: setIsSecureMode,
            metrics,
            searchRegulatory,
            toggleSecureMode
        }}>
            {children}
        </VaultContext.Provider>
    );
};

export const useVault = () => {
    const context = useContext(VaultContext);
    if (context === undefined) {
        throw new Error('useVault must be used within a VaultProvider');
    }
    return context;
};
