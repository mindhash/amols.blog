// @flow
import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Author from './Author';
import Menu from '../Menu';
import MovableSidebarContent from '../MovableSidebarContent';
import styles from './Sidebar.module.scss';

type Props = {
  +hideSubscribeForm?: boolean,
  +hideAd?: boolean,
};

type PureProps = Props & {
  +data: Object,
};

export const PureSidebar = ({ data, hideSubscribeForm, hideAd }: PureProps) => {
  const {
    author,
  } = data.site.siteMetadata;

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} />
        <Menu />
        <div style={{fontWeight: 'bold'}}>Follow <a href="https://www.twitter.com/aumbark" target="_blank">@aumbark</a> for updates </div>
        <MovableSidebarContent desktop hideSubscribeForm={true} hideAd={true} />

      </div>
    </div>
  );
};

export const Sidebar = (props: Props) => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        site {
          siteMetadata {
            author {
              name
              photo
              bio
            }
          }
        }
      }
    `}
    render={(data) => <PureSidebar {...props} data={data}/>}
  />
);

export default Sidebar;
