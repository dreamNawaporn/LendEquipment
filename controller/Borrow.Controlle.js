// controllers/borrowController.js
const User = require('../model/User.model');
const Equipment = require('../model/Equipment.model');
const BorrowModel = require('../model/Borrow.model');

// ฟังก์ชันสำหรับยืมอุปกรณ์
exports.borrowEquipment = async (req, res) => {
  try {
    const { userID, equipmentID } = req.body;

    // ตรวจสอบว่า User และ Equipment มีอยู่ในฐานข้อมูลหรือไม่
    const user = await User.findByPk(userID);
    const equipment = await Equipment.findByPk(equipmentID);

    if (!user || !equipment) {
      return res.status(404).json({ error: 'User or Equipment not found' });
    }

    // สร้างการยืม
    const borrowRecord = await BorrowModel.create({
      BorrowDate: new Date(),
      ReturnDate: null, // ยังไม่คืน
      Status: 'ยืม',
      UserID: userID,
      EquipmentID: equipmentID,
    });

    return res.status(201).json({ message: 'Equipment borrowed successfully', borrowRecord });
  } catch (error) {
    console.error('Error borrowing equipment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ฟังก์ชันสำหรับการคืนอุปกรณ์
exports.returnEquipment = async (req, res) => {
  try {
    const { borrowID } = req.body;

    // ตรวจสอบว่า Borrow มีอยู่ในฐานข้อมูลหรือไม่
    const borrowRecord = await BorrowModel.findByPk(borrowID);

    if (!borrowRecord) {
      return res.status(404).json({ error: 'Borrow record not found' });
    }

    // ตรวจสอบสถานะว่าเป็น 'ยืม' หรือไม่
    if (borrowRecord.Status !== 'ยืม') {
      return res.status(400).json({ error: 'Equipment has already been returned' });
    }

    // อัปเดตข้อมูลเมื่อคืน
    borrowRecord.ReturnDate = new Date();
    borrowRecord.Status = 'คืนแล้ว';
    
    await borrowRecord.save();

    return res.status(200).json({ message: 'Equipment returned successfully', borrowRecord });
  } catch (error) {
    console.error('Error returning equipment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllEquipment = async (req, res) => {
  try {
    
    const allBorrow = await BorrowModel.findAll()
    return res.status(200).json(allBorrow);
  } catch (error) {
    console.error('Error returning equipment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};