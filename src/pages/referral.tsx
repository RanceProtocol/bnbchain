import type { NextPage } from "next";
import dynamic from "next/dynamic";
import NoSSRWrapper from "../Components/NoSSRWrapper";

const ReferralView = dynamic(() => import("../view/referral"), {
    ssr: false,
});

const Referral: NextPage = () => {
    return (
        <NoSSRWrapper>
            <ReferralView />
        </NoSSRWrapper>
    );
};

export default Referral;
