import mongoose from 'mongoose'
import config from '../../src/config'

const { uri, db, options } = config.mongo

const connection = mongoose.connect(`${uri}/${db}`, options)

export default connection

export const model = connection.model
