const express = require('express');
const router = express.Router();
const {response_generator} = require('../middleware')

const {
    getAllDiscussionOpinions,
    getDiscussionOpinionsById,
    addDiscussionOpinion,
    updateDiscussionOpinion,
    deleteDiscussionOpinion
} = require('../controllers/opinions')
//Opinions
router.get('/:discussionId/opinion', async (req, res) => {
    const discId = req.params.discussionId
    const data = await getAllDiscussionOpinions(discId)
    
    const stat = data.status == "OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.get('/:discussionId/opinion/:opinionId', async (req, res) => {
    const discId = req.params.discussionId
    const opinionId = req.params.opinionId
    const data = await getDiscussionOpinionsById(discId, opinionId)
    
    const stat = data.status == "OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.post('/:discussionId/opinion', async (req, res) => {
    const discId = req.params.discussionId
    const opinion = req.body
    const data = await addDiscussionOpinion(discId, opinion)
    
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.put('/:discussionId/opinion/:opinionId', async (req, res) => {
    const discId = req.params.discussionId
    const opinionId = req.params.opinionId
    const opinion = req.body
    const data = await updateDiscussionOpinion(discId, opinionId, opinion)
    
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.delete('/:discussionId/opinion/:opinionId', async (req, res) => {
    const discId = req.params.discussionId
    const opinionId = req.params.opinionId
    const data = await deleteDiscussionOpinion(discId, opinionId)
    
    const stat = data.status == "OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

module.exports = router