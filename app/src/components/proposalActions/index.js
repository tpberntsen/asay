import React, { Component } from 'react';
import { File, CheckSquare, AlertCircle, Bookmark } from 'react-feather';
import { Link } from 'react-router-dom';

class ProposalActions extends Component {
  constructor() {
    super();
    this.updateSubscription = this.updateSubscription.bind(this);
  }

  async updateSubscription() {
    if (this.props.anonymousUser) {
      this.props.updateState({ entityType: 'error', entity: 401 });
    } else {
      const proposal = this.props.proposal;
      const newSubscription = { proposal: proposal.id, subscription: !proposal.isSubscribing };
      this.props.updateState({ entityType: 'subscriptionList', entity: newSubscription });
      const response = await fetch(`/api/proposal/${proposal.id}/subscription`, {
        method: 'POST',
        body: JSON.stringify({
          subscription: !proposal.isSubscribing
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.authToken
        }
      });
      if (!response.ok) {
        this.props.updateState({ entityType: 'error', entity: response.status });
      }
    }
  }

  render() {
    const proposal = this.props.proposal;
    const proposalURL =
      proposal.status === 'Afsluttet'
        ? `http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
            proposal.numberNumeric +
            proposal.numberPostFix}/${proposal.periodCode}_${proposal.numberPreFix +
            proposal.numberNumeric +
            proposal.numberPostFix}_som_vedtaget.pdf`
        : `http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
            proposal.numberNumeric}/${proposal.periodCode}_${proposal.numberPreFix +
            proposal.numberNumeric}_som_fremsat.pdf`;
    return (
      <div className="text-center px-4 py-3">
        <a href={proposalURL} target={`_${proposal.id}`} className="w-full btn btn-secondary my-1">
          <File className="mr-2" />
          Læs forslaget
        </a>
        <button
          onClick={this.updateSubscription}
          onMouseDown={e => e.preventDefault()}
          className={proposal.isSubscribing ? 'w-full btn btn-secondary my-1' : 'w-full btn btn-primary my-1'}>
          <Bookmark className="mr-2" />
          {proposal.isSubscribing ? 'Fjern fra mine forslag' : 'Tilføj til mine forslag'}
        </button>
        {proposal.status !== 'Afsluttet' ? (
          this.props.anonymousUser ? (
            <button
              onClick={this.updateSubscription}
              onMouseDown={e => e.preventDefault()}
              className="w-full btn btn-primary my-1">
              <CheckSquare className="mr-2" />
              Gå til stemmeboks
            </button>
          ) : (
            <Link to={`${proposal.id}/vote`} className="w-full btn btn-primary my-1">
              <CheckSquare className="mr-2" />
              {proposal.hasVoted ? 'Skift din stemme' : 'Gå til stemmeboks'}
            </Link>
          )
        ) : (
          <button className="w-full btn btn-disabled my-1">
            <AlertCircle className="mr-2" />
            Afstemning lukket
          </button>
        )}
      </div>
    );
  }
}

export default ProposalActions;
