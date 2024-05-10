import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import IndexHome from '../../README.md';
import Demo from './Demo';

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout>
            <main className="container">
                <Demo />
                <MDXContent>
                    <IndexHome />
                </MDXContent>
            </main>
        </Layout>
    );
}

// import clsx from 'clsx';
// import Link from '@docusaurus/Link';

// import HomepageFeatures from '@site/src/components/HomepageFeatures';
// import Heading from '@theme/Heading';

// function HomepageHeader() {
//     const { siteConfig } = useDocusaurusContext();
//     return (
//         <header className={clsx('hero hero--primary')}>
//             <div className="container">
//                 <Heading as="h1" className="hero__title">
//                     {siteConfig.title}
//                 </Heading>
//                 <p className="hero__subtitle">{siteConfig.tagline}</p>
//                 <div >
//                     <Link className="button button--secondary button--lg" to="/docs/intro">
//                         Docusaurus Tutorial - 5min ⏱️
//                     </Link>
//                 </div>
//             </div>
//         </header>
//     );
// }
