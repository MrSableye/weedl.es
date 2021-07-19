import React from 'react';
import { Divider, Layout, List, Space } from 'antd';
import Icon, { GithubFilled, TwitterOutlined } from '@ant-design/icons';
import clovermonImage from './clovermon.png';
import pullsImage from './pulls.png';
import dataImage from './data.png';
import psTsImage from './ps-ts.png';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

interface Repository {
  owner: string;
  name: string;
}

interface Project {
  title: string;
  shortDescription: string;
  description: string;
  repositories: Repository[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Clovermon Showdown',
    shortDescription: 'A Pokémon Showdown server dedicated to the Pokémon FireRed ROM Hack, Pokémon Clover',
    description: 'Clovermon Showdown is a Pokémon Showdown server dedicated to the Pokémon FireRed ROM Hack, Pokémon Clover. It features a modified client and server to enable the Pokémon available in Pokémon Clover as well as a few additional features added for ease of use.',
    link: 'https://clover.weedl.es',
    image: clovermonImage,
    repositories: [
      { owner: 'showderp', name: 'clovermon-showdown' },
      { owner: 'showderp', name: 'clovermon-showdown-client' },
    ],
  },
  {
    title: 'Pokémon TCG Pulls',
    shortDescription: 'A simple web application for tracking Pokémon TCG card pulls',
    description: 'Pokémon TCG Pulls is a simple web application intended to track card pulls from Pokémon TCG booster packs. It is designed in such a way that is can be used for both personal use and as a Twitch overlay for streamers.',
    link: 'https://weedl.es/pulls',
    image: pullsImage,
    repositories: [{ owner: 'MrSableye', name: 'ptcg-pull-overlay' }],
  },
  {
    title: 'Pokémon TCG Set Data Display',
    shortDescription: 'A simple application for filtering and viewing Pokémon Trading Card Game data',
    description: 'Pokémon TCG Set Data Display is a simple web application for filtering and viewing Pokémon Trading Card Game data. It is intended for use by players and ethusiasts to obtain useful statistics of the composition of various sets.',
    link: 'https://weedl.es/data',
    image: dataImage,
    repositories: [{ owner: 'MrSableye', name: 'ptcg-set-data-display' }],
  },
  {
    title: 'Pokémon Showdown TS',
    shortDescription: 'A TypeScript client for interacting with Pokémon Showdown',
    description: 'Pokémon Showdown TS is a TypeScript library that vends a client for interacting with Pokémon Showdown. It supports the majority of Pokémon Showdown event types and is able to easily handle new types as well. It supports a simple client for simply parsing messages and a managed client that handles retries, logins, etc.',
    image: psTsImage,
    repositories: [{ owner: 'showderp', name: 'pokemon-showdown-ts' }],
  }
];

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const wrapWithLink = ({ href, child }: { href?: string, child: React.ReactNode }) =>
  href ? <a href={href}>{child}</a> : child;

const ProjectItem = ({ project }: { project: Project }) => (
  <List.Item
    key={project.title}
    actions={project.repositories.map((repository) => wrapWithLink({
      href: `https://github.com/${repository.owner}/${repository.name}`,
      child: <IconText
        icon={GithubFilled}
        text={`${repository.owner}/${repository.name}`}
      />,
    }))}
    extra={
      project.image &&
      wrapWithLink({
        href: project.link,
        child: (<img
          width={272}
          alt='logo'
          src={project.image}
        />)
      })
    }
  >
    <List.Item.Meta
      title={wrapWithLink({ href: project.link, child: project.title })}
      description={project.shortDescription}
    />
    {project.description}
  </List.Item>
);

const joinNodes = (nodes: React.ReactNode[]) => {
  return nodes.reduce((prevNode, currNode) => {
    return [prevNode, <Divider />, currNode];
  });
};

const twitchLogo = () => <svg width='1em' height='1em' viewBox='0 0 2400 2800' fill='currentColor'>
  <g>
    <path d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z'/>
    <rect x='1700' y='550' width='200' height='600'/>
    <rect x='1150' y='550' width='200' height='600'/>
  </g>
</svg>;


const App = () => (
  <Layout>
    <Header id='weedle-header' style={{ position: 'fixed', zIndex: 1, width: '100%' }} />
    <Content style={{ marginTop: 64 }}>
      <List itemLayout='vertical' size='large'>
        {joinNodes(projects.map(project => <ProjectItem project={project} />))}
      </List>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      <div>
        {
          wrapWithLink({
            href: 'https://twitter.com/MisterSableye',
            child: <IconText icon={TwitterOutlined} text='MisterSableye' />
          })
        }
        <Divider type='vertical' />
        {
          wrapWithLink({
            href: 'https://github.com/MrSableye',
            child: <IconText icon={GithubFilled} text='MrSableye' />
          })
        }
        <Divider type='vertical' />
        {
          wrapWithLink({
            href: 'https://twitch.tv/MisterSableye',
            child: <IconText
              icon={() => <Icon
                component={twitchLogo}
              />}
              text='MisterSableye'
            />
          })
        }
      </div>
    </Footer>
  </Layout>
);

export default App;
