import React, { useState } from 'react';
import formJSON from './dform.json';
import * as _ from 'lodash';
import { Input, Select, RadioCheckGroup, Textarea } from './formComponents'

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
            <Select handleFormvalChange={handleFormvalChange} formObj={obj} value={value} />
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (['text', 'password', 'email', 'number', 'color', 'range'].includes(formType)) {
        return <div className="formContainer">
            <Input handleFormvalChange={handleFormvalChange} formObj={obj} value={value} formType={formType}/>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (['radio', 'checkbox'].includes(formType)) {
        return <div className="formContainer">
            <RadioCheckGroup handleFormvalChange={handleFormvalChange} formObj={obj} value={value} formType={formType}/>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (formType === 'textarea') {
        return <div className="formContainer">
            <Textarea handleFormvalChange={handleFormvalChange} formObj={obj} value={value} formType={formType}/>
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div >
    } else {
        return <div className="formContainer">
            <Input handleFormvalChange={handleFormvalChange} formObj={obj} value={value} formType={formType}/>
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
    const [formErrors, setFormErrors] = useState({});

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
    const formSubmitHandler = () => {
        const filledFormValues = { ...formValues };

    }

    return (
        <div className="row g-3">
            {formJSON.map((formObj) => recurrsiveRenderer(formObj, formValues, handleFormvalChange))}
            <button onClick={formSubmitHandler}>Submit Form</button>
        </div>
    )

}
export default Dform