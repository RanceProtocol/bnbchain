import { Web3ReactProvider } from "@web3-react/core";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../appState";
import { getLibrary } from "../wallet/utils";
import { PlenaProvider } from "./PlenaProvider";

interface Props {
    children: ReactNode;
}

const AppProviders: FC<Props> = ({ children }) => {
    return (
        <Provider store={store}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <PlenaProvider>{children}</PlenaProvider>
            </Web3ReactProvider>
        </Provider>
    );
};

export default AppProviders;
