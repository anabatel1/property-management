const listingsRouter = require('express').Router()
const Listing = require('../models/listing')

listingsRouter.get('/', async (_request, response) => {
  const listing = await Listing.find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(listing)
})

listingsRouter.get('/:id', async (request, response) => {
  let listing = null

  if (request.query?.details?.includes('tenant')) {
    listing = await Listing.findById(request.params.id)
      .populate('user', {  username: 1, name: 1, id: 1 })
      .populate('tenant')
  } else {
    listing = await Listing.findById(request.params.id)
      .populate('user', {  username: 1, name: 1, id: 1 })
  }

  if (listing) {
    response.json(listing)
  } else {
    response.status(404).end()
  }
})

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

listingsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.type || !body.address || !body.type.trim() || !body.address.trim()) {
    return response.status(400).json({ error: 'Some listing data is missing' })
  }

  const user = request.user

  const listing = new Listing({
    title: body.title,
    addressId: body.addressId,
    size: body.size,
    rooms: body.rooms,
    utilities: body.utilities,
    date_created: body.date_created || new Date(),
    type: body.type,
    metadata: body.metadata,
    addressDetails: {
      door: body.addressDetails?.door,
      floor: body.addressDetails?.floor,
      houseNumber: body.addressDetails?.houseNumber,
      postalCode: body.addressDetails?.postalCode,
      postalCodeName: body.addressDetails?.postalCodeName,
      streetName: body.addressDetails?.streetName,
    },
    user: user?._id?.toString()
  })

  const savedListing = await listing.save()

  // A user can have multiple listing posts. Use concat to add IDs (one-to-many)
  if (user) {
    if (user.listings) {
      user.listings = user.listings.concat(savedListing._id)
    } else {
      user.listings = savedListing._id
    }

    await user.save()
  }

  const newlyAddedListing = await Listing.findById(savedListing.id).populate('user', {  username: 1, name: 1, id: 1 })
  response.json(newlyAddedListing)
})

listingsRouter.delete('/:id', async (request, response) => {
  const listing = await Listing.findById(request.params.id).populate('user', {  username: 1, name: 1, id: 1 })

  if (listing?.user?.id?.toString() === request?.user?.id.toString()) {
    await Listing.findByIdAndRemove(request.params.id)
    response.status(204).end()

    return
  }

  response.status(400).json({ error: 'Can\'t delete listing post with this id' })
})

listingsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const listing = {
    title: body.title,
    addressId: body.addressId,
    size: body.size,
    rooms: body.rooms,
    utilities: body.utilities,
    date_created: body.date_created || new Date(),
    type: body.type,
    metadata: body.metadata,
    addressDetails: {
      door: body.addressDetails?.door,
      floor: body.addressDetails?.floor,
      houseNumber: body.addressDetails?.houseNumber,
      postalCode: body.addressDetails?.postalCode,
      postalCodeName: body.addressDetails?.postalCodeName,
      streetName: body.addressDetails?.streetName,
    },
  }

  const updatedListing = await Listing.findByIdAndUpdate(request.params.id, listing, { new: true }).populate('user')
  response.json(updatedListing)
})

module.exports = listingsRouter