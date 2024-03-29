// @flow
require('now-env');
import * as React from 'react';
import type { GetSlackSettingsType } from 'shared/graphql/queries/community/getCommunitySlackSettings';

import {
  SectionCard,
  SectionTitleWithIcon,
  SectionSubtitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { Button } from 'src/components/buttons';
import Icon from 'src/components/icons';

type Props = {
  community: GetSlackSettingsType,
  isOnboarding: boolean,
};

class ImportSlackTeam extends React.Component<Props> {
  render() {
    const { community, isOnboarding = false } = this.props;
    console.log('preserve log');
    const url = isOnboarding
      ? `https://slack.com/oauth/authorize?client_id=532041445955.532084492867&scope=users:read.email%20users:read%20chat:write:bot%20groups:read%20channels:read&state=${
          community.id
        }&redirect_uri=${
          process.env.NODE_ENV === 'development'
            ? 'http://instaui.com:3001/api/slack/onboarding'
            : 'https://spectrum.chat/api/slack/onboarding'
        }`
      : `https://slack.com/oauth/authorize?client_id=532041445955.532084492867&scope=users:read.email%20users:read%20chat:write:bot%20groups:read%20channels:read&state=${
          community.id
        }&redirect_uri=${
          process.env.NODE_ENV === 'development'
            ? 'http://instaui.com:3001/api/slack'
            : 'https://spectrum.chat/api/slack'
        }`;

    return (
      <SectionCard>
        <SectionTitleWithIcon>
          <Icon glyph={'slack-colored'} size={32} />
          Connect a Slack team
        </SectionTitleWithIcon>
        <SectionSubtitle>
          Invite your Slack team to your community or get notified when new
          conversations are created.
        </SectionSubtitle>

        <SectionCardFooter>
          <a href={url}>
            <Button>Connect a Slack team</Button>
          </a>
        </SectionCardFooter>
      </SectionCard>
    );
  }
}

export default ImportSlackTeam;
