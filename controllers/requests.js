const Request = require('../models/Request');

module.exports.getAllRequests = async(req, res) => {
    const requests = await Request.find({});
    return res.status(200).json({requests});
}

module.exports.addNewRequest = async(req, res) => {
    const request = new Request(req.body);
    await request.save();
    return res.status(200).json({message:"successfully added new request"});
}

module.exports.getRequest = async(req, res) => {
    const {id} = req.params;
    const request = await Request.findById(id);
    return res.status(200).json({request});
}

module.exports.editRequest = async(req, res) => {
    const {id} = req.params;
    await Request.findByIdAndUpdate(id);
    return res.status(200).json({message:"successfully edited request"});
}

module.exports.deleteRequest = async(req, res) => {
    const {id} = req.params;
    await Request.findByIdAndDelete(id);
    return res.status(200).json({message:"successfully deleted request"});
}