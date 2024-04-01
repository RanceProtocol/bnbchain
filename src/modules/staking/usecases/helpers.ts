import { BigNumber } from "ethers";
import {
    masterRanceWallet,
    stakingAddressToPool,
    tokens,
} from "../../../constants/addresses";
import { Erc20__factory, Staking1, Staking2 } from "../../../typechain";
import { structOutputToObject } from "../../../utils/helpers";
import { getRANCEPrice } from "../../../utils/price";
import { IStakingPool } from "../domain/entities";

export const getstakingContract1Pool = async (
    contract: Staking1
): Promise<IStakingPool> => {
    const contractAddress = contract.address;
    const totalAllocPoint = Number(await contract.totalAllocPoint());

    const rancePrice = await getRANCEPrice(contract.provider);

    const poolInfo = structOutputToObject(
        await contract.poolInfo(stakingAddressToPool[contract.address])
    );

    const stakeToken = Erc20__factory.connect(
        poolInfo.lpToken,
        contract.provider
    );

    const stakeTokenDecimals = await stakeToken.decimals();
    const totalStaked = await stakeToken.balanceOf(contract.address);
    const rewardToken = Erc20__factory.connect(
        tokens[process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens]
            .RANCE,
        contract.provider
    );
    const rewardTokenDecimals = await rewardToken.decimals();
    const rancePerBlock = (await contract.RANCEPerBlock()).mul(
        await contract.BONUS_MULTIPLIER()
    );
    const totalRANCEPerYr = rancePerBlock.mul(17280).mul(365);
    const poolRANCEPerYr = (poolInfo.allocPoint as BigNumber).mul(
        totalRANCEPerYr
    );
    const numerator = poolRANCEPerYr.mul(100);
    const denominator = totalStaked.mul(totalAllocPoint);
    const apr = denominator.eq(0)
        ? BigNumber.from(0)
        : numerator.div(denominator);

    const potentialEarnings = await rewardToken.balanceOf(
        masterRanceWallet[
            process.env
                .NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof masterRanceWallet
        ]
    );

    const pool: IStakingPool = {
        id: stakingAddressToPool[contract.address],
        contractAddress,
        stakeTokenSymbol: "RANCE",
        stakeTokenAddress: poolInfo.lpToken,
        rewardTokenAddress:
            tokens[
                process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens
            ].RANCE,
        rewardTokenSymbol: "RANCE",
        apr,
        totalStaked,
        potentialEarnings,
        stakeTokenDecimals,
        rewardTokenDecimals,
        stakeTokenPrice: rancePrice,
        rewardTokenPrice: rancePrice,
    };

    return pool;
};

export const getstakingContract2Pool = async (
    contract: Staking2
): Promise<IStakingPool> => {
    const contractAddress = contract.address;
    const totalAllocPoint = Number(await contract.totalAllocPoint());
    const rancePrice = await getRANCEPrice(contract.provider);
    const poolInfo = structOutputToObject(
        await contract.poolInfo(stakingAddressToPool[contract.address])
    );
    const stakeToken = Erc20__factory.connect(
        poolInfo.lpToken,
        contract.provider
    );
    const stakeTokenDecimals = await stakeToken.decimals();
    const totalStaked = await stakeToken.balanceOf(contract.address);
    const rewardToken = Erc20__factory.connect(
        tokens[process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens]
            .USDT,
        contract.provider
    );
    const rewardTokenDecimals = await rewardToken.decimals();
    const usdtPerBlock = (await contract.USDTPerBlock()).mul(
        await contract.BONUS_MULTIPLIER()
    );
    const totalUSDTPerYr = usdtPerBlock.mul(28800).mul(365);
    const poolUSDTPerYr = (poolInfo.allocPoint as BigNumber).mul(
        totalUSDTPerYr
    );
    const numerator = poolUSDTPerYr.mul(100);
    const denominator = totalStaked.mul(totalAllocPoint);

    const apr = denominator.eq(0)
        ? BigNumber.from(0)
        : numerator.div(denominator);

    const potentialEarnings = await rewardToken.balanceOf(
        masterRanceWallet[
            process.env
                .NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof masterRanceWallet
        ]
    );

    const pool: IStakingPool = {
        id: stakingAddressToPool[contract.address],
        contractAddress,
        stakeTokenSymbol: "RANCE",
        stakeTokenAddress: poolInfo.lpToken,
        rewardTokenAddress:
            tokens[
                process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens
            ].USDT,
        rewardTokenSymbol: "USDT",
        apr,
        totalStaked,
        potentialEarnings,
        stakeTokenDecimals,
        rewardTokenDecimals,
        stakeTokenPrice: rancePrice,
        rewardTokenPrice: 1,
    };

    return pool;
};

export const getStakingContract1UserEarnings = async (
    contract: Staking1,
    userAddress: string
): Promise<{ userStaked: BigNumber; userEarned: BigNumber }> => {
    const userStaked = (
        await contract.userInfo(
            stakingAddressToPool[contract.address],
            userAddress
        )
    ).amount;
    const userEarned = await contract.pendingRANCE(
        stakingAddressToPool[contract.address],
        userAddress
    );

    return { userStaked, userEarned };
};

export const getStakingContract2UserEarnings = async (
    contract: Staking2,
    userAddress: string
): Promise<{ userStaked: BigNumber; userEarned: BigNumber }> => {
    const userStaked = (
        await contract.userInfo(
            stakingAddressToPool[contract.address],
            userAddress
        )
    ).amount;
    const userEarned = await contract.pendingUSDT(
        stakingAddressToPool[contract.address],
        userAddress
    );

    return { userStaked, userEarned };
};
