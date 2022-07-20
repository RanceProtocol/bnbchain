import { stakingAddressToPool } from "../../../constants/addresses";
import { Staking1, Staking2 } from "../../../typechain";

export const getPoolsUserData = async (
    contract1: Staking1,
    contract2: Staking2,
    userAddress: string
): Promise<any[]> => {

    const Pool1userStaked = (
        await contract1.userInfo(
            stakingAddressToPool[contract1.address],
            userAddress
        )
    ).amount;

    const pool1PendingReward = await contract1.pendingRANCE(
        stakingAddressToPool[contract1.address],
        userAddress
    );

    const Pool2userStaked = (
        await contract2.userInfo(
            stakingAddressToPool[contract2.address],
            userAddress
        )
    ).amount;

    const pool2PendingReward = await contract2.pendingMUSD(
        stakingAddressToPool[contract2.address],
        userAddress
    );

    const poolsUserData = [
        {
            userStaked: Pool1userStaked,
            userEarned: pool1PendingReward,
        },
        {
            userStaked: Pool2userStaked,
            userEarned: pool2PendingReward,
        },
    ];

    return poolsUserData;
};
