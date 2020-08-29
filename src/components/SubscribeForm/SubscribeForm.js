// @flow
import React from 'react';
import styles from './SubscribeForm.module.scss';

type Props = {|
  +signupSource: string,
  +isML?: boolean,
  +isWeb?: boolean,
  +showAllOptions?: boolean,
  +large?: boolean,
  +noDescription?: boolean,
  +noSpacing?: boolean,
  +onKeyDown?: Function,
|};

type State = {|
  +checked: {|
    +none: boolean,
    +ml: boolean,
    +web: boolean,
  |},
|};

export default class SubscribeForm extends React.PureComponent<Props, State> {
  state = { checked: { none: true, ml: false, web: false } };

  onCheckboxClick(id: 'ml' | 'web' | 'none') {
    this.setState({
      checked: { ...{ none: false, ml: false, web: false }, [id]: !this.state.checked[id] },
    });
  }

  render() {
    const {
      signupSource,
      isML,
      isWeb,
      showAllOptions,
      large,
      noDescription,
      noSpacing,
      onKeyDown,
    } = this.props;
    const { checked } = this.state;

    const inputType = showAllOptions ? 'radio' : 'checkbox';

    return (
      <div
        className={`${styles['container']} ${large ? styles['large'] : ''} ${
          noSpacing ? styles['no-spacing'] : ''
        }`}
      >
        {!noDescription && (
          <p className={styles['description']}>
            <b>Get the best field stories about creating products each week .</b>
          </p>
        )}
        <form
          action=""
          method="post"
          acceptCharset="utf-8"
          target="_blank"
        >
          <input type="hidden" name="Source" value={signupSource} />
          <input type="hidden" name="list" value="CWC7638hEb6mfk1RqUbJ763snA" />
          <input
            type="text"
            name="hp"
            style={{ display: 'none' }}
            tabIndex="-1"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <input
            type="email"
            autoCapitalize="off"
            autoCorrect="off"
            name="email"
            size="25"
            placeholder="enter your email here"
            aria-label="Email Address"
            onKeyDown={onKeyDown}
            style={noDescription ? { marginTop: 0 } : undefined}
          />
          <br />
          {showAllOptions && (
            <label>
              <input
                type={inputType}
                name="Restrictions"
                value=""
                checked={checked.none}
                onChange={this.onCheckboxClick.bind(this, 'none')}
              />
              Send <i>all</i> posts
            </label>
          )}
          {showAllOptions && <br />}
          {(isML || showAllOptions) && (
            <label>
              <input
                type={inputType}
                name="Restrictions"
                value={checked.ml ? 'ML' : ''}
                checked={checked.ml}
                onChange={this.onCheckboxClick.bind(this, 'ml')}
              />
              Include <i>only</i> Engineering posts
            </label>
          )}
          {showAllOptions && <br />}
          {(isWeb || showAllOptions) && (
            <label>
              <input
                type={inputType}
                name="Restrictions"
                value={checked.web ? 'Web' : ''}
                checked={checked.web}
                onChange={this.onCheckboxClick.bind(this, 'web')}
              />
              Include <i>only</i> Product Management posts
            </label>
          )}
          {(isML || isWeb || showAllOptions) && <br />}
          <input type="submit" value="Sure. I'm in!" />
        </form>
      </div>
    );
  }
}
