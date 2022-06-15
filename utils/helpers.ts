export const isValidAmountValue = (value:string) =>
    /^[0-9]*(?:\.[0-9]*)?$/.test(value);
    
export const isPositiveInt = (value:string) => /^\+?([1-9]\d*)$/.test(value);