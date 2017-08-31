import React, { Component } from 'react';
// import CommentSection from 'react-disqus-comments';
import Nav from '../nav/Nav';
import ProposalInfo from './ProposalInfo';
// import ProposalArticles from './ProposalArticles';
import { ArrowLeft } from 'react-feather';

class ProposalPage extends Component {

  constructor() {
    super();
    this.state = {
      proposalData: '',
      openDataCaseType: '',
      openDataPeriod: '',
      openDataStatus: ''
    };
  }

  async componentDidMount() {
    const propsalUrl = encodeURIComponent('Sag?$filter=id%20eq%20' + this.props.match.params.id);
    const response = await fetch(`/api/openDataFetcher/fetchAllPages/${propsalUrl}`);
    const proposalData = await response.json();
    this.setState({proposalData});
    const caseTypeFilter = encodeURIComponent('Sagstype');
    const openDataCaseTypeResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${caseTypeFilter}`);
    const openDataCaseType = await openDataCaseTypeResponse.json();
    this.setState({openDataCaseType});
    const periodFilter = encodeURIComponent('Periode');
    const openDataPeriodResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${periodFilter}`);
    const openDataPeriod = await openDataPeriodResponse.json();
    this.setState({openDataPeriod});
    const statusFilter = encodeURIComponent('Sagsstatus');
    const openDataStatusResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${statusFilter}`);
    const openDataStatus = await openDataStatusResponse.json();
    this.setState({openDataStatus});
  }

  render() {
    const proposalData = this.state.proposalData;
    const proposalInfo = proposalData[0];
    if (proposalInfo) {
      return (
        <div>
          <Nav history={this.props.history}/>
          <a href = '../' className="dib link dark-blue hover-blue v-btm mb3">
            <ArrowLeft className="svg-icon mr1" />
            <span className="lh-copy">Tilbage til listen</span>
          </a>
          <div className="pt3 pb4 ph4 bg-white ba b--light-gray br2 shadow-6">
            <ProposalInfo
              proposalInfo = {proposalInfo}
              openDataCaseType = {this.state.openDataCaseType}
              openDataPeriod = {this.state.openDataPeriod}
              openDataStatus = {this.state.openDataStatus}
              polls = {proposalData.polls}
              attachments = {proposalData.attachments}
            />
          { /* <ProposalArticles articles = {proposalData.articles} proposalInfo = {proposalInfo} /> */ }
          </div>
          <a href = '../' className="dib link dark-blue hover-blue v-btm mt3">
            <ArrowLeft className="svg-icon mr1" />
            <span className="lh-copy">Tilbage til listen</span>
          </a>
          { /*
          <CommentSection
            shortname = "asay"
    				identifier = {this.props.match.params.id}
    				title = {proposalInfo.titel} />
          */ }
        </div>
      )
    } else {
      return (
        <div className="tc vh-100 gray">
          Loading ...
        </div>
      );
    }
  }
}

export default ProposalPage;
