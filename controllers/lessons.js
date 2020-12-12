const getAllLessons = () => {
    const message = {
        "status": "OK",
        "data": [
            {
                "name": "data-01",
                "description": "example of data 1"
            }
        ]
    }

    return message;
}

const getLessonsById = (id) => {
    const message = {
        "status": "OK",
        "data": [
            {
                "name": "data-01",
                "description": "example of data 1"
            }
        ]
    }

    return message;
}

module.exports = {
    getAllLessons,
    getLessonsById
}