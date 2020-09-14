import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function FilterForm() {
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();
    function handleChange(e) {
        dispatch({ type: 'SET_FILTER', data: { filter: e.target.value } })
    }

    const style = {
        marginBottom: '1.5em'
    };

    return (
        <div style={style}>
            Filter: <input type='text' value={filter} onChange={handleChange} />
        </div>
    );
}