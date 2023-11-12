
const express = require('express');
const router = express.Router();
const borrowController = require('../controller/Borrow.Controlle');

// Route สำหรับยืมอุปกรณ์
router.post('/', borrowController.borrowEquipment);
router.get('/', borrowController.getAllEquipment);
router.put('/return', borrowController.returnEquipment);

module.exports = router;