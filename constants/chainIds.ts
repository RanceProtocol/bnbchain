export const supportedChainIds = {
    Mainnet: 56,
    Testnet: 97,
};
export const getSupportedChainsName = (chainId: number): string => {
    switch (chainId) {
        case 56:
            return "Binance Smart Chain Mainnet";
        case 97:
            return "Binance Smart Chain Testnet";
        default:
            return "Binance Smart Chain Mainnet";
    }
};
