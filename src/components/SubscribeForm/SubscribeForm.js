import React from 'react';
import styles from './SubscribeForm.module.scss';

const SubscribeForm = ({ large }) => (
  <div className={`${styles['container']} ${large ? styles['large'] : ''}`}>
    <p className={styles['description']}>
      <b>Subscribe</b> to know whenever I post new content. I don't spam!
    </p>
    <form
      action="https://victorzhou.us20.list-manage.com/subscribe/post"
      method="POST"
      target="_blank"
    >
      <input type="hidden" name="u" value="7cd5089a9bbc5253e6890ae15" />
      <input type="hidden" name="id" value="9f367a1f47" />
      <input
        type="email"
        autoCapitalize="off"
        autoCorrect="off"
        name="MERGE0"
        size="25"
        placeholder="example@domain.com"
        aria-label="Email Address"
      />
      <br />
      <input type="submit" name="submit" value="SUBSCRIBE" />
    </form>
  </div>
);

export default SubscribeForm;
