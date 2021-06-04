import {Table} from "reactstrap";
import {useEffect, useState} from "react";
import {SERVER_URL} from "../../configs/serverConfig";

const fieldOfUseLabels = {
    MOVE: 'Пересування',
    WELD: 'Зварювання',
    OTHER: 'Інше',
}

const shapeLabels = {
    PARALLELP: 'Паралелепіпед',
    CYLINDER: 'Циліндр',
    PART_OF_SPHERE: 'Неповний шар',
    COMPLEX_SPHERE: 'Сложний шаровий простір',
}

const Home = () => {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch(SERVER_URL + '/calc/getAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(data => setTableData(data))
    }, []);

    const getTableHead = () => {
        return (
            <thead>
                <tr>
                    <th className="t-head-colored">ID</th>
                    <th className="t-head-colored">Сфера застосування</th>
                    <th className="t-head-colored">Досяжність</th>
                    <th className="t-head-colored">Корисне навантаження</th>
                    <th className="t-head-colored">Форма робочої зони</th>
                    <th className="t-head-colored">Напруга мережі</th>
                    <th className="t-head-colored">Напруга на вторинній обмотці</th>
                    <th className="t-head-colored">Сила струму</th>
                    <th className="t-head-colored">Щільність струму</th>
                    <th className="t-head-colored">Перетин сердечника</th>
                    <th className="t-head-colored">Площа викна сердечника</th>
                </tr>
            </thead>
        )
    }

    const generateTableBody = () => {
        return tableData.map(({ inputParams }) => {
            return (
                <tr key={inputParams.id}>
                    <td>{inputParams.id}</td>
                    <td>{fieldOfUseLabels[inputParams.fieldOfUse]}</td>
                    <td>{inputParams.reachZone}</td>
                    <td>{inputParams.cargoCapacity}</td>
                    <td>{shapeLabels[inputParams.shapeOfArea]}</td>
                    <td>{inputParams.inputWeldParams.voltage}</td>
                    <td>{inputParams.inputWeldParams.secondCoilVoltage}</td>
                    <td>{inputParams.inputWeldParams.amperage}</td>
                    <td>{inputParams.inputWeldParams.currentDensity}</td>
                    <td>{inputParams.inputWeldParams.coreSection}</td>
                    <td>{inputParams.inputWeldParams.coreWindowSection}</td>
                </tr>
            )
        })
    }

    return (
        <div className="table-wrapper">
            <Table striped hover>
                {getTableHead()}
                <tbody>
                {generateTableBody()}
                </tbody>
            </Table>
        </div>
    )
}

export default Home;
