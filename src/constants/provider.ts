import { providers } from "ethers";
import { RPC_LIST_MAP } from "./rpcUrls";

export class RetriableStaticJsonRpcProvider extends providers.StaticJsonRpcProvider {
    providerList: providers.StaticJsonRpcProvider[];
    currentIndex = 0;
    error: any;

    constructor(rpcs: string[], chainId: number) {
        super({ url: rpcs[0] }, chainId);

        this.providerList = rpcs.map(
            (url) => new providers.StaticJsonRpcProvider({ url }, chainId)
        );
    }

    async send(
        method: string,
        params: Array<any>,
        retries?: number
    ): Promise<any> {
        let _retries = retries || 0;

        /**
         * validate retries before continue
         * base case of recursivity (throw if already try all rpcs)
         */
        this.validateRetries(_retries);

        try {
            // select properly provider
            const provider = this.selectProvider();

            // send rpc call
            const result = await provider.send(method, params);

            return result;
        } catch (error) {
            // store error internally
            this.error = error;

            // increase retries
            _retries = _retries + 1;

            console.debug(
                "provider " +
                    this.providerList[this.currentIndex].connection.url +
                    " Failed. Trying the next provider"
            );

            return this.send(method, params, _retries);
        }
    }

    private selectProvider() {
        // last rpc from the list
        if (this.currentIndex === this.providerList.length) {
            // set currentIndex to the seconds element
            this.currentIndex = 1;
            return this.providerList[0];
        }

        // select current provider
        const provider = this.providerList[this.currentIndex];
        // increase counter
        this.currentIndex = this.currentIndex + 1;

        return provider;
    }

    /**
     * validate that retries is equal to the length of rpc
     * to ensure rpc are called at least one time
     *
     * if that's the case, and we fail in all the calls
     * then throw the internal saved error
     */
    private validateRetries(retries: number) {
        if (retries === this.providerList.length) {
            const error = this.error;
            this.error = undefined;
            throw new Error(error);
        }
    }
}

export const getRetriableStaticJsonRpcProvider = (
    rpcs: string[],
    chainId: number
) => new RetriableStaticJsonRpcProvider(rpcs, chainId);

export const retriableStaticJsonRpcProvider = getRetriableStaticJsonRpcProvider(
    RPC_LIST_MAP[56],
    56
);
