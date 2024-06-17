import React, { useState, useEffect } from 'react';
import { getConsumosDiarios, deleteConsumoDiario } from '../service/ConsumoService';
import { Button, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ConsumoDiarioFormModal from './ConsumoDiarioFormModal';
import './ConsumoDiarioPage.css';
import moment from 'moment';

const ConsumoDiarioPage = () => {
    const [consumos, setConsumos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showModal, setShowModal] = useState(false);
    const [selectedConsumo, setSelectedConsumo] = useState(null);

    useEffect(() => {
        fetchConsumosDiarios(selectedDate);
    }, [selectedDate]);

    const fetchConsumosDiarios = async (fecha) => {
        try {
            const response = await getConsumosDiarios(moment(fecha).format('YYYY-MM-DD'));
            setConsumos(response);
        } catch (error) {
            console.error('Error fetching consumos diarios:', error);
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleEdit = (consumo) => {
        setSelectedConsumo(consumo);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteConsumoDiario(id);
            Swal.fire('Deleted', 'Consumo eliminado correctamente', 'success');
            fetchConsumosDiarios(selectedDate);
        } catch (error) {
            Swal.fire('Error', 'Error al eliminar el consumo', 'error');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedConsumo(null);
    };

    const renderConsumos = () => {
        return consumos.map((consumo) => (
            <tr key={consumo.id} className="consumo-row">
                <td>{consumo.alimentoNombre}</td>
                <td>{consumo.cantidad}</td>
                <td>{(consumo.proteinas / 100).toFixed(2)}</td>
                <td>{(consumo.carbohidratos / 100).toFixed(2)}</td>
                <td>{(consumo.grasas / 100).toFixed(2)}</td>
                <td>{(consumo.caloriasPorcion / 100).toFixed(2)}</td>
                <td>
                    <Button variant="primary" className="me-2" onClick={() => handleEdit(consumo)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(consumo.id)}>Eliminar</Button>
                </td>
            </tr>
        ));
    };

    const renderTotals = () => {
        const totalProteinas = consumos.reduce((acc, consumo) => acc + consumo.proteinas, 0) / 100;
        const totalCarbohidratos = consumos.reduce((acc, consumo) => acc + consumo.carbohidratos, 0) / 100;
        const totalGrasas = consumos.reduce((acc, consumo) => acc + consumo.grasas, 0) / 100;
        const totalCalorias = consumos.reduce((acc, consumo) => acc + consumo.caloriasPorcion, 0) / 100;

        return (
            <tr className="consumo-total">
                <td><strong>Total</strong></td>
                <td></td>
                <td>{totalProteinas.toFixed(2)}</td>
                <td>{totalCarbohidratos.toFixed(2)}</td>
                <td>{totalGrasas.toFixed(2)}</td>
                <td>{totalCalorias.toFixed(2)}</td>
                <td></td>
            </tr>
        );
    };

    return (
        <div className="animated-background">
            <div className="container my-4 consumo-page content-container">
                <h1 className="text-center mb-4">Consumo Diario de Alimentos</h1>
                <Form.Group className="mb-4 custom-date-picker">
                    <Form.Label className="custom-date-picker-label">Selecciona la Fecha:</Form.Label>
                    <div className="custom-date-picker-input-wrapper">
                        <Form.Control 
                            type="date" 
                            value={selectedDate} 
                            onChange={handleDateChange} 
                            className="custom-date-picker-input"
                        />
                        <span className="custom-date-picker-icon">
                            <i className="fas fa-calendar-alt"></i>
                        </span>
                    </div>
                </Form.Group>
                <Button variant="success" onClick={() => setShowModal(true)} className="mb-4">
                    Añadir Consumo
                </Button>
                <Table striped bordered hover className="consumo-table">
                    <thead>
                        <tr>
                            <th>Alimento</th>
                            <th>Cantidad</th>
                            <th>Proteínas</th>
                            <th>Carbohidratos</th>
                            <th>Grasas</th>
                            <th>Calorías</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderConsumos()}
                        {renderTotals()}
                    </tbody>
                </Table>

                <ConsumoDiarioFormModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    consumo={selectedConsumo}
                    fetchConsumos={() => fetchConsumosDiarios(selectedDate)}
                />
            </div>
        </div>
    );
};

export default ConsumoDiarioPage;
