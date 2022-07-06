const { Owner, validateData } = require("./../model/car-owner.model");
exports.registerCarOwner = async (req, res) => {
    try {
        const { error } = validateData(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        let owner = new Owner({
        names: req.body.names,
        phone: req.body.phone,
        nationalId: req.body.nationalId,
        address: req.body.address,
        });
    
        const ownerFound = await Owner.findOne({ nationalId: req.body.nationalId });
        if (ownerFound) return res.status(400).send("Owner already exists");
        owner = await owner.save();
        res.status(201).send(owner);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

exports.getAllCarOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).send(owners);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

exports.getOwnerByNationalId = async (req, res) => {
    try {
        const owner = await Owner.findOne({ nationalId: req.params.nationalId });
        if (!owner) return res.status(400).send("Owner not found");
        res.status(200).send(owner);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}