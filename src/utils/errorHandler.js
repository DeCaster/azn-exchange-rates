const handleError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ error: message });
};

const handleNotFound = (res, message) => {
    console.error(message);
    res.status(404).json({ error: message });
};

module.exports = {
    handleError,
    handleNotFound,
};
