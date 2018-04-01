import * as Types from '@/actions/types/babygit'

const initialState = {
    apiKey: "rjdjna88Haasd2340UjdEasjdl00999231dUjJJJdad",
    projects: {
        'lfu': {
            name: 'LawFormsUSA',
            environments: {
                "dev": {
                    name: "Dev",
                    url: 'http://35.166.185.17:807/',
                    branch: ''
                },
                "staging": {
                    name: 'Staging',
                    url: 'http://52.41.155.173:807/',
                    branch: ''
                },
                "test": {
                    name: 'Test',
                    url: 'http://35.160.50.252:807/',
                    branch: ''
                }
            }
        },
        'pdfrun': {
            name: 'PDFRun',
            environments: {
                "dev": {
                    name: "Dev",
                    url: 'http://35.166.185.17:807/',
                    branch: ''
                },
                "staging": {
                    name: 'Staging',
                    url: 'http://52.41.155.173:807/',
                    branch: ''
                },
                "test": {
                    name: 'Test',
                    url: 'http://35.160.50.252:807/',
                    branch: ''
                }
            }
        },
        'passportusa': {
            name: 'PassportUSA',
            environments: {
                "dev": {
                    name: "Dev",
                    url: 'http://35.166.185.17:807/',
                    branch: ''
                },
                "staging": {
                    name: 'Staging',
                    url: 'http://52.41.155.173:807/',
                    branch: ''
                },
                "test": {
                    name: 'Test',
                    url: 'http://35.160.50.252:807/',
                    branch: ''
                }
            }
        },
        'pdfformpro': {
            name: 'PDFFormPro',
            environments: {
                "dev": {
                    name: "Dev",
                    url: 'http://35.166.185.17:807/',
                    branch: ''
                },
                "staging": {
                    name: 'Staging',
                    url: 'http://52.41.155.173:807/',
                    branch: ''
                },
                "test": {
                    name: 'Test',
                    url: 'http://35.160.50.252:807/',
                    branch: ''
                }
            }
        },
        'oill': {
            name: 'Oill.io',
            environments: {
                "dev": {
                    name: "Dev",
                    url: 'http://35.166.185.17:807/',
                    branch: ''
                },
                "staging": {
                    name: 'Staging',
                    url: 'http://52.41.155.173:807/',
                    branch: ''
                },
                "test": {
                    name: 'Test',
                    url: 'http://35.160.50.252:807/',
                    branch: ''
                }
            }
        },
        'webforms': {
            name: 'WebForms',
            environments: {
                "dev": {
                    name: "Dev",
                    url: 'http://35.166.185.17:807/',
                    branch: ''
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