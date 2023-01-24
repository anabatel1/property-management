const mongoose = require('mongoose')

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  price: {
    type: Number,
    minLength: 3,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  // A tenant can be renting out multiple apartments
  listing: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }]
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