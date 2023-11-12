// routes/equipmentRoutes.js
const express = require('express');
const router = express.Router();
const equipmentController = require('../controller/Equipment.Controller');

// Routes สำหรับ CRUD อุปกรณ์
router.post('/', equipmentController.createEquipment);
router.get('/', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.put('/:id', equipmentController.updateEquipmentById);
router.delete('/:id', equipmentController.deleteEquipmentById);

module.exports = router;
// INSERT INTO "equipment" ("id", "name", "status", "description", "quantity", "createdat", "updatedat")
// VALUES ('1', 'item1', 'ใช้งานได้', 'asd', '23', now(), now());
