import axios from "axios";

export const getCurrentTimestamp = async (): Promise<number | undefined> => {
    try {
        const res = await axios.get("https://worldtimeapi.org/api/timezone/Africa/Lagos");
        if(res.status !== 200) throw "failed to get current timestamp from world time api"
        return res.data.unixtime
    } catch (error) {
        console.error(error)
    }
}

export const getDateFromTimstamp = (timeStamp:number):string => {
    return new Date(timeStamp * 1000).toLocaleDateString().replaceAll("/", "-")
}

export const getDateStringFromTimstamp = (timeStamp:number):string => {
    const date =  new Date(timeStamp * 1000).toDateString().split(" ")
    return `${date[2]} ${date[1]} ${date[3]}`
}