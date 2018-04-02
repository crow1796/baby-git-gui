import reducers from '@/reducers'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

export default createStoreWithMiddleware(reducers)