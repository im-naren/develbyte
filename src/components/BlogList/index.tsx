import type {ReactNode} from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Static blog posts data based on actual files
const blogPosts = [
  {
    id: 'getting-started-with-docusaurus',
    metadata: {
      permalink: '/blog/getting-started-with-docusaurus',
      title: 'Getting Started with Docusaurus - Building Your First Blog',
      description: 'Docusaurus is a powerful static site generator that makes it easy to create documentation sites and blogs. In this post, we\'ll explore how to set up your first Docusaurus blog and customize it to match your brand.',
      date: '2024-01-15',
      formattedDate: 'January 15, 2024',
      authors: [{ name: 'Narendra', title: 'Developer', url: '/about', imageURL: '' }],
      tags: [
        { label: 'docusaurus', permalink: '/blog/tags/docusaurus' },
        { label: 'blog', permalink: '/blog/tags/blog' },
        { label: 'web-development', permalink: '/blog/tags/web-development' },
        { label: 'tutorial', permalink: '/blog/tags/tutorial' }
      ],
      readingTime: 8
    }
  },
  {
    id: 'modern-web-development-trends-2024',
    metadata: {
      permalink: '/blog/modern-web-development-trends-2024',
      title: 'Modern Web Development Trends in 2024',
      description: 'The web development landscape continues to evolve rapidly, with new frameworks, tools, and practices emerging constantly. In this post, we\'ll explore the key trends shaping modern web development in 2024.',
      date: '2024-01-20',
      formattedDate: 'January 20, 2024',
      authors: [{ name: 'Narendra', title: 'Developer', url: '/about', imageURL: '' }],
      tags: [
        { label: 'web-development', permalink: '/blog/tags/web-development' },
        { label: 'javascript', permalink: '/blog/tags/javascript' },
        { label: 'react', permalink: '/blog/tags/react' },
        { label: 'typescript', permalink: '/blog/tags/typescript' },
        { label: 'trends', permalink: '/blog/tags/trends' }
      ],
      readingTime: 12
    }
  }
];

interface BlogPost {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    description: string;
    date: string;
    formattedDate: string;
    authors: Array<{
      name: string;
      title: string;
      url: string;
      imageURL: string;
    }>;
    tags: Array<{
      label: string;
      permalink: string;
    }>;
    readingTime: number;
  };
}

function BlogPostItem({post}: {post: BlogPost}) {
  const {metadata} = post;
  const date = new Date(metadata.date);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  
  return (
    <div className={styles.blogItem}>
      <span className={styles.blogDate}>{month} {day}, {year}:</span>
      <Link to={metadata.permalink} className={styles.blogLink}>
        {metadata.title}
      </Link>
    </div>
  );
}

export default function BlogList(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <section className={styles.blogSection}>
      <div className="container">
        
        <div className="row">
          <div className="col col--12">
            <div className={styles.blogArchive}>
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2024
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>January 20, 2024:</span>
                    <Link to="/blog/modern-web-development-trends-2024" className={styles.blogLink}>
                      Modern Web Development Trends in 2024
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>January 15, 2024:</span>
                    <Link to="/blog/getting-started-with-docusaurus" className={styles.blogLink}>
                      Getting Started with Docusaurus - Building Your First Blog
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2019
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>April 15, 2019:</span>
                    <Link to="/blog/speculative-execution-in-hadoop" className={styles.blogLink}>
                      Speculative Execution in Hadoop
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>April 15, 2019:</span>
                    <Link to="/blog/troubleshooting-in-redshift" className={styles.blogLink}>
                      Troubleshooting in Redshift
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2018
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>February 6, 2018:</span>
                    <Link to="/blog/spell-correct-in-python-part-1" className={styles.blogLink}>
                      Spell-correct in Python - Part 1
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2017
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>July 8, 2017:</span>
                    <Link to="/blog/introduction-to-pandas" className={styles.blogLink}>
                      Introduction to Pandas
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>April 10, 2017:</span>
                    <Link to="/blog/probability" className={styles.blogLink}>
                      Probability
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2016
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>November 4, 2016:</span>
                    <Link to="/blog/zookeeper-sessions-and-life-cycle" className={styles.blogLink}>
                      Zookeeper Sessions and Life Cycle
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>October 27, 2016:</span>
                    <Link to="/blog/zookeeper-namespace-and-operations" className={styles.blogLink}>
                      Zookeeper Namespace and Operations
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>October 20, 2016:</span>
                    <Link to="/blog/zookeeper-introduction-to-zookeeper" className={styles.blogLink}>
                      Zookeeper Introduction to Zookeeper
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>September 20, 2016:</span>
                    <Link to="/blog/message-queue" className={styles.blogLink}>
                      Message Queue
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2015
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>September 14, 2015:</span>
                    <Link to="/blog/normalisation" className={styles.blogLink}>
                      Normalisation
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>May 25, 2015:</span>
                    <Link to="/blog/how-to-sort-a-hashmap-on-values" className={styles.blogLink}>
                      How to Sort a HashMap on Values
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>May 15, 2015:</span>
                    <Link to="/blog/how-to-implement-singly-linked-list-in-java" className={styles.blogLink}>
                      How to Implement Singly Linked List in Java
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>May 14, 2015:</span>
                    <Link to="/blog/introduction-to-mapreduce" className={styles.blogLink}>
                      Introduction to MapReduce
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>May 3, 2015:</span>
                    <Link to="/blog/hdfs-architecture" className={styles.blogLink}>
                      HDFS Architecture
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>March 10, 2015:</span>
                    <Link to="/blog/mapreduce-execution-in-hadoop" className={styles.blogLink}>
                      MapReduce Execution in Hadoop
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>March 7, 2015:</span>
                    <Link to="/blog/difference-between-unix-and-linux" className={styles.blogLink}>
                      Difference Between Unix and Linux
                    </Link>
                  </div>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>February 3, 2015:</span>
                    <Link to="/blog/how-to-find-out-next-and-previous-day-of-week-in-oracle" className={styles.blogLink}>
                      How to Find Out Next and Previous Day of Week in Oracle
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={styles.yearSection}>
                <Heading as="h2" className={styles.yearTitle}>
                  2014
                </Heading>
                <div className={styles.postsList}>
                  <div className={styles.blogItem}>
                    <span className={styles.blogDate}>March 11, 2014:</span>
                    <Link to="/blog/welcome-to-develbyte" className={styles.blogLink}>
                      Welcome to Develbyte
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
