import mongoose, { model } from '../services/mongoose'
import cleanOutput from '../utils/mongoose-clean-output'
import config from '../../src/config'

const eventSchema = new mongoose.Schema({
  year: {
    type: Number,
    default: 0
  },
  month: {
    type: Number,
    default: 0
  },
  day: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ''
  },
  repeat: {
    type: String, // YEARLY, MONTHLY, ONCE
    default: 'ONCE'
  },
  type: {
    type: String, // HB, EVENT
    default: []
  },
  enabled: {
    type: Boolean,
    default: true
  },
  hash: {
    type: String
  },
  comradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comrade'
  }
}, config.mongo.schemaOptions)

eventSchema.plugin(cleanOutput)

export default model('Event', eventSchema)
