import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import IndexHome from '../../README.md';
import ZustandDemo from '../components/ZustandDemo/ZustandDemo';

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout>
            <main className="container">
                <ZustandDemo />
                <MDXContent>
                    <IndexHome />
                </MDXContent>
            </main>
        </Layout>
    );
}
