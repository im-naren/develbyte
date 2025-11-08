import React from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

interface BlogPost {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    date: string;
    formattedDate: string;
    description?: string;
  };
}

interface RecentPostsProps {
  currentPostId?: string;
  limit?: number;
}

export default function RecentPosts({ currentPostId, limit = 5 }: RecentPostsProps): JSX.Element {
  const blogData = usePluginData('docusaurus-plugin-content-blog', 'default') as any;
  
  // Get recent posts excluding the current post
  const recentPosts = (blogData?.blogPosts || [])
    .filter((post: BlogPost) => post.id !== currentPostId)
    .slice(0, limit);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <div className={styles.recentPostsBottom}>
      <h2>Recent Posts</h2>
      <div className={styles.recentPostsList}>
        {recentPosts.map((post: BlogPost) => (
          <div key={post.id} className={styles.recentPostItem}>
            <Link to={post.metadata.permalink} className={styles.recentPostLink}>
              <h3>{post.metadata.title}</h3>
            </Link>
            <time className={styles.recentPostDate}>
              {post.metadata.formattedDate}
            </time>
            {post.metadata.description && (
              <p className={styles.recentPostDescription}>
                {post.metadata.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


