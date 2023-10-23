import User from "../../../models/User.js";
import Team from "../../../models/team/team.js";

const TeamController = {

    // for creating basic info
    async createTeam(req, res,) {
        const { name, location,description } = req.body;
        const userId = req.user.id
        // find user
        const user = await User.exists({ _id: userId });
        if (!user) {
            return res.status(404).json({
                error: 'user not found'
            })
        }
        // const TeamExist = await Team.exists({ createdBy: userId })
        // if (TeamExist) {
        //     return res.status(409).json({
        //         status: 409,
        //         message: "You already have a team"
        //     })
        // }
        Team.create({
            name,
            createdBy: userId,
            location,
            description
        }).then((response) => {
            res.status(201).json({
                status: 201,
                data: response
            })
        }).catch((err) => {
            res.status(400).json({
                status: 400,
                error: err
            })
        })
    },
    async addTeamMember(req, res, next) {
        // const userId = req.user.id
        const { memberId, teamId } = req.body;
        console.log("ddddddd", !(memberId && teamId))
        if (!(memberId && teamId)) {
            return res.status(400).json({
                status: 400,
                message: "All fields required"
            })
        }

        try {
            const team = await Team.findOne({ _id: teamId })
            if (!team) {
                return res.status(404).json({
                    status: 404,
                    message: "Team not found"
                })
            }
            const member = await User.exists({ _id: memberId })
            if (!member) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found"
                })
            }
            const memberExist = await Team.exists({ members: memberId });
            if (!memberExist) {
                team.members.unshift(memberId)
                team.save().then((updated) => {
                    return res.status(201).json({
                        status: 201,
                        message: 'Team member added',
                    })
                }).catch((error) => {
                    return res.status(400).json({
                        status: 400,
                        error
                    })
                })
            } else {
                res.status(409).json({
                    status: 409,
                    message: 'Member already exist'
                })
            }
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                success: false,
                error
            })
        }

    },

    async deleteTeamMember(req, res, next) {
        // const userId = req.user.id
        const { memberId, teamId } = req.body;
        if (!(memberId && teamId)) {
            return res.status(400).json({
                status: 400,
                message: "All fields required"
            })
        }
        try {
            const team = await Team.findOne({ _id: teamId })
            if (!team) {
                return res.status(404).json({
                    status: 404,
                    message: "Team not found"
                })
            }
            const member = await User.exists({ _id: memberId })
            if (!member) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found"
                })
            }
            const memberExist = await Team.exists({ members: memberId });
            if (memberExist) {
                const index = team.members.map(member => member.toString()).indexOf(memberId)
                team.members.splice(index, 1)
                team.save().then((updated) => {
                    return res.status(200).json({
                        status: 200,
                        message: 'Team member deleted',
                    })
                }).catch((error) => {
                    return res.status(400).json({
                        status: 400,
                        error
                    })
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Team member not found'
                })
            }
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                success: false,
                error
            })
        }

    },

    async myTeam(req, res, next) {
        const userId = req.user.id
        try {
            const team = await Team.findOne({ createdBy: userId }).populate("members")
            if (!team) {
                return res.status(404).json({
                    status: 404,
                    message: "Team not found"
                })
            }
            res.status(200).json({
                status: 200,
                data: { team }
            })
        } catch (err) {
            res.status(400).json({
                status: 400,
                error: err
            })
        }


    },
    async getTeamById(req, res, next) {
        const id = req.query.teamId
        try {
            const team = await Team.findOne({ _id: id }).populate("members")
            if (!team) {
                return res.status(404).json({
                    status: 404,
                    message: "Team not found"
                })
            }
            res.status(200).json({
                status: 200,
                data: { team }
            })
        } catch (err) {
            res.status(400).json({
                status: 400,
                error: err
            })
        }


    },
    async allTeams(req, res, next) {
        try {
            const teams = await Team.find().populate("members")
            if (!teams.length) {
                return res.status(404).json({
                    status: 404,
                    message: "No team found"
                })
            }
            res.status(200).json({
                status: 200,
                data: { teams }
            })
        } catch (err) {
            res.status(400).json({
                status: 400,
                error: err
            })
        }


    },
    async getTeamMembers(req, res, next) {
        const { teamId } = req.body
        if (!teamId) {
            return res.status(400).json({
                status: 400,
                message: "Team id require"
            })

        }
        try {
            const team = await Team.findOne({ _id: teamId }).populate("members")
            if (!team) {
                return res.status(404).json({
                    status: 404,
                    message: "Team not found"
                })
            }
            res.status(200).json({
                status: 200,
                data: { teamMembers: team?.members }
            })
        } catch (err) {
            res.status(400).json({
                status: 400,
                error: err
            })
        }


    }

}

export default TeamController;
