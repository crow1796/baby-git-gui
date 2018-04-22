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
    let ref = firebase.database().ref(`projects/${project}/environments/${env}`)
                    .update(
                        { 
                            is_locked: newVal,
                            user: newVal ? localStorage.getItem('bbggui_name') : ''
                        })
    return {
        type: Types.LOCK_ENV,
        payload: ref
    }
}

export function setProjects(projects){
    return {
        type: Types.SET_PROJECTS,
        payload: projects
    }
}

export function addToQueueOf(project, env) {
    let ref = firebase.database().ref(`env_users/${project}/environments/${env}`)
        .push(localStorage.getItem('bbggui_name'))
    return {
        type: Types.ADD_TO_QUEUE_OF,
        payload: ref
    }
}

export function removeQueuedUserFrom(userKey, projectKey, envKey){
    let ref = firebase.database().ref(`env_users/${projectKey}/environments/${envKey}/${userKey}`).remove()
    
    return {
        type: Types.REMOVE_QUEUED_USER_FROM,
        payload: ref
    }
}

export function passToUser(user, userKey, projectKey, envKey){
    let ref = firebase.database().ref(`projects/${projectKey}/environments/${envKey}`)
        .update(
            {
                is_locked: true,
                user: user
            })
    firebase.database().ref(`env_users/${projectKey}/environments/${envKey}/${userKey}`).remove()
    return {
        type: Types.PASS_TO_USER,
        payload: ref
    }
}