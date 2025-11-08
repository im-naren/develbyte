import React, { useState, useMemo } from 'react';
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
import BlogTagsFilter from '@site/src/components/BlogTagsFilter';
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter items based on selected tag
  const filteredItems = useMemo(() => {
    if (!selectedTag) return items;
    return items.filter(({content: BlogPostContent}) => {
      const tags = BlogPostContent.metadata.tags || [];
      return tags.some((tag) => tag.label === selectedTag);
    });
  }, [items, selectedTag]);

  return (
    <div className={styles.blogListPage}>
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Recent Posts [CUSTOM COMPONENT WORKING]</h1>
          {selectedTag && (
            <div className={styles.filterInfo}>
              Showing posts tagged with <strong>{selectedTag}</strong>
              <button 
                className={styles.clearFilter}
                onClick={() => setSelectedTag(null)}
              >
                × Clear filter
              </button>
            </div>
          )}
          <div className={styles.blogArchive}>
            {filteredItems.length === 0 ? (
              <div className={styles.noResults}>
                No posts found with tag "{selectedTag}".
              </div>
            ) : (
              <div className={styles.postsList}>
                {filteredItems.map(({content: BlogPostContent}) => {
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
            )}
          </div>
          {!selectedTag && <BlogListPaginator metadata={metadata} />}
        </div>
        
        <aside className={styles.sidebar}>
          <div style={{ color: 'white', padding: '20px' }}>
            TEST SIDEBAR - If you see this, the sidebar div works!
          </div>
          <BlogTagsFilter 
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            items={items}
          />
        </aside>
      </div>
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

