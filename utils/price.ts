import axios from "axios";
import { getCurrentTimestamp, getDateFromTimstamp } from "./time";

export const getPriceChangeSinceInsured = async (
    coin_id: string,
    insuredStartTimestamp: number,
): Promise<string> => {
    const currentTimestamp = await getCurrentTimestamp()
    if(!currentTimestamp) return "0%"
    const currentDate = getDateFromTimstamp(currentTimestamp)
    const insuredDate = getDateFromTimstamp(insuredStartTimestamp)
    const res = await Promise.all([
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin_id}/history?date=${insuredDate}&localization=false`
        ),
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin_id}/history?date=${currentDate}&localization=false`
        ),
    ]);
    if (
        !res[0].data?.market_data?.current_price?.usd ||
        !res[1].data?.market_data?.current_price?.usd
    )
        return "0%";
    const difference =
        res[1].data.market_data.current_price.usd -
        res[0].data.market_data.current_price.usd;
    const percentageChange =
        (difference / res[0].data.market_data.current_price.usd) * 100;
        
    return Math.max(0, percentageChange) === 0 ? `${percentageChange.toFixed(2)}%` : `+${percentageChange.toFixed(2)}%`;
};


export const getCoinChartData = async (coin_id: string, insured_timestamp: number):Promise<number[]> => {
    const currentTimestamp = await getCurrentTimestamp()
    if(!currentTimestamp) return []
    const timestampDifference = currentTimestamp - insured_timestamp
    const daysPast = Math.floor(timestampDifference / 86400)
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=usd&days=${Math.max(1, daysPast)}`)
    if(response.status !== 200) return []
    const parsedData = response.data.prices.map((priceArr:number[]) => priceArr[1])
    return parsedData
}
