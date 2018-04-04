import * as Types from '@/actions/types/babygit'

export function updateBranch(project, env, branch){
    let ref = firebase.database().ref(`projects/${project}/environments/${env}`).update(
        { 
            branch ,
            is_locked: true,
            user: localStorage.getItem('bbggui_name') ? localStorage.getItem('bbggui_name') : ''
        })
    return {
        type: Types.UPDATE_BRANCH,
        payload: ref
    }
}

export function lockEnvOf(project, env, newVal){
    let ref = firebase.database().ref(`projects/${project}/environments/${env}`).update(
        { 
            is_locked: newVal,
            user: newVal ? localStorage.getItem('bbggui_name') : ''
        })
    return {
        type: Types.LOCK_ENV,
        payload: ref
    }
}