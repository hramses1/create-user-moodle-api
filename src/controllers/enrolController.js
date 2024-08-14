import getenrols from '../services/getEnrolMoodleService'


export default async function enrolUser(req, res) {
  try {

    const result = await getRoles(req)
    result.forEach(result => {
      if (result.shortname === req.body.shortname_rol){
            const roleid = result.id;
        }});

    




  } catch (error) {
    console.error("Error en la operación:", error);
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error en los datos de entrada",
        error: error.message,
      });
    }
  }
}
