import { FC, ReactNode } from "react";
import AppProvider from "../../AppProvider";
import Header from "../Header";

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
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
