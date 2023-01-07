import React, { useEffect, useState } from 'react';
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
    const commonProps = { handleFormvalChange: handleFormvalChange, formObj: obj, value, formType }
    if (formType == 'select') {
        return <div className="formContainer">
            <Select {...commonProps} />
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (['text', 'password', 'email', 'number', 'color', 'range'].includes(formType)) {
        return <div className="formContainer">
            <Input {...commonProps} />
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (['radio', 'checkbox'].includes(formType)) {
        return <div className="formContainer">
            <RadioCheckGroup {...commonProps} />
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    } else if (formType === 'textarea') {
        return <div className="formContainer">
            <Textarea {...commonProps} />
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div >
    } else {
        return <div className="formContainer">
            <Input {...commonProps} />
            {obj.conditionalElements && childElemrenderer(obj, formValues, handleFormvalChange)}
        </div>
    }

}

const Dform = (props) => {
    const testValObj = {
        // name: "Soma Sekhar Novudu",
        // id_proof: 'aadhar',
        // aadhar_no: '91237123213 918273',
        // gender: 'male',
        // policy_list: ['health_policy'],
        // birthdate: '1993-08-12'
    }
    const [formValues, setFormValues] = useState({ ...testValObj });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        setTimeout(() => {
            const testValObj = {
                name: "Soma Sekhar Novudu",
                id_proof: 'aadhar',
                aadhar_no: '91237123213 918273',
                gender: 'male',
                policy_list: ['health_policy'],
                birthdate: '1993-08-12'
            }
            setFormValues(testValObj);
        }, 2000)
    }, [])
    /** Set the values to state object */
    const handleFormvalChange = (name, value) => {
        const formValObj = { ...formValues };
        _.set(formValObj, name, value);
        setFormValues({ ...formValObj });
    }
    /** To be implemented */
    const formSubmitHandler = () => { }

    return (
        <div className="formset width40">
            {formJSON.map((formObj) => recurrsiveRenderer(formObj, formValues, handleFormvalChange))}
            <button className="btn-submit" onClick={formSubmitHandler}>Submit Form</button>
        </div>
    )

}
export default Dform