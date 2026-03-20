
//  -- GET INDIVIDUAL/ALL -- 

class Controller{

    constructor(){}

    recibirArchivo = async (req,res) => {
        res.json({status: req.file})
    }

    
}
export default Controller;