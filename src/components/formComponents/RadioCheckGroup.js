import React from 'react';

export default (props) => {
    const { handleFormvalChange, formObj: obj, value, formType } = props;

    return (
        <div className="col-auto">
            <label htmlFor={obj.id} className='form-label'>{obj.label}</label>
            {obj.options.map((optionObj) => <span ><input className='form-check' type={formType} key={optionObj.value} name={obj.name} onChange={({ target }) => { handleFormvalChange(obj.name, target.checked, formType, optionObj.value) }} checked={value.includes(optionObj.value)} /> <label className="form-check-label">{optionObj.label}</label> </span>)}
        </div>
    )
}