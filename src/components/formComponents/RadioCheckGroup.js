import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';

export default (props) => {
    const { handleFormvalChange, formObj: obj, value, formType } = props;


    const formValChangeHandler = (target, optionValue) => {
        if (obj.type === 'radio') {
            handleFormvalChange(obj.name, optionValue);
            return;
        }
        let prevValues = [...value];
        if (target.checked) {
            handleFormvalChange(obj.name, [...prevValues, optionValue]);
        } else {
            handleFormvalChange(obj.name, [...prevValues.filter((valStr) => valStr !== optionValue)]);
        }
    }
    const getValueChecked = (value, optionValue) => {
        if (obj.type === 'radio') {
            return value === optionValue
        }
        if (obj.type === 'checkbox') {
            return value.includes(optionValue);
        }
    }

    return (
        <div className="formFieldContainer">
            <label htmlFor={obj.id} className='form-label'>{obj.label}</label>
            {obj.options.map((optionObj) => <span ><input className='form-check' id={`${obj.name}_${optionObj.value}`} type={formType} key={optionObj.value} name={obj.name} onChange={({ target }) => { formValChangeHandler(target, optionObj.value) }} checked={getValueChecked(value, optionObj.value)} /> <label htmlFor={`${obj.name}_${optionObj.value}`} className="form-check-label">{optionObj.label}</label> </span>)}
        </div>
    )
}