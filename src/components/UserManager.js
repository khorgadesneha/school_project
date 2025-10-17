import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/users';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    }
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true, width: '80px' },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Password', selector: row => row.password },
    {
      name: 'Actions',
      cell: row => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <FaEdit
            size={18}
            style={{ cursor: 'pointer', color: 'rgb(33 87 168)' }}
            onClick={() => navigate(`/users/edit/${row.id}`)}
          />
          <FaTrash
            size={18}
            style={{ cursor: 'pointer', color: '#cb1023ff' }}
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h5 className="d-inline">User Manager</h5>
          <Button
            className="float-end" 
            onClick={() => navigate('/users/add')}
            style={{background: 'linear-gradient(135deg, #9B70E0 0%, #BFA7F2 100%)', color: '#fff', border: '1px solid #9B70E0'}} >
            <FaPlus className="me-2" /> Add User
          </Button>
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            responsive
            striped
            persistTableHead
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserManager;
