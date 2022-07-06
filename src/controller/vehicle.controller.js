const { Vehicle, validateData, generateRandomPlateNumber } = require("./../model/vehicle.model");

exports.registerVehicle = async (req, res) => {
    try {
        const { error } = validateData(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const vehicleFound = await Vehicle.findOne({ plateNumber: req.body.chasisNumber });
         let vehicle;
         console.log(vehicleFound);

        if (vehicleFound){
           vehicle = new Vehicle({
            chasisNumber: req.body.chasisNumber,
            manufastureCompany: req.body.manufastureCompany,
            manufactureYear: req.body.manufactureYear,
            price: req.body.price,
            plateNumber: req.body.plateNumber,
            modelName: req.body.modelName,
            ownerShip: req.body.ownerShip,
        });
        }
        else{
        const plateNo = generateRandomPlateNumber();
        vehicle = new Vehicle({
            chasisNumber: req.body.chasisNumber,
            manufastureCompany: req.body.manufastureCompany,
            manufactureYear: req.body.manufactureYear,
            price: req.body.price,
            plateNumber: plateNo,
            modelName: req.body.modelName,
        });
    }
       
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

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).send(vehicles);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}