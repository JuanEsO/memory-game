import './styles.css';
const ScoreTable = ({ hits, misses }) => {
    return (
      <div className='score-table'>
        <h2 className='score-table__title '>score table</h2>
        <div className='score-table_label--hits'>Hits: {hits}</div>
        <div className='score-table_label--misses'>Misses: {misses}</div>
      </div>
    )
};

export default ScoreTable;

