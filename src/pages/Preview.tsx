import { create } from 'zustand';
import styles from './styles.module.css';

const useStore = create(set => ({
    count: 1,
    inc: () => set(state => ({ count: state.count + 1 })),
}));

const Preview = () => {
    const { count, inc } = useStore();

    return (
        <div className={styles.preview}>
            <p>{count}</p>
            <button onClick={inc}>one up</button>
        </div>
    );
};

export default Preview;
