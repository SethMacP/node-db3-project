const model = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = () => async (req, res, next) => {
	try{
		const verifiedID = await model.findById(req.params.scheme_id)
		// console.log(verifiedID)
		if(verifiedID < 1){
			return 	res.status(404).json({message:"Id not found"})
		}else{
			next();
		}
	}catch(err){
		next(err);
	}
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = () => async (req, res, next) => {

	
	if(!req.body.scheme_name || req.body.scheme_name.length == 0 || typeof req.body.scheme_name !== 'string'){
    	return res.status(400).json({message:"Invalid scheme_name"})
  	}
	
	next();
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = () => async(req, res, next) => {
	let sn = req.body.step_number;
	let instr = req.body.instructions
	if(!instr || typeof instr !== 'string'){
		return res.status(400).json({message:"Invalid Step."})
	}
	console.log('typeof: ',typeof sn)
	console.log('length', sn.length)
	if(typeof sn != 'number'|| sn < 1){
		return  res.status(400).json({message:"Invalid Step!"})
	}
	next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
