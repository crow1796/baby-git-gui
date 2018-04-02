import * as Types from '@/actions/types/babygit'

const initialState = {
    apiKey: "rjdjna88Haasd2340UjdEasjdl00999231dUjJJJdad",
    projects: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ALL_PROJECTS:
            return Object.assign(state, action.payload)
        default:
            return state
    }
}

export default reducer