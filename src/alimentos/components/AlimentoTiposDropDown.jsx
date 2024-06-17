import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './AlimentoTiposDropdown.css';

const AlimentoTiposDropdown = ({ tipos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown show={isOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle className="btn btn-info dropdown-toggle">
        Ver tipos de alimentos
      </Dropdown.Toggle>
      <Dropdown.Menu className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {tipos.length > 0 ? (
          tipos.map(tipo => (
            <Dropdown.Item key={tipo.id} className="dropdown-item">
              {tipo.nombre}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item className="dropdown-item">
            No tiene categoría
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AlimentoTiposDropdown;
