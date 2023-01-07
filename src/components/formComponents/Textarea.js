import React from 'react';

export default (props) => {
    const { handleFormvalChange, formObj: obj, value } = props;

    return (
        <div className="col-auto">
            <label htmlFor={obj.id} className='form-label'>{obj.label}</label>
            <textarea onChange={({ target }) => handleFormvalChange(obj.name, target.value)} name={obj.name}>{value}</textarea>
        </div>
    )
}