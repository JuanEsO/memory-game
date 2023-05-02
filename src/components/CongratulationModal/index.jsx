import Modal from 'react-modal';
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
    const { username } = useUser(); 
    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Congratulation Modal"
         >
            <div className='congratulations-modal'>
            <h2>CONGRATULATIONS {username}!!</h2>
            <div>You have completed the game</div>
            <div className='congratulations-modal__actions'>
                <button type='button' className='bg-[#202b38]' onClick={handleAction}>try again</button>
            </div>
            </div>
        </Modal>
    )
};

export default CongratulationModal;
