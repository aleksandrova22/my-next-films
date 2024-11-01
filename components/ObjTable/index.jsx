import classes from './ObjTable.module.css';

export function SimpleTable({ data, config }) {
    return <table className={classes.objtable}>
        <THead config={config} />
        <TBody data={data} config={config} />
    </table>
}

function THead({ config }) {
    return <thead>
        <tr key={config.imdbID}>
            {config.columns.map(c => <td key={c.title}>{c.title}</td>)}
        </tr>
    </thead>;
}

function TBody({ data, config }) {
    return <tbody>
      <tr key={data.id}>  {config.columns.map(({ title, content }) => <td key={title}> {content(data)}</td>)}
        </tr>
    </tbody>;
}