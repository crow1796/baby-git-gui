import * as Types from '@/actions/types/babygit'

const initialState = {
    devUrl: "35.166.185.17:807/",
    stagingUrl: "52.41.155.173:807/",
    testUrl: "35.160.50.252:807/",
    apiKey: "rjdjna88Haasd2340UjdEasjdl00999231dUjJJJdad",
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