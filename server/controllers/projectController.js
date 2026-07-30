const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../models/projectModel");

exports.createProject = async (req, res) => {
    try {

        const { name, description } = req.body;

        const project = await createProject(
            name,
            description,
            req.user.id
        );

        res.status(201).json(project);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.getProjects = async (req, res) => {
    try {

        const projects = await getAllProjects(req.user.id);

        res.json(projects);

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.getProject = async (req, res) => {

    const project = await getProjectById(req.params.id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    res.json(project);
};

exports.updateProject = async (req, res) => {

    const { name, description } = req.body;

    const project = await updateProject(
        req.params.id,
        name,
        description
    );

    res.json({
        message: "Project Updated",
        project
    });

};

exports.deleteProject = async (req, res) => {

    await deleteProject(req.params.id);

    res.json({
        message: "Project Deleted Successfully"
    });

};