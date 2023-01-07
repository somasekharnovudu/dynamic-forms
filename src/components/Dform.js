import React, { useState } from 'react';
import formJSON from './dform.json';
import * as _ from 'lodash';

const renderConditionalForm = (condForm, formValues, handleFormvalChange, parentVal) => {
    const renderVal = _.get(condForm, "renderVal", '');
    if (parentVal === renderVal) {
        const formArr = _.get(condForm, 'childElements', [])
        return formArr.map((formObj) => recurrsiveRenderer(formObj, formValues, handleFormvalChange))
    }
}

const childElemrenderer = (formObj, formValues, handleFormvalChange) => {
    let value = _.get(formValues, formObj.name, '');
    const childElements = _.get(formObj, 'conditionalElements', []);
    return childElements.map(conditionalForm => renderConditionalForm(conditionalForm, formValues, handleFormvalChange, value))
}
const recurrsiveRenderer = (obj, formValues, handleFormvalChange) => {
    let value = _.get(formValues, obj.name, '');
    const formType = _.get(obj, 'type', '');
    if (formType == 'select') {
        return <div className="formContainer">
            <div className="col-auto">
                <label htmlFor={obj.id} class='form-label'>{obj.label}</label>
                <select key={obj.name} name={obj.name} className='form-control' id={obj.id} multiple={obj.multi} onChange={({ target }) => handleFormvalChange(obj.name, target.value)} value={value}>
                    <option selected disabled={value !== ''}> -- Select -- </option>
                    {obj.options.map((optionObj) => <option key={optionObj.value} value={optionObj.value}>{optionObj.label}</option>)}
                </select>
            </div>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (['text', 'password', 'email', 'number', 'color', 'range'].includes(formType)) {
        return <div className="formContainer">
            <div className="col-auto">
                <label htmlFor={obj.id} class='form-label'>{obj.label}</label>
                <input type={formType} id={obj.id} className='form-control' value={value} name={obj.name} key={obj.name} onChange={({ target }) => handleFormvalChange(obj.name, target.value)} min={obj.min} max={obj.max} />
            </div>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (['radio', 'checkbox'].includes(formType)) {
        return <div className="formContainer">
            <div className="col-auto">
                <label htmlFor={obj.id} class='form-label'>{obj.label}</label>
                {obj.options.map((optionObj) => <span ><input className='form-check' type={formType} key={optionObj.value} name={obj.name} onChange={({ target }) => { handleFormvalChange(obj.name, target.checked, formType, optionObj.value) }} checked={value.includes(optionObj.value)} /> <label className="form-check-label">{optionObj.label}</label> </span>)}
            </div>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (formType === 'textarea') {
        return <div className="formContainer">
            <div className="col-auto">
                <label htmlFor={obj.id} class='form-label'>{obj.label}</label>
                <textarea onChange={({ target }) => handleFormvalChange(obj.name, target.value)} name={obj.name}>{obj.value}</textarea>
            </div>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div >
    } else {
        return <div className="formContainer">
            <div className="col-auto">
                <label htmlFor={obj.id} class='form-label'>{obj.label}</label>
                <input type={formType} id={obj.id} className='form-control' value={value} name={obj.name} key={obj.name} onChange={({ target }) => handleFormvalChange(obj.name, target.value)} />
            </div>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    }

}

const Dform = (props) => {
    const testValObj = {
        name: "Soma Sekhar Novudu",
        id_proof: 'aadhar',
        aadhar_no: '91237123213 918273',
        gender: 'male',
        policy_list: ['health_policy'],
        birthdate: '1993-08-12'
    }
    const [formValues, setFormValues] = useState({ ...testValObj });
    const handleFormvalChange = (name, value, isOptionField, optionValue) => {
        const formValObj = { ...formValues };
        if (!isOptionField) {
            _.set(formValObj, name, value);
            setFormValues({ ...formValObj });
            return;
        }
        if (isOptionField === 'radio') {
            _.set(formValObj, name, optionValue);
            setFormValues({ ...formValObj });
            return;
        }
        if (isOptionField === 'checkbox') {
            if (value) {
                _.set(formValObj, name, [..._.get(formValObj, name, []), optionValue]);
                setFormValues({ ...formValObj });
                return;
            }
            if (value === false) {
                const valueArr = _.get(formValObj, name, []);
                _.set(formValObj, name, [..._.filter(valueArr, (itrStr) => itrStr !== optionValue)])
                setFormValues({ ...formValObj });
                return;
            }
        }

    }

    return (
        <div className="row g-3">
            {formJSON.map((formObj) => recurrsiveRenderer(formObj, formValues, handleFormvalChange))}
        </div>
    )

}
export default Dform