// page after date or hygienist selection box change
export const mainPageAfterChange = async (req, res) => {

    const id = req.body.hygienist_id;
    const apptDate = req.body.appointment_date;

    res.redirect( "/appointments/hygienist/" + id + "/" + apptDate );
  
};