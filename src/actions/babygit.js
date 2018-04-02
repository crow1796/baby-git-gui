import * as Types from '@/actions/types/babygit'

export const getAllProjects = (name) => {
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