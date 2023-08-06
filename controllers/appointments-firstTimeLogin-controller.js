// default page for first login
export const firstTimeLogin = async (req, res) => {

  const hygienistLogin = req.session.passport.user;
  const currentDate = (JSON.stringify(new Date())).slice(1,11)

  res.redirect( "/appointments/hygienist/" + hygienistLogin + "/" + currentDate );

};