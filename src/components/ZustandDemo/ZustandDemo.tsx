import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';
import Code from '!!raw-loader!./Code';
import Preview from './Preview';

const Demo = () => {
    return (
        <div className={styles.demo}>
            <CodeBlock language="jsx" className={styles.code}>
                {Code}
            </CodeBlock>
            <Preview />
        </div>
    );
};

export default Demo;
