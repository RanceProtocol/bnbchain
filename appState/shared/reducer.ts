import * as actionTypes from "./actionTypes"

const initialState = {
    walletModalOpened: false,
    accountModalOpened: false
}

export const sharedReducer = (state = initialState, action:{type: string, payload?:any}):any => {
    const {type, payload} = action
    switch (type) {
        case actionTypes.TOGGLE_WALLET_MODAL:
            return {...state, walletModalOpened: !state.walletModalOpened}
        case actionTypes.TOGGLE_ACCOUNT_MODAL:
            return {...state, accountModalOpened: !state.accountModalOpened}
        default:
            return state;
    }
}