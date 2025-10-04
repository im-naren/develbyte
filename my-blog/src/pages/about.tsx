import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function About(): React.JSX.Element {
  return (
    <Layout title="About Me" description="Learn more about Narendra Kumar">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--lg">
              <h1 className="hero__title">About Me</h1>
              <p className="hero__subtitle">
                Builder of data systems and software, sharing notes on engineering, process, and career
              </p>
            </div>
            
            <div className="card margin-bottom--lg">
              <div className="card__body">
                <div className="row">
                  <div className="col col--4">
                    <div className="text--center">
                      <div 
                        className="avatar avatar--vertical"
                        style={{
                          width: '200px',
                          height: '200px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem',
                          fontSize: '4rem',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        NK
                      </div>
                    </div>
                  </div>
                  <div className="col col--8">
                    <h2>Hello, I'm Narendra Dubey</h2>
                    <p>
                      I'm a builder of data systems and software, sharing notes on engineering, process, and career. 
                      I enjoy simplifying complex problems, writing practical guides, and exploring systems that scale without drama.
                    </p>
                    <p>
                      When I'm not shipping code, I'm usually reading, tinkering with data pipelines, or writing about what I learn here on Develbyte.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <h3>🚀 What I Do</h3>
                  </div>
                  <div className="card__body">
                    <ul>
                      <li>Data systems and software engineering</li>
                      <li>Building scalable data pipelines</li>
                      <li>Simplifying complex problems</li>
                      <li>Technical writing and practical guides</li>
                      <li>Systems that scale without drama</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <h3>🛠️ Technologies</h3>
                  </div>
                  <div className="card__body">
                    <div className="row">
                      <div className="col col--6">
                        <strong>Data Systems:</strong>
                        <ul>
                          <li>Data Pipelines</li>
                          <li>Distributed Systems</li>
                          <li>Cloud Infrastructure</li>
                        </ul>
                      </div>
                      <div className="col col--6">
                        <strong>Software Engineering:</strong>
                        <ul>
                          <li>Python & Go</li>
                          <li>Kubernetes & Docker</li>
                          <li>Monitoring & Observability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card margin-top--lg">
              <div className="card__header">
                <h3>📬 Get In Touch</h3>
              </div>
              <div className="card__body">
                <p>
                  I'm always interested in connecting with fellow engineers, discussing data systems, 
                  or sharing ideas about building scalable software and engineering processes.
                </p>
                <div className="row">
                  <div className="col col--4">
                    <a 
                      href="https://github.com/im-naren" 
                      className="button button--primary button--block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                  <div className="col col--4">
                    <a 
                      href="https://linkedin.com/in/im-naren" 
                      className="button button--primary button--block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="col col--4">
                    <a 
                      href="mailto:naren.dubey@zoho.com" 
                      className="button button--primary button--block"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text--center margin-top--lg">
              <p className="hero__subtitle">
                Thanks for visiting my blog! Feel free to explore my posts and don't hesitate to reach out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

