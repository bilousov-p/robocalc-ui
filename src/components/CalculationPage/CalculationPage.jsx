import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SERVER_URL} from "../../configs/serverConfig";
import {fieldOfUseLabels, shapeLabels} from "../../constant/optionsConstants";
import {Button, Spinner} from "reactstrap";

const CalculationPage = () => {

    const history = useHistory();
    const { calculationId } = useParams();
    const [calculatedData, setCalculatedData] = useState({});

    useEffect(() => {
        fetch(SERVER_URL + '/calc/getById/' + calculationId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(data => setCalculatedData(data))
    }, [])

    const deleteCurrentCalculation = () => {
        fetch(SERVER_URL + '/calc/delete/' + calculationId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => history.push('/'));
    }

    const { inputParams = {}, engineParams = {}, manipulatorParams = {}, weldParams } = calculatedData;

    return (
        <div className="main-div">
            {calculatedData.inputParams ? (
                <>
                    <div className="form-div params-div-wrapper">
                        <div><b>Вхідні параметри</b></div>
                        <div><b>Сфера застосування: </b>{fieldOfUseLabels[inputParams.fieldOfUse]}</div>
                        <div><b>Досяжність: </b>{inputParams.reachZone} см</div>
                        <div><b>Корисне навантаження: </b>{inputParams.cargoCapacity} кг</div>
                        <div><b>Форма робочої зони: </b>{shapeLabels[inputParams.shapeOfArea]}</div>
                        {inputParams.inputWeldParams.amperage ? (
                            <>
                                <br />
                                <div><b>Напруга мережі: </b>{inputParams.inputWeldParams.voltage} В</div>
                                <div><b>Напруга на вторинній обмотці: </b>{inputParams.inputWeldParams.secondCoilVoltage} В</div>
                                <div><b>Сила струму: </b>{inputParams.inputWeldParams.amperage} А</div>
                                <div><b>Щільність струму: </b>{inputParams.inputWeldParams.currentDensity} А/мм<sup>2</sup></div>
                                <div><b>Перетин сердечника: </b>{inputParams.inputWeldParams.coreSection} см<sup>2</sup></div>
                                <div><b>Площа викна сердечника: </b>{inputParams.inputWeldParams.coreWindowSection} см<sup>2</sup></div>
                            </>
                        ) : null }
                    </div>
                    <div className="form-div params-div-wrapper">
                        <div><b>Розраховані параметри</b></div>
                        <div><b>Кількість степенів свободи: </b>{calculatedData.numberOfFreedoms}</div>
                        <br />
                        <div><b>Момент двигуна на першому з'єднанні: </b>{engineParams.firstLinkTorque} Н&#xB7;м</div>
                        <div><b>Момент двигуна на другому з'єднанні: </b>{engineParams.secondLinkTorque} Н&#xB7;м</div>
                        <div><b>Момент двигуна на третєму з'єднанні: </b>{engineParams.thirdLinkTorque} Н&#xB7;м</div>
                        <br />
                        <div><b>Кількість ланок: </b>{manipulatorParams.numberOfChains}</div>
                        <div><b>Кількість поступових з'єднань: </b>{manipulatorParams.numberOfSteadyLinks}</div>
                        <div><b>Кількість углових з'єднань: </b>{manipulatorParams.numberOfAngleLinks}</div>
                        <div><b>Розмір першої ланки: </b>{manipulatorParams.firstChainSize} см</div>
                        <div><b>Розмір другої ланки: </b>{manipulatorParams.secondChainSize} см</div>
                        <div><b>Розмір третьої ланки: </b>{manipulatorParams.thirdChainSize} см</div>
                        {weldParams ? (
                            <>
                                <br />
                                <div><b>Потужність трансформатору: </b>{weldParams.transformerPower} Вт</div>
                                <div><b>Кількість витків у першому контурі: </b>{weldParams.firstWireNumberOfCoils}</div>
                                <div><b>Кількість витків у другому контурі: </b>{weldParams.secondWireNumberOfCoils}</div>
                                <div><b>Перетин витків у першому контурі: </b>{weldParams.firstWireSection} мм<sup>2</sup></div>
                                <div><b>Перетин витків у другому контурі: </b>{weldParams.secondWireSection} мм<sup>2</sup></div>
                            </>
                        ) : null}
                    </div>
                    <div className="button-wrapper">
                        <Link style={{margin : '15px'}}  to={''}><Button outline color="secondary">Назад</Button></Link>
                        <Button color="danger" onClick={deleteCurrentCalculation}>Видалити</Button>
                    </div>
                </>
            ) : <Spinner />}
        </div>
    )

};

export default CalculationPage;
