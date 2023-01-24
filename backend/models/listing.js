const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
  address: String,
  addressId: String,
  metadata: Object,
  rooms: Number,
  size: Number,
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  },
  title: String,
  type: String,
  utilities: Object,
  date_created: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  addressDetails: {
    door: String,
    floor: String,
    houseNumber: String,
    postalCode: String,
    postalCodeName: String,
    streetName: String,
  },
})

listingSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing