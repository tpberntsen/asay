import React, { Component } from 'react';

class SettingsList extends Component {
  constructor() {
    super();
    this.updatingUser = this.updatingUser.bind(this);
    this.updatingEmailPreference = this.updatingEmailPreference.bind(this);
  }

  updatingUser(user) {
    this.props.updateState({ entityType: 'user', entity: user });
  }

  async updatingEmailPreference() {
    const newUser = Object.assign(this.props.user, { emailnotification: !this.props.user.emailnotification });
    this.updatingUser(newUser);
    const response = await fetch('/api/user/emailnotification', {
      method: 'POST',
      body: JSON.stringify({ emailnotification: newUser.emailnotification }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.sessionStorage.authToken
      }
    });
    if (!response.ok) {
      this.props.updateState({ entityType: 'error', entity: true });
    }
  }

  render() {
    return (
      <div className="flex flex-column flex-row-ns items-center-ns mv4 mv5-ns">
        <div className="flex-auto">
          <h3 className="mw6 mv1">E-mail notifikationer </h3>
          <p className="black-70 lh-copy mw6 mv1">
            Vi sender dig en ugentlig opdatering med nye forslag relevante for dig.
          </p>
        </div>
        <div className="flex-none pv2 pl4-ns">
          <div className="no-select" onClick={() => this.updatingEmailPreference()}>
            <a
              className={
                this.props.user.emailnotification
                  ? 'dib white bg-dark-blue ba b--black-10 br1 br--left pv2 ph3'
                  : 'dib black-50 bg-near-white ba b--black-10 br1 br--left pv2 ph3'
              }>
              Til
            </a>
            <a
              className={
                this.props.user.emailnotification
                  ? 'dib black-50 bg-near-white ba b--black-10 br1 br--right pv2 ph3'
                  : 'dib white bg-dark-blue ba b--black-10 br1 br--right pv2 ph3'
              }>
              Fra
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsList;
