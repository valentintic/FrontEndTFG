import React, { useState, useEffect } from 'react';
import { getAllAlimentos, deleteAlimento } from '../service/AlimentoService';
import AlimentoTiposDropdown from '../components/AlimentoTiposDropdown';
import AlimentoFormModal from './AlimentoFormModal';
import Swal from 'sweetalert2';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './AlimentosPage.css';

const AlimentosPage = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [selectedAlimento, setSelectedAlimento] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleEdit = (alimento) => {
    setSelectedAlimento(alimento);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlimento(id);
      Swal.fire('Deleted', 'Alimento deleted successfully', 'success');
      setAlimentos(alimentos.filter(alimento => alimento.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Error deleting alimento', 'error');
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedAlimento(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div className="animated-background" initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
      <Container className="content-container position-relative my-4">
        <h1 className="text-center mb-4">Lista de Alimentos</h1>
        <div className="d-flex justify-content-end mb-4">
          <Button variant="success" onClick={handleShow}>
            Crear Alimento
          </Button>
        </div>
        <Row>
          {alimentos.map(alimento => (
            <Col key={alimento.id} md={4} className="mb-4">
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm alimento-card">
                  <Card.Body>
                    <Card.Title className="text-primary">{alimento.nombre}</Card.Title>
                    <Card.Text><strong>Proteínas:</strong> {alimento.proteinas}g</Card.Text>
                    <Card.Text><strong>Carbohidratos:</strong> {alimento.carbohidratos}g</Card.Text>
                    <Card.Text><strong>Grasas:</strong> {alimento.grasas}g</Card.Text>
                    <Card.Text><strong>Calorías por Porción:</strong> {alimento.caloriasPorcion}kcal</Card.Text>
                    <Card.Text><strong>Tipos:</strong></Card.Text>
                    <AlimentoTiposDropdown tipos={alimento.tipos} />
                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="primary" onClick={() => handleEdit(alimento)}>Editar</Button>
                      <Button variant="danger" onClick={() => handleDelete(alimento.id)}>Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        <AlimentoFormModal
          show={showModal}
          handleClose={handleClose}
          alimento={selectedAlimento}
          fetchAlimentos={() => {
            const fetch = async () => {
              const response = await getAllAlimentos();
              setAlimentos(response);
            };
            fetch();
          }}
        />
      </Container>
    </motion.div>
  );
};

export default AlimentosPage;
