import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, Row, Col, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { saveAlimento, updateAlimento, getAllCategorias } from '../service/AlimentoService';
import Swal from 'sweetalert2';

const AlimentoFormModal = ({ show, handleClose, alimento, fetchAlimentos }) => {
  const initialFormValues = {
    nombre: '',
    proteinas: '',
    carbohidratos: '',
    grasas: '',
    caloriasPorcion: '',
    tipos: [],
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (alimento) {
      setFormValues(alimento);
    } else {
      setFormValues(initialFormValues);
    }
  }, [alimento]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getAllCategorias();
        setCategorias(response);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTipoClick = (id, nombre) => {
    const exists = formValues.tipos.find(tipo => tipo.id === id);
    if (exists) {
      setFormValues((prev) => ({
        ...prev,
        tipos: prev.tipos.filter(tipo => tipo.id !== id),
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        tipos: [...prev.tipos, { id, nombre }],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formValues.id) {
        await updateAlimento(formValues.id, formValues);
        Swal.fire('Success', 'Alimento updated successfully', 'success');
      } else {
        await saveAlimento(formValues);
        Swal.fire('Success', 'Alimento created successfully', 'success');
      }
      handleClose();
      fetchAlimentos(); // Refresh the list
    } catch (error) {
      Swal.fire('Error', 'Error saving alimento', 'error');
    }
  };

  const resetFormValues = () => {
    setFormValues(initialFormValues);
  };

  const filteredCategorias = categorias.filter(categoria => !formValues.tipos.some(tipo => tipo.id === categoria.id));

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        resetFormValues();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{alimento ? 'Edit Alimento' : 'Create Alimento'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Proteínas</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="proteinas"
                    value={formValues.proteinas}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text>g</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Carbohidratos</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="carbohidratos"
                    value={formValues.carbohidratos}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text>g</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Grasas</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="grasas"
                    value={formValues.grasas}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text>g</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Calorías por Porción</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="caloriasPorcion"
                    value={formValues.caloriasPorcion}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text>kcal</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Tipos</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title="Seleccionar Tipos"
              variant="outline-primary"
              className="w-100"
              drop="down"
            >
              {filteredCategorias.map(categoria => (
                <Dropdown.Item
                  key={categoria.id}
                  onClick={() => handleTipoClick(categoria.id, categoria.nombre)}
                >
                  {categoria.nombre}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <div className="mb-3">
            {formValues.tipos.map((tipo) => (
              <Badge key={tipo.id} bg="secondary" className="me-2 mb-2">
                {tipo.nombre} <Button size="sm" variant="secondary" className='text-color-red' onClick={() => handleTipoClick(tipo.id, tipo.nombre)}>X</Button>
              </Badge>
            ))}
          </div>
          <Button variant="primary" type="submit" className="w-100">
            {alimento ? 'Update' : 'Create'} Alimento
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AlimentoFormModal;
