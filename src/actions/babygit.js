import * as Types from '@/actions/types/babygit'

export function updateBranch(project, env, branch){
    let ref = firebase.database().ref(`projects/${project}/environments/${env}`).update({ branch })
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