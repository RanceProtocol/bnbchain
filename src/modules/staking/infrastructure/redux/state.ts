import { useSelector } from "react-redux";
import { IAppState } from "../../../../appState";
import { IStakingStore } from "../../domain/stakingStore";

export const stakingState = (): IStakingStore => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSelector((state: IAppState) => state.staking);
};
