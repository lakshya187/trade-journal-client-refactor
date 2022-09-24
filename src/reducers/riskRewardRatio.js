const riskRewardReducer = (state = null , action) => {
    console.log(action)
    
    switch (action.type){
        case 'RISK_REWARD':
            return action.payload;
        default : 
            return state;
    }
}
export default riskRewardReducer
