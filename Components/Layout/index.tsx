import { FC, ReactNode } from "react";
import AppProvider from "../../AppProvider";
import Header from "../Header";

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <AppProvider>
            <div className="">
                <Header />
                {children}
            </div>
        </AppProvider>
    );
};

export default Layout;
