const GITHUB_AUTH_CALLBACK = window.location.origin + '/oauth/callback_github'
const NOTION_AUTH_CALLBACK = window.location.origin + '/oauth/callback_notion'

export enum AuthType {
  GITHUB = 'github',
  NOTION = 'notion',
  WEBDAV = 'webdav',
  EMAIL = 'email',
}

export const AuthConfig: Record<
  AuthType,
  {
    label: string
    link: string
    icon: string
    platformUrl: string
    redirectUri: string
  }
> = {
  notion: {
    label: 'Notion授权',
    link: `https://api.notion.com/v1/oauth/authorize?client_id=3f5182ae-a3a4-46b1-8e17-b1e9f2c7e37a&response_type=code&owner=user&redirect_uri=${NOTION_AUTH_CALLBACK}`,
    icon: 'https://pagenote-public.oss-cn-beijing.aliyuncs.com/_static/notion.ico',
    platformUrl: 'https://www.notion.so/my-integrations',
    redirectUri: NOTION_AUTH_CALLBACK,
  },
  webdav: {
    label: 'webdav授权',
    link: `/oauth/webdav`,
    icon: '',
    platformUrl: '',
    redirectUri: '',
  },
  github: {
    label: 'GitHub授权',
    link: `https://github.com/login/oauth/authorize?scope=user%20repo&client_id=Iv1.fbdc49e54f75d9af&allow_signup=true&redirect_uri=${GITHUB_AUTH_CALLBACK}`,
    icon: 'https://github.githubassets.com/favicons/favicon.svg',
    platformUrl: 'https://github.com/settings/installations',
    redirectUri: '',
  },
  email: {
    label: '邮箱验证',
    link: `/oauth/email`,
    icon: '/img/email.webp',
    platformUrl: '',
    redirectUri: '',
  },
}
