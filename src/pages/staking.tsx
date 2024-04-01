import type { NextPage } from "next";
import dynamic from "next/dynamic";
import NoSSRWrapper from "../Components/NoSSRWrapper";

const StakingView = dynamic(() => import("../view/staking"), {
    ssr: false,
});

const Staking: NextPage = () => {
    return (
        <NoSSRWrapper>
            <StakingView />
        </NoSSRWrapper>
    );
};

export default Staking;
