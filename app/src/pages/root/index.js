import React, { Component } from 'react';
import Login from '../../widgets/auth/Login'
import ProposalList from './ProposalList';
import { Mail } from 'react-feather';

class Root extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    if (window.sessionStorage.authToken) {
      return <ProposalList
        selectedSection={this.props.selectedSection}
        updateState={this.props.updateState}
        preferenceList={this.props.preferenceList}
        searchString={this.props.searchString}
        filter={this.props.filter}
        proposalList={this.props.proposalList}/>
    } else {
      return <Welcome/>
    }
  }
}

class Welcome extends Component {
  render() {
    return (
      <div className="mw8 center tc w-100 flex-auto">
        <h1 className="f3 mt5 mb3">Velkommen til Demokratifabrikken.</h1>
        <p className="black-70">Det er dig der bestemmer. Hver gang.</p>
        <Login icon="LogIn" iconClass="mr2" type="login" className="pointer db dib-ns b white bg-dark-blue hover-bg-blue mv2 mr0 mr3-ns pv2 ph4 ba b--black-10 br1 shadow-6"/>
        <Login icon="UserPlus" iconClass="mr2" type="signUp" className="pointer db dib-ns b white bg-dark-blue hover-bg-blue mv2 pv2 ph4 ba b--black-10 br1 shadow-6"/>
        <div className="tl bg-white pa4 mv3 ba b--black-10 br1 shadow-6 lh-copy">
          <h2 className="mt2 mb0">Denne release</h2>
          <span className="black-50">Udgivet oktober 2017</span>
          <ul>
            <li>Stor performanceforbedring for mere smidig brugeroplevelse</li>
            <li>Lette udforskningsmuligheder blandt alle aktuelle forslag</li>
            <li>Personligt fokus på de forslag, der er vigtige for dig</li>
          </ul>
          <h2 className="mt2 mb0">Næste release</h2>
          <span className="black-50">Forventet til december 2017</span>
          <ul>
            <li>Påmindelser om nye forslag og snarlige deadlines</li>
            <li>Simple afstemningsresultater på afsluttede forslag</li>
          </ul>
        </div>
        <p className="black-70 ma4">Problemer? <a href="mailto:dinevenner@initiativet.net" className="pointer dark-blue hover-blue"><Mail className="mr2"/>Send os en mail</a></p>
      </div>
    );
  }
}

export default Root;
