const mongoose = require('mongoose')

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  // A tenant can be renting out only one apartment (for now)
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }
})

tenantSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant