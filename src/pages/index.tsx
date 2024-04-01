import type { NextPage } from "next";
import Insurance from "./insurance";
import NoSSRWrapper from "../Components/NoSSRWrapper";

const Home: NextPage = () => {
    return (
        <NoSSRWrapper>
            <Insurance />
        </NoSSRWrapper>
    );
};

export default Home;
