import Modal from 'react-modal';
import { useState } from 'react';
import { useUser } from '../../hooks/useUserData';
import './styles.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:'rgba(0,0,0,0.7)',
    },
};

const CongratulationModal = ({ isOpen, handleAction }) => {
    const { setUsername } = useUser();
    const [nameValue, setNameValue] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (nameValue === '') {
            alert('Please write your name');
        } else {
            setUsername(nameValue);
            handleAction();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <div className='welcome-modal'>
                <h2>Welcome to MEMORY GAME!</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>Before starting write your name</label>
                    <input type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
                    <button type='submit'>Start</button>
                </form>
            </div>
        </Modal>
    )
};

export default CongratulationModal;