// Import
const R = require('ramda')
const odaFetcher = require('./odaFetcher')
const scrapeIt = require('scrape-it')
const updateProposalList = require('./db/proposal/updateProposalList')

// Functions
async function ftBatchFetcher () {
  const proposalExpand = '&$expand=Sagsstatus,Periode,Sagstype,SagAkt%C3%B8r,Sagstrin'
  const proposalFilter = '&$filter=(typeid eq 3 or typeid eq 5) and periodeid eq 146'
  const proposalUrl = 'http://oda.ft.dk/api/Sag?$orderby=id desc' + proposalExpand + proposalFilter
  const proposalList = await odaFetcher.fetchAllPages(proposalUrl)
  const formattedProposalList = proposalList.map(proposal => {
    return {
      id: proposal.id,
      data: {
        committeeId: R.find(R.propEq('rolleid', 11), proposal.SagAktør).aktørid,
        titel: proposal.titel,
        shortTitel: proposal.titelkort,
        type: proposal.Sagstype.type,
        resume: proposal.resume,
        number: proposal.nummer,
        numberPreFix: proposal.nummerprefix,
        numberNumeric: proposal.nummernumerisk,
        numberPostFix: proposal.nummerpostfix,
        statusId: proposal.Sagsstatus.id,
        status: proposal.Sagsstatus.status,
        periodId: proposal.Periode.id,
        periodCode: proposal.Periode.kode,
        period: proposal.Periode.titel,
        stage: proposal.Sagstrin
      }
    }
  });
  let finishedProposalList = []
  for (const proposal of formattedProposalList) {
    const presentationUrl = `http://www.ft.dk/samling/${proposal.data.periodCode}/${proposal.data.type}/${proposal.data.numberPreFix + proposal.data.numberNumeric}/${proposal.data.periodCode}_${proposal.data.numberPreFix + proposal.data.numberNumeric}_fremsaettelsestale.htm`
    const presentation = await scrapeIt(presentationUrl, {paragraphs: {listItem: ".TekstGenerel"}})
    const dataWithPresentation = Object.assign({}, proposal.data, {presentation})
    finishedProposalList.push(Object.assign({}, {id: proposal.id}, {data: dataWithPresentation}))
  }
  updateProposalList(finishedProposalList);
};
ftBatchFetcher() // first time run
setInterval(openDataBatchFetcher, 24 * 60 * 60) // update every 24hrs

// Export
module.exports = ftBatchFetcher