import express from 'express'
import auth from '../app/http/middlewares/auth.js'
import TeamController from '../app/http/controllers/team/teamController.js';


const router = express.Router();
//route for create team with user
// router.route("/create-team").post(auth, teamController.createTeam);
router.post('/create-team', auth, TeamController.createTeam)
router.post('/add-team-member', auth, TeamController.addTeamMember)
router.delete('/delete-team-member', auth, TeamController.deleteTeamMember)
router.get('/get-team-by-id', auth, TeamController.getTeamById)
router.get('/my-team', auth, TeamController.myTeam)
router.get('/get-team-members', auth, TeamController.getTeamMembers)
router.get('/get-all-teams', auth, TeamController.allTeams)


//team member apis
// router.route("/add-team-member").post(auth, teamController.createTeamUser);
// router.route("/get-team-member").get(auth, teamController.getTeamMember);
// router.route("/get-all-team-members").get(auth, teamController.getAllTeamMembers);
// //route for delete user from team
// router.route("/delete-team-member").delete(auth, teamController.deleteUserFromTeam);
// //route for get team by id
// router.route("/my-team").get(auth, teamController.myTeam);
// //route for edit team
// router.route("/editTeamById/:teamId").put(teamController.editTeamById);


// //role and persmission crud
// router.route("/add-role").post(auth, teamController.addRole);
// router.route("/get-all-roles").post(auth, teamController.getAllRoles);

export default router;