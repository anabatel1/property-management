const tenantsRouter = require('express').Router()
const Tenant = require('../models/tenant')
const Listing = require('../models/listing')

tenantsRouter.get('/', async (_request, response) => {
  const listing = await Tenant.find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(listing)
})

tenantsRouter.get('/:id', async (request, response) => {
  const listing = await Tenant.findById(request.params.id).populate('user', {  username: 1, name: 1, id: 1 })

  if (listing) {
    response.json(listing)
  } else {
    response.status(404).end()
  }
})

tenantsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.name || !body.name.trim() ||
    !body.price ||
    !body.startDate || !body.startDate.trim() ||
    !body.endDate || !body.endDate.trim() ||
    !request?.listing?.id
  ) {
    return response.status(400).json({ error: 'Some tenant data or listing id are missing' })
  }

  const listing = request.listing

  const tenant = new Tenant({
    name: body.name,
    price: body.price,
    startDate: body.startDate,
    endDate: body.endDate,
    date_created: body.date_created || new Date(),
    listing: listing?._id?.toString()
  })

  const savedListing = await tenant.save()

  // A listing can have only one tenant (for now)
  if (listing) {
    listing.tenant = savedListing._id

    await tenant.save()
  }

  const newlyAddedTenant = await Listing.findById(savedListing.id)
    .populate('user', {  username: 1, name: 1, id: 1 })
    .populate('tenant')

  response.json(newlyAddedTenant)
})

tenantsRouter.put('/:id', async (request, response) => {
  const body = request.body

  console.log('body', body)

  const tenant = {
    name: body.name,
    price: body.price,
    startDate: body.startDate,
    endDate: body.endDate,
  }

  const updatedListing = await Listing.findByIdAndUpdate(request.params.id, tenant, { new: true }).populate('user')
  console.log('updatedListing', updatedListing)
  response.json(updatedListing)
})

module.exports = tenantsRouter