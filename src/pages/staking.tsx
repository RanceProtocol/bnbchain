import type { NextPage } from "next";
import dynamic from "next/dynamic";

const StakingView = dynamic(() => import("../view/staking"), {
    ssr: false,
});

const Staking: NextPage = () => {
    return <StakingView />;
};

export default Staking;
