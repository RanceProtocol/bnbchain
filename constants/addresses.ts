export const ranceProtocol = {
    staging: "0xb0747FA282884C281fE48cbe1A7CD459c10947F3",
    mainnet: ""
}

export const tokens = {
    RANCE: "0xDFe999B28A48BFb5DD674D3899B77fd4fF5CF46c",
    BTC: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
    ETH: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
    CRO: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    MMF: "0x97749c9B61F878a880DfE312d2594AE07AEd7656",
    MUSD: "0x95aEaF383E2e86A47c11CffdE1F7944eCB2C38C2",
    USCD: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59"
}


export const tokenAddressToName = Object.fromEntries(Object.entries(tokens).map((entries: string[]) => [entries[1], entries[0]]))