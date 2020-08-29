// @flow
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import SubscribeForm from '../components/SubscribeForm';

const SubscribeTemplate = ({ data, pageContext }: Object) => {
  const { title: siteTitle } = data.site.siteMetadata;
  const { updateSubscription } = pageContext;

  const params =
    typeof window !== 'undefined' ?
      new URLSearchParams(window.location.search) :
      new URLSearchParams();
  const source = `SubscribePage:${params.get('src') || ''}`;

  const title = updateSubscription ? 'Update Your Subscription' : 'Subscribe to My Newsletter';

  return (
    <Layout title={`${title} - ${siteTitle}`}>
      <Sidebar hideSubscribeForm hideAd />
      <Page title={title}>
        {updateSubscription ? (
          <p>
            Update your subscription preferences to my newsletter below.
          </p>
        ) : (
          <p>
            Hey, I'm Amol Umbark. I write field stories (suitable) for <Link to="/tag/product-led growth/">product managers</Link>,{' '}
            <Link to="/tag/programming/">engineers</Link>,and{' '}
            <Link to="/tags/">more</Link> on this blog. You can subscribe to my newsletter to{' '}
            <b>get new articles by email</b>.
          </p>
        )}
        <SubscribeForm signupSource={source} large showAllOptions noDescription />
        <p>
          Don't hesitate to <Link to="/about/">Contact Me</Link> if you have any issues!
        </p>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query SubscribeQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default SubscribeTemplate;
