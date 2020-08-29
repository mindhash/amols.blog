// @flow
import * as React from 'react';
import Comments from './Comments';
import Tags from './Tags';
import ReadMore from './ReadMore';
import styles from './Post.module.scss';

import Author from '../Author';
import Content from '../Content';
import SubscribeForm from '../SubscribeForm';
import Share from '../Share';
import Discuss from '../Discuss';

type PostType = {
  +fields?: Object,
  +frontmatter: {
    +date: Date,
    +dateModified?: Date,
    +description: string,
    +discussLinkTwitter?: string,
    +discussLinkHN?: string,
    +discussLinkReddit?: string,
    +isML: bool,
    +isWeb: bool,
    +slug: string,
    +tags?: string,
    +title: string,
  },
  +html: string,
};

type Props = {|
  +post: PostType,
  +prevPost?: PostType,
  +nextPost?: PostType,
  +contentFooter?: React.Node,
  +hideDescription?: bool,
|};

const Post = ({ post, prevPost, nextPost, contentFooter, hideDescription }: Props) => {
  const {
    tags,
    title,
    date,
    dateModified,
    description,
    isML,
    isWeb,
    slug,
    discussLinkTwitter,
    discussLinkHN,
    discussLinkReddit,
  } = post.frontmatter;

  const { html } = post;

  return (
    <div className={styles['post']}>
      <Content
        body={html}
        title={title}
        subtitle={hideDescription ? null : description}
        date={date}
        dateModified={dateModified}
        footer={contentFooter}
      />

      {/*<div className={styles['post__subscribeForm']}>
        <SubscribeForm signupSource={`Post:${slug}`} isML={isML} isWeb={isWeb} large />
      </div>*/}

      <div className={styles['post__viewSource']}>
        <p>
          <i>
            This blog is{' '}
            <a href="https://github.com/mindhash/amols.blog" target="_blank">
              open-source on Github
            </a>
            .
          </i>
        </p>
      </div>

      <div className={styles['post__footer']}>
        {tags && post.fields && <Tags tags={tags} tagSlugs={post.fields.tagSlugs} />}

        <div className={styles['post__authorContainer']}>
          <Author showBio showTwitter />

        </div>

        <button className={styles['post__subscribe']} 
        onClick={()=> location.href = '/subscribe'}> 
          Subscribe for similar content</button>

        {/* <Share url={slug} title={title} /> */}
        {prevPost && nextPost && <ReadMore prevPost={prevPost} nextPost={nextPost} />}
        
        {/*<Discuss twitter={discussLinkTwitter} hn={discussLinkHN} reddit={discussLinkReddit} />*/}
      </div>

      {/* <div className={styles['post__comments']}>
        <Comments />
      </div>*/ }
    </div>
  );
};

export default Post;
