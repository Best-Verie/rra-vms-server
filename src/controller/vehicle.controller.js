const { Vehicle, validateData, generateRandomPlateNumber } = require("./../model/vehicle.model");

exports.registerVehicle = async (req, res) => {
    try {
        const { error } = validateData(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const plateNo = generateRandomPlateNumber();
        if(req.body.ownerShip === "NEW"){
        let vehicle = new Vehicle({
            chasisNumber: req.body.chasisNumber,
            manufastureCompany: req.body.manufastureCompany,
            manufactureYear: req.body.manufactureYear,
            price: req.body.price,
            plateNumber: plateNo,
            modelName: req.body.modelName,
            ownerShip: req.body.ownerShip,
            // owner: req.body.owner,
        });
       } else {
        let vehicle = new Vehicle({
            chasisNumber: req.body.chasisNumber,
            manufastureCompany: req.body.manufastureCompany,
            manufactureYear: req.body.manufactureYear,
            price: req.body.price,
            plateNumber: req.body.plateNumber,
            modelName: req.body.modelName,
            ownerShip: req.body.ownerShip,
        });
       }
    
        const vehicleFound = await Vehicle.findOne({ plateNumber: req.body.plateNumber });
        if (vehicleFound) return res.status(400).send("Vehicle already exists");
        vehicle = await vehicle.save();
        res.status(201).send(vehicle);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

exports.getVehicleByPlateNumber = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ plateNumber: req.params.plateNumber });
        if (!vehicle) return res.status(400).send("Vehicle not found");
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}
