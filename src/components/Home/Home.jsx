import {FormGroup, Input, Label} from "reactstrap";
import React, { useState } from 'react';

const INITIAL_FORM_MAIN_STATE = {
    shapeOfArea: 'PARALLELP',
    fieldOfUse: 'OTHER',
};

const shapeOptionsData = [
    {
        label: 'Паралелепіпед',
        value: 'PARALLELP',
    },
    {
        label: 'Циліндр',
        value: 'CYLINDER',
    },
    {
        label: 'Неповний шар',
        value: 'PART_OF_SPHERE',
    },
    {
        label: 'Сложний шаровий простір',
        value: 'COMPLEX_SPHERE',
    },
];

const fieldOfUseOptionsData = [
    {
        label: 'Інше',
        value: 'OTHER',
    },
    {
        label: 'Пересування',
        value: 'MOVE',
    },
    {
        label: 'Зварювання',
        value: 'WELD',
    },
];

const getOptions = optionsData => optionsData.map(option =>
    <option key={option.value} value={option.value}>{option.label}</option>);

const Home = () => {

    const [formMainState, setFormMainState] = useState(INITIAL_FORM_MAIN_STATE);

    const getAdditionalField = () => {
        if (formMainState.fieldOfUse === 'MOVE') {
            return (
                <FormGroup className="form-group">
                    <Label for="cargoCapacity">Корисне навантаження (кг):</Label>
                    <Input type="number"
                           name="cargoCapacity"
                           id="cargoCapacity"
                           onChange={({ target: { id, value }}) => updateFormState(id, value)} />
                </FormGroup>
            )
        } else {
            return (
                <FormGroup className="form-group">
                    <Label for="cargoCapacity">Вага робочго елементу (кг):</Label>
                    <Input type="number"
                           name="cargoCapacity"
                           id="cargoCapacity"
                           onChange={({ target: { id, value }}) => updateFormState(id, value)} />
                </FormGroup>
            )
        }
    };

    const getFieldsForWeldParameters = () => (
        <div className="form-div">
            <h6>Параметри робочого елементу</h6>
        </div>
    )

    const getFormWithAdditionalParams = () => {
        switch (formMainState.fieldOfUse) {
            case 'WELD':
                return getFieldsForWeldParameters();
            default:
                return null;
        }
    }

    const updateFormState = (fieldId, value) => {
        const stateCopy = { ...formMainState };

        setFormMainState({
            ...stateCopy,
            [fieldId]: value,
        })
    }

    console.log('formState', formMainState);

    return (
        <div className="main-div">
            <div className="form-div">
                <h6>Основні параметри ПР</h6>
                <FormGroup className="form-group">
                    <Label for="shapeOfArea">Форма робочої зони:</Label>
                    <Input type="select"
                           name="shapeOfAreaSelect"
                           id="shapeOfArea"
                           className="form-element"
                           defaultValue=''
                           onChange={({ target: { id, value }}) => updateFormState(id, value)}>
                        {getOptions(shapeOptionsData)}
                    </Input>
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="fieldOfUse">Сфера застосування:</Label>
                    <Input type="select"
                           name="fieldOfUseSelect"
                           id="fieldOfUse"
                           className="form-element"
                           onChange={({ target: { id, value }}) => updateFormState(id, value)}>
                        {getOptions(fieldOfUseOptionsData)}
                    </Input>
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="reachZone">Досяжність (см):</Label>
                    <Input type="number"
                           name="reachZone"
                           id="reachZone"
                           className="form-element"
                           onChange={({ target: { id, value }}) => updateFormState(id, value)} />
                </FormGroup>
                {getAdditionalField()}
            </div>
            {getFormWithAdditionalParams()}
        </div>
    )
}

export default Home;
