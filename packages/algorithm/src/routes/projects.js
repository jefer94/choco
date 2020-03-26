import { Project } from "../models/index";

export async function listProjects(req, res) {
  try {
    console.log('log1')
    console.log('log2', await Project.find({}))
    res.json(await Project.find({}))
  }
  catch(e) {
    console.log('log3', e)
    
    res.status = 500
  }
}