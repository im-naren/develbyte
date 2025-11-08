import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const {metadata, items} = props;

  return (
    <div className={styles.blogListPage}>
      <h1 className={styles.pageTitle}>Recent Posts</h1>
      <div className={styles.blogArchive}>
        <div className={styles.postsList}>
          {items.map(({content: BlogPostContent}) => {
            const {metadata: postMetadata} = BlogPostContent;
            const date = new Date(postMetadata.date);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div key={postMetadata.permalink} className={styles.blogItem}>
                <span className={styles.blogDate}>{formattedDate}:</span>
                <Link to={postMetadata.permalink} className={styles.blogLink}>
                  {postMetadata.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <BlogListPaginator metadata={metadata} />
    </div>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <Layout>
        <BlogListPageContent {...props} />
      </Layout>
    </HtmlClassNameProvider>
  );
}

