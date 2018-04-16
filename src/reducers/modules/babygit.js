import * as Types from '@/actions/types/babygit'

const initialState = {
    apiKey: "rjdjna88Haasd2340UjdEasjdl00999231dUjJJJdad",
    projects: {},
    envUsers: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
            break;
        default:
            return state
    }
}

export default reducer