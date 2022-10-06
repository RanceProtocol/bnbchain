import { PancakeswapPair } from "simple-pancakeswap-sdk-with-multicall-fix";
import { constants } from "ethers";

interface Params {
    fromTokenContractAddress: string;
    toTokenContractAddress: string;
    amount: string;
    provider: any;
}

export const findBestRoute = async (
    params: Params
): Promise<{ path: string[]; expectedOutput: string }> => {
    const {
        fromTokenContractAddress,
        toTokenContractAddress,
        amount,
        provider,
    } = params;

    try {
        const pancakeswapPair = new PancakeswapPair({
            fromTokenContractAddress,
            toTokenContractAddress,
            ethereumAddress: constants.AddressZero,
        });

        const pancakeswapPairFactory = await pancakeswapPair.createFactory();
        const result = await pancakeswapPairFactory.findBestRoute(amount);
        return {
            path: result.bestRouteQuote.routePathArray,
            expectedOutput: result.bestRouteQuote.expectedConvertQuote,
        };
    } catch (error) {
        throw error;
    }
};
