// controllers/equipmentController.js
const Equipment = require("../model/Equipment.model");

// สร้างอุปกรณ์
exports.createEquipment = async (req, res) => {
  try {
    const { name, status, description, quantity } = req.body;
    // console.log( req.body);
    const newEquipment = await Equipment.create({
      name: name,
      status: status,
      description: description,
      quantity: quantity,
      
    });

    return res
      .status(201)
      .json({
        message: "Equipment created successfully",
        equipment: newEquipment,
      });
  } catch (error) {
    console.error("Error creating equipment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ดึงข้อมูลทั้งหมดของอุปกรณ์
exports.getAllEquipment = async (req, res) => {
  try {
    const allEquipment = await Equipment.findAll();
    return res.status(200).json(allEquipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ดึงข้อมูลอุปกรณ์ตาม ID
exports.getEquipmentById = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const equipment = await Equipment.findByPk(equipmentId);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    return res.status(200).json(equipment);
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// อัปเดตข้อมูลอุปกรณ์ตาม ID
exports.updateEquipmentById = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const { name, status, description, quantity } = req.body;

    const equipment = await Equipment.findByPk(equipmentId);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    // อัปเดตข้อมูล
    equipment.Name = name;
    equipment.Status = status;
    equipment.Description = description;
    equipment.Quantity = quantity;

    await equipment.save();

    return res
      .status(200)
      .json({ message: "Equipment updated successfully", equipment });
  } catch (error) {
    console.error("Error updating equipment by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ลบอุปกรณ์ตาม ID
exports.deleteEquipmentById = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const equipment = await Equipment.findByPk(equipmentId);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    await equipment.destroy();

    return res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    console.error("Error deleting equipment by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
