"use client"
import { ConfigProvider } from 'antd';
import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isModalVisible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    return (
        <ModalContext.Provider value={{ isModalVisible, showModal, hideModal }}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#173B45',
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};