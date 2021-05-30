import {FormGroup, Input, Label} from "reactstrap";

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
        label: 'Пересування',
        value: 'MOVE',
    },
    {
        label: 'Зварювання',
        value: 'WELD',
    },
    {
        label: 'Інше',
        value: 'OTHER',
    },
];

const getOptions = optionsData => optionsData.map(option =>
    <option key={option.value} value={option.value}>{option.label}</option>)

const Home = () => {
    return (
        <div className="main-div">
            <FormGroup className="form-group">
                <Label for="shapeOfArea">Форма робочої зони:</Label>
                <Input type="select"
                       name="shapeOfAreaSelect"
                       id="shapeOfArea"
                       className="form-element"
                       onChange={({ target: { value }}) => console.log(value)}>
                    {getOptions(shapeOptionsData)}
                </Input>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="fieldOfUse">Сфера застосування:</Label>
                <Input type="select" name="fieldOfUseSelect" id="fieldOfUse" className="form-element">
                    {getOptions(fieldOfUseOptionsData)}
                </Input>
            </FormGroup>
        </div>
    )
}

export default Home;
