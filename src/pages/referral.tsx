import type { NextPage } from "next";
import dynamic from "next/dynamic";

const ReferralView = dynamic(() => import("../view/referral"), {
    ssr: false,
});

const Referral: NextPage = () => {
    return <ReferralView />;
};

export default Referral;
