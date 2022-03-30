const reservation = require('../model/Reservation')

exports.postReservation = async (req, res) => {
    const { member_id } = req.body;
    const { passenger } = req.body;
    const { date } = req.body;
    const { time } = req.body;
    const { vanline } = req.body;
    const { pickup } = req.body;
    const { destination } = req.body;
    const { status } = req.body;
    const { amount } = req.body;
    const imagePath = 'http://localhost:9999/images/' + req.file.filename; // Note: set path dynamically
    const { price } = req.body;
    const reS = new reservation({
        member_id,
        passenger,
        date,
        time,
        vanline,
        pickup,
        destination,
        status,
        amount,
        imagePath,
        price
    });
    const createdReservation = await reS.save();
    res.status(201).json({
      profile: {
        ...createdReservation._doc,
      },
    });
};