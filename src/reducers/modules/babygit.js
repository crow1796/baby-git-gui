import * as Types from '@/actions/types/babygit'

const initialState = {
    projects: {
        'lfu': {
            name: 'LawFormsUSA',
            environments: {
                "dev": {
                    name: "Dev"
                },
                "staging": {
                    name: 'Staging'
                }
            }
        },
        'pdfrun': {
            name: 'PDFRun',
            environments: {
                "dev": {
                    name: "Dev"
                },
                "staging": {
                    name: 'Staging'
                }
            }
        },
        'passportusa': {
            name: 'PassportUSA',
            environments: {
                "dev": {
                    name: "Dev"
                },
                "staging": {
                    name: 'Staging'
                }
            }
        },
        'pdfformpro': {
            name: 'PDFFormPro',
            environments: {
                "dev": {
                    name: "Dev"
                },
                "staging": {
                    name: 'Staging'
                }
            }
        },
        'oill': {
            name: 'Oill.io',
            environments: {
                "dev": {
                    name: "Dev"
                },
                "staging": {
                    name: 'Staging'
                }
            }
        },
        'webforms': {
            name: 'WebForms',
            environments: {
                "dev": {
                    name: "Dev"
                }
            }
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ALL_PROJECTS:
        default:
            return state
    }
}

export default reducer