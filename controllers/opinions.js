const Discussions = require('../models/discussions')
const Opinions = require('../models/opinions')
const {result_controller} = require('../middleware')

const getAllDiscussionOpinions = async (discussionId) => {
    try {
        const opinionList = await Discussions.findById(discussionId)
        .populate(
            {path: "opinions", 
            model:"Opinions"})
        
        return result_controller("OK", opinionList)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const getDiscussionOpinionsById = async (discussionId, opinionId) => {
    try {
        const discussionOpinion = await Discussions.findById(discussionId)
        .populate(
            {path: "opinions", 
            model:"Opinions",
            match: {_id: opinionId}
        })
        return result_controller("OK", discussionOpinion.opinions)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const addDiscussionOpinion = async (discussionId, opinion) => {
    try {
        const dataOpinion = await Opinions.create(opinion)
        const updatedDiscussion = await Discussions.findByIdAndUpdate(
            discussionId,
            {$push: {opinions: dataOpinion}}, {new: true})
            .populate(
                {path: "opinions", 
                model:"Opinions"})
        
        return result_controller("OK", updatedDiscussion)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", nul)
    }
}

const updateDiscussionOpinion = async (discussionId, opinionId, opinion) =>{
    try {
        await Opinions.findByIdAndUpdate(
            opinionId,
            {$set: {opinion: opinion.opinion} },
            {new: true})
        
        const updatedDiscussionOpinion = await Discussions.findById(discussionId)
            .populate(
                {path: "opinions", 
                model:"Opinions",
                match: {_id: opinionId}})
        
        return result_controller("OK",updatedDiscussionOpinion)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

const deleteDiscussionOpinion = async (discussionId, opinionId) =>{
    try {
        await Opinions.findByIdAndRemove(opinionId)
        
        const deletedDiscussionOpinion = await Discussions.findByIdAndUpdate(
            discussionId,
            {$pull: {opinions: opinionId}}, {new: true})
            .populate(
                {path: "opinions", 
                model:"Opinions"})
        
        return result_controller("OK",deletedDiscussionOpinion)
    } catch (error) {
        console.error(error)
        return result_controller("ERROR", null)
    }
}

module.exports = {
    getAllDiscussionOpinions,
    getDiscussionOpinionsById,
    addDiscussionOpinion,
    updateDiscussionOpinion,
    deleteDiscussionOpinion
}