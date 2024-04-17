export const signWithPlena =
    (
        walletAddress: string,
        chainId: number,
        sendTransaction: (params: any) => any
    ) =>
    async (message: string) => {
        try {
            // eth_sign params
            const msgParams = [message, walletAddress];

            const res = await sendTransaction({
                chain: chainId,
                method: "personal_sign",
                payload: {
                    msgParams,
                },
            });

            if (!res?.success) {
                throw new Error(res?.message);
            }

            return res?.content?.signature;
        } catch (error) {
            throw error;
        }
    };
