import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tech Insights',
    Svg: () => (
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="20" fill="#00ff00" opacity="0.1"/>
        <path d="M60 80L100 120L140 80" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="100" cy="60" r="8" fill="#00ff00"/>
        <text x="100" y="180" textAnchor="middle" fill="#00ff00" fontSize="16" fontWeight="bold">TECH</text>
      </svg>
    ),
    description: (
      <>
        Explore the latest trends in web development, software engineering, 
        and technology through detailed articles and tutorials.
      </>
    ),
  },
  {
    title: 'Code & Projects',
    Svg: () => (
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="20" fill="#00ff00" opacity="0.1"/>
        <rect x="40" y="60" width="120" height="80" rx="8" fill="#00ff00" opacity="0.2"/>
        <rect x="50" y="70" width="100" height="4" fill="#00ff00"/>
        <rect x="50" y="80" width="80" height="4" fill="#00ff00"/>
        <rect x="50" y="90" width="90" height="4" fill="#00ff00"/>
        <rect x="50" y="100" width="70" height="4" fill="#00ff00"/>
        <text x="100" y="180" textAnchor="middle" fill="#00ff00" fontSize="16" fontWeight="bold">CODE</text>
      </svg>
    ),
    description: (
      <>
        Discover practical coding examples, project walkthroughs, and 
        best practices for building modern applications.
      </>
    ),
  },
  {
    title: 'Developer Journey',
    Svg: () => (
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="20" fill="#00ff00" opacity="0.1"/>
        <circle cx="100" cy="100" r="40" fill="#00ff00" opacity="0.2"/>
        <circle cx="100" cy="100" r="20" fill="#00ff00"/>
        <path d="M60 100L100 60L140 100L100 140Z" stroke="#00ff00" strokeWidth="3" fill="none"/>
        <text x="100" y="180" textAnchor="middle" fill="#00ff00" fontSize="16" fontWeight="bold">JOURNEY</text>
      </svg>
    ),
    description: (
      <>
        Follow my journey as a developer, from learning new technologies 
        to solving complex problems and sharing experiences.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
