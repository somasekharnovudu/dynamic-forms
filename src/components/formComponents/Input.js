import React from 'react';

export default (props) => {
    const { handleFormvalChange, formObj: obj, value, formType } = props;

    return (
        <div className="col-auto">
            <label htmlFor={obj.id} className='form-label'>{obj.label}</label>
            <input type={formType} id={obj.id} className='form-control' value={value} name={obj.name} key={obj.name} onChange={({ target }) => handleFormvalChange(obj.name, target.value)} min={obj.min} max={obj.max} placeholder={obj.placeholder} required />
        </div>
    )
}