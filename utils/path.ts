import { PancakeswapPair } from "simple-pancakeswap-sdk-with-multicall-fix";
import { constants } from "ethers";

interface Params {
    fromTokenContractAddress: string;
    toTokenContractAddress: string;
    amount: string;
}

export const findBestRoute = async (params: Params): Promise<string[]> => {
    const { fromTokenContractAddress, toTokenContractAddress, amount } = params;
    const pancakeswapPair = new PancakeswapPair({
        fromTokenContractAddress,
        toTokenContractAddress,
        ethereumAddress: constants.AddressZero,
    });

    try {
        const pancakeswapPairFactory = await pancakeswapPair.createFactory();
        const result = await pancakeswapPairFactory.findBestRoute(amount);
        return result.bestRouteQuote.routePathArray;
    } catch (error) {
        throw error;
    }
};
