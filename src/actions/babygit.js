import * as Types from '@/actions/types/babygit'

export const getAllProjects = (name) => {
    return {
        type: Types.ALL_PROJECTS,
        payload: name
    }
}