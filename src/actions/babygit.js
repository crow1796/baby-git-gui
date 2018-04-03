import * as Types from '@/actions/types/babygit'

export function getAllProjects(name){
    let ref = firebase.database().ref()
    return {
        type: Types.ALL_PROJECTS,
        payload: (new Promise((resolve, reject) => {
            ref.on("value", (snapshot) => {
                resolve(snapshot.val())
            }, (error) => {
                reject("Error: " + error.code)
            })
        }))
    }
}

export function updateBranch(project, env, branch){
    let ref = firebase.database().ref(`projects/${project}/environments/${env}`).update({ branch })
    return {
        type: Types.UPDATE_BRANCH,
        payload: ref
    }
}

export function lockEnvOf(project, env, newVal){
    let ref = firebase.database().ref(`projects/${project}/environments/${env}`).update({ is_locked: newVal })
    return {
        type: Types.LOCK_ENV,
        payload: ref
    }
}