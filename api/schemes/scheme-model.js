//[x]File complete
const { whereNotExists } = require('../../data/db-config');
const db = require('../../data/db-config')
const find = async() => { // EXERCISE A
	const schemes = await db("schemes as sc")
		.leftJoin("steps as st", "st.scheme_id", "sc.scheme_id" )
		.groupBy('sc.scheme_id')
		.orderBy('sc.scheme_id', 'asc')
		.select("sc.*")
		.count({num_of_steps: 'st.step_id'})

	return schemes;



}
const findById = async(scheme_id) => {
	//grab all the information from the table(s)
	const thisScheme = await db("schemes as sc")
		.leftJoin("steps as st", "st.scheme_id", "sc.scheme_id")
		.where("sc.scheme_id" , scheme_id)
		// console.log("this one", thisScheme);
	//create the object you want to return
	let returnObj = {
		scheme_id: thisScheme[0].scheme_id,
		scheme_name: thisScheme[0].scheme_name,
		steps: []
	}
	//fill in the array with multiple values from the map()
	if(thisScheme[0].step_id){
		returnObj.steps = thisScheme.map(scheme=>{
			return {
				step_id: scheme.step_id,
				step_number: scheme.step_number,
				instructions: scheme.instructions
			}
		})
	}
	//return the newly created object
	return returnObj
}
const findSteps = async(scheme_id)=> { // EXERCISE C
  const schemeSteps = await db("steps as st")
	.innerJoin('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
	.where("st.scheme_id" , scheme_id)
	.select("st.scheme_id","st.step_number", "st.instructions","sc.scheme_name")
	.orderBy("st.step_number")
	console.log(schemeSteps);
	return schemeSteps;
}
const  add = async(scheme)=> { // EXERCISE D
  const newScheme = await db
  .insert({
	scheme_name: scheme.scheme_name
  })
  .into("schemes");
  return newScheme;
}
const addStep = async(scheme_id, step) =>{ // EXERCISE E
 const newStep = await db("steps")
 	.insert({
		 scheme_id: scheme_id,
		 step_number: step.step_number,
		 instructions: step.instructions,
	 })
	 return findById(scheme_id)
}
module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
