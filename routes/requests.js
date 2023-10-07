const express = require('express');
const router = express.Router();
const requests = require('../controllers/requests');
const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(requests.getAllRequests));

router.post('/', catchAsync(requests.addNewRequest));

router.get('/:id', catchAsync(requests.getRequest));

router.put('/:id', catchAsync(requests.editRequest));

router.delete('/:id', catchAsync(requests.deleteRequest));

module.exports = router;