// Import
const db = require('../../db.js')
const auth = require('../auth/auth.js')

// Queries
const selectVote = db.sql('./src/vote/selectVote.sql')
const selectVoteHistory = db.sql('./src/vote/selectVoteHistory.sql')
const insertVote = db.sql('./src/vote/insertVote.sql')
const updateVote = db.sql('./src/vote/updateVote.sql')

// Functions
async function getVote (userId, proposalId) {
  const vote = await db.cx.query(selectVote,
    {
      user: userId,
      proposal: proposalId,
    });
  return vote
}

async function getVoteHistory (userId) {
  const voteHistory = await db.cx.query(selectVoteHistory,
    {
      user: userId,
    }
  );
  return voteHistory
}

async function postVote (request, response) {
  try {
    const user = await auth.getUser(request);
    if (user) {
      const userId = user.id;
      const voteResult = request.body.voteresult;
      const proposalId = request.params.id;
      const currentVote = await getVote(userId, proposalId);
      const hasVoted = currentVote.length > 0 ? true : false;
      const vote = hasVoted ? await db.cx.query(updateVote,
        {
          user: userId,
          proposal: proposalId,
          result: voteResult,
        }) : db.cx.query(insertVote,
        {
          user: userId,
          proposal: proposalId,
          result: voteResult,
        });
      response.sendStatus(200)
    } else {
      response.sendStatus(401)
    }
  }
  catch(err) {
    response.sendStatus(500)
  }
}

// Export
module.exports = {
  postVote,
  getVote,
  getVoteHistory
}
