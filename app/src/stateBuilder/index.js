import R from 'ramda'
import findStageInfo from './findStageInfo'

async function initialState () {
  const appDataBundleResponse = await fetch('/api/appDataBundle/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    }
  );
  const appDataBundle = await appDataBundleResponse.json();
  const committeeCategoryList = appDataBundle.committeeCategoryList
  const voteList = appDataBundle.voteList
  const subscriptionList = appDataBundle.subscriptionList
  const rawPreferenceList = appDataBundle.preferenceList
  const rawProposalList = appDataBundle.proposalList.map(proposal => Object.assign({}, {id: proposal.id}, proposal.data))
  const preferenceList = buildPreferenceList(rawPreferenceList, committeeCategoryList)
  const proposalList = buildProposalList({
    proposalList: rawProposalList,
    voteList,
    subscriptionList,
    committeeCategoryList,
    preferenceList
  })
  return {preferenceList, proposalList, voteList, subscriptionList, committeeCategoryList}
}

function buildPreferenceList (rawPreferenceList, committeeCategoryList) {
  const unsortedPreferenceList = rawPreferenceList.map(preference => {
    const committeeList = R.filter(committee => committee.category === preference.id)(committeeCategoryList)
    return Object.assign({}, preference, {committeeList: R.pluck('committee')(committeeList)})
  });
  return sortPreferenceList(unsortedPreferenceList)
}

const sortPreferenceList = R.sortWith([R.ascend(R.prop('title'))]);

function buildProposalList ({proposalList, voteList, subscriptionList, committeeCategoryList, preferenceList}) {
  const newProposalList = proposalList.map(proposal => {
    const id = proposal.id
    const committeeId = proposal.committeeId
    const hasVoted = !!R.find(R.propEq('proposal', id))(voteList)
    const hasSubscription = R.find(R.propEq('proposal', id))(subscriptionList)
    const matchesCategory = R.find(R.propEq('committee', committeeId))(committeeCategoryList)
    const category = R.find(R.propEq('id', matchesCategory.category))(preferenceList)
    const stageInfo = findStageInfo(proposal.stage)
    const deadline = stageInfo.deadline
    const status = stageInfo.status
    const isSubscribing = (hasSubscription && hasSubscription.subscription) || category.preference
    return Object.assign({}, proposal, {
      hasVoted,
      id,
      isSubscribing,
      category,
      deadline,
      status
    })
  })
  return sortProposalList(newProposalList)
}

const sortProposalList = R.sortWith([R.ascend(R.prop('deadline'))]);

function updatePreferences (state, entity) {
  const newPreference = Object.assign({}, entity, {preference: !entity.preference})
  const newPreferenceList = R.reject(R.propEq('id', entity.id))(state.preferenceList).concat(newPreference)
  const sortedPreferenceList = sortPreferenceList(newPreferenceList)
  const newProposalList = buildProposalList(Object.assign({}, state, {preferenceList: sortedPreferenceList}))
  const newState = Object.assign({}, state, {proposalList: newProposalList, preferenceList: sortedPreferenceList})
  return newState
}

export default {
  initialState,
  updatePreferences
}