import findOrCreate from 'mongoose-findorcreate'
import config from '../../src/config'

const cleanOutput = (doc, ret) => {
  /* eslint-disable */
  ret.id = ret._id
  delete ret.__v
  delete ret._id
  /* eslint-enable */
}

export default schema => {
  schema.plugin(findOrCreate)

  schema.options.autoIndex = config.debug
  if (!schema.options.toObject) {
    schema.options.toObject = {}
  }
  schema.options.toObject.transform = cleanOutput
  if (!schema.options.toJSON) {
    schema.options.toJSON = JSON.stringify
  }
  schema.options.toJSON.transform = cleanOutput
}
