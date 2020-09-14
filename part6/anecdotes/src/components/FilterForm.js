import React from 'react';
import { connect } from 'react-redux';

function FilterForm({ filter, handleChange }) {
    const style = {
        marginBottom: '1.5em'
    };
    return (
        <div style={style}>
            Filter: <input type='text' value={filter} onChange={handleChange} />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        filter: state.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleChange: function(e) {
            dispatch({ type: 'SET_FILTER', data: { filter: e.target.value } })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);