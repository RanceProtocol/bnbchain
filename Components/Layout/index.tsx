import { FC, ReactNode } from "react";
import AppProvider from "../../AppProvider";
import Header from "../Header";

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <AppProvider>
            <div className="container mx-auto py-4 px-2 sm:px-0">
                <Header />
                {children}
            </div>
        </AppProvider>
    );
};

export default Layout;
