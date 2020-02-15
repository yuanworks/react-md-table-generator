import React from 'react';
import classnames from 'classnames';

import Layout from './Layout.module.scss';
import ToggleFullscreenButton from '../components/toolbar/ToggleFullscreenButton';
import ImportMarkdownButton from '../components/toolbar/ImportMarkdownButton';

export default function MainIntro() {

  return (
    <section className={classnames(Layout.mainContent, Layout.landingPage)}>
      <h1>Markdown Tables Generator</h1>
      <p>Easily generate Markdown tables without being an ASCII art professional. Built using React and Redux.</p>
      <p>
        <ToggleFullscreenButton type='colorful highlight' size='medium' />
        <ImportMarkdownButton type='colorful highlight' size='medium' />
        { /*
          [ Load Sample Data ]
        */}
      </p>
    </section>
  );
}
