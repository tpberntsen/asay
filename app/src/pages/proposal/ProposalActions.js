import R from 'ramda'
import React, { Component } from 'react';
import { Download, CheckSquare, AlertCircle, Radio } from 'react-feather';
import { Link } from 'react-router-dom';

class ProposalActions extends Component {
  constructor() {
    super()
    this.updateSubscription = this.updateSubscription.bind(this);
  }

  async updateSubscription() {
    const proposal = this.props.proposal
    const newSubscription = {proposal: proposal.id, subscription: !proposal.isSubscribing}
    const response = await fetch(`/api/proposal/${proposal.id}/subscription`,
      {
        method: 'POST',
        body: JSON.stringify({
          subscription: !proposal.isSubscribing,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      })
    if (response.ok) {
      this.props.updateState({entityType: 'subscriptionList', entity: newSubscription})
    }
  }

  render() {
    const proposal = this.props.proposal;
    const proposalURL = proposal.status === "Afsluttet" ?
      `http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/${proposal.periodCode}_${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}_som_vedtaget.pdf`
      :`http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric}/${proposal.periodCode}_${proposal.numberPreFix + proposal.numberNumeric}_som_fremsat.pdf`
    return (
      <div className="col12 col3-l tc pl3-l">
        <div className="col12 col9-l tc">
          <a href={proposalURL} target={`_${proposal.id}`} className="dib w-100 pv2 mv2 dark-blue ba b--dark-blue br1 link">
            <Download className="mr2"/>
            Se forslaget
          </a>
          {proposal.status !== "Afsluttet" ?
          <Link to={`${proposal.id}/vote`} className="db dib-l white bg-dark-blue hover-bg-blue mt3 pv2 ph4 ba b--black-10 br1 shadow-6">
            <CheckSquare className="mr2"/> {/* UPDATE STYLING BY STATE OF proposal.hasVoted */}
            {proposal.hasVoted ? "Du har stemt" : "Gå til stemmeboks" }
          </Link>:
          <a className="">
            <AlertCircle className="mr2"/>
            Afstemning lukket
          </a>}
          <a onClick={this.updateSubscription}>
            <Radio className="mr2"/> {/* UPDATE STYLING BY STATE OF proposal.isSubscribing */}
            {proposal.isSubscribing ? "Fjern fra egne forslag" : "Tilføj til egne forslag" }
          </a>
        </div>
      </div>
    );
  }
}

export default ProposalActions;