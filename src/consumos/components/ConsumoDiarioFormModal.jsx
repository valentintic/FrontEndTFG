import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createConsumoDiario, updateConsumoDiario, getAllAlimentos } from '../service/ConsumoService';
import Swal from 'sweetalert2';

const ConsumoDiarioFormModal = ({ show, handleClose, consumo, fetchConsumos }) => {
    const [formValues, setFormValues] = useState({
        alimentoId: '',
        cantidad: '',
        fecha: new Date().toISOString().split('T')[0],
    });
    const [alimentos, setAlimentos] = useState([]);

    useEffect(() => {
        if (consumo) {
            setFormValues({
                alimentoId: consumo.alimentoId,
                cantidad: consumo.cantidad,
                fecha: consumo.fecha,
            });
        } else {
            setFormValues({
                alimentoId: '',
                cantidad: '',
                fecha: new Date().toISOString().split('T')[0],
            });
        }
    }, [consumo]);

    useEffect(() => {
        const fetchAlimentos = async () => {
            try {
                const response = await getAllAlimentos();
                setAlimentos(response);
            } catch (error) {
                console.error('Error fetching alimentos:', error);
            }
        };
        fetchAlimentos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (consumo) {
                await updateConsumoDiario(consumo.id, formValues.cantidad);
                Swal.fire('Success', 'Consumo actualizado correctamente', 'success');
            } else {
                await createConsumoDiario(formValues);
                Swal.fire('Success', 'Consumo creado correctamente', 'success');
            }
            handleClose();
            fetchConsumos();
        } catch (error) {
            Swal.fire('Error', 'Error al guardar el consumo', 'error');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{consumo ? 'Editar Consumo' : 'Añadir Consumo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Alimento</Form.Label>
                        <Form.Control
                            as="select"
                            name="alimentoId"
                            value={formValues.alimentoId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar Alimento</option>
                            {alimentos.map(alimento => (
                                <option key={alimento.id} value={alimento.id}>
                                    {alimento.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            name="cantidad"
                            value={formValues.cantidad}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={formValues.fecha}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {consumo ? 'Actualizar' : 'Añadir'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ConsumoDiarioFormModal;
