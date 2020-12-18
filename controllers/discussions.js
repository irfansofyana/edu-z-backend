const Classes = require('../models/classes');
const Discussions = require('../models/discussions')
const {result_controller} = require('../middleware')

//Discussions
const getAllClassDiscussion = async (classId) => {
    try {
        const classDiscussionList = await Classes.findById(classId).populate({path: "discussions", model:"Discussions"})
        return result_controller("OK", classDiscussionList)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getClassDiscussionById = async (classId, discussionId) => {
    try {
        const classDiscussion = await Classes.findById(classId)
            .populate(
                {path: "discussions", 
                model:"Discussions",
                match: {_id: discussionId}})
            return result_controller("OK", classDiscussion.discussions)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const addClassDiscussion = async (discussion, classId) =>{
    try {
        const dataDiscussion = await Discussions.create(discussion)
        const updatedClass = await Classes.findByIdAndUpdate(
            classId,
            {$push: { discussions : dataDiscussion}}, {new: true})
        
        return result_controller("OK",updatedClass)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const updateClassDiscussion = async (classId, discussionId, discussion) =>{
    try {
        await Discussions.findByIdAndUpdate(
            discussionId,
            {$set: {topic: discussion.topic, content: discussion.content}},
            {new: true})
        
        const updatedClassDiscussion = await Classes.findById(classId)
            .populate(
                {path: "discussions", 
                model:"Discussions",
                match: {_id: discussionId}})
        
        return result_controller("OK",updatedClassDiscussion)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const deleteClassDiscussion = async (classId, discussionId) => {
    try {
        await Discussions.findByIdAndRemove(discussionId)

        const deletedClassDiscussion = await Classes.findByIdAndUpdate(classId,
            {$pull: { discussions : discussionId}}, {new: true})
            .populate(
                {path: "discussions", 
                model:"Discussions"})

        return result_controller("OK", deletedClassDiscussion)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

module.exports = {
    getAllClassDiscussion,
    getClassDiscussionById,
    addClassDiscussion,
    updateClassDiscussion,
    deleteClassDiscussion
}