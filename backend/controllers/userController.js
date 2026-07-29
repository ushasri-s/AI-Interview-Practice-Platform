const getProfile = async (req, res) => {
    res.status(200).json({
        message: "Welcome to your profile!",
    });
};

module.exports ={
    getProfile,
}