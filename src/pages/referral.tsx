import type { NextPage } from "next";
import dynamic from "next/dynamic";

const ReferralView = dynamic(() => import("../views/referral"), {
    ssr: false,
});

const Referral: NextPage = () => {
    return <ReferralView />;
};

export default Referral;
