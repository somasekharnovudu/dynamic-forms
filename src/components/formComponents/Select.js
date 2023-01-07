import React from 'react';

export default (props) => {
    const { handleFormvalChange, formObj: obj,value } = props;
    return (<div className="col-auto">
        <label htmlFor={obj.id} className='form-label'>{obj.label}</label>
        <select key={obj.name} name={obj.name} className='form-control' id={obj.id} multiple={obj.multi} onChange={({ target }) => handleFormvalChange(obj.name, target.value)} value={value} required>
            <option selected disabled={value !== ''}> -- Select -- </option>
            {obj.options.map((optionObj) => <option key={optionObj.value} value={optionObj.value}>{optionObj.label}</option>)}
        </select>
    </div>)
}