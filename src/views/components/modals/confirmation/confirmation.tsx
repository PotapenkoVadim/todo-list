import { useConfirmationModalStore } from '../../../../data/stores/confirmationModal.store';
import Button from '../../ui-kit/button/button';
import Modal from '../modal/modal';
import styles from './confirmation.module.scss';

export default function ConfirmationModal(): JSX.Element {
  const [isShow, confirmActions, closeModal] = useConfirmationModalStore((state) => [state.isShow, state.confirmActions, state.closeModal]);

  const closeConfirmationModal = (event): void => {
    if (event.target.dataset.type === 'modal') {
      closeModal();
    }
  };
  
  return (
    <div
      data-type='modal'
      onClick={closeConfirmationModal}
      className={`${styles['confirmation']} ${isShow ? styles['confirmation__isShow'] : ''}`}>
      <Modal title={confirmActions?.title}>
        <div className={styles['confirmation-actions']}>
          <Button className={styles['confirmation-button']} onClick={confirmActions?.confirmAction}>
            Confirm
          </Button>
          <Button className={styles['confirmation-button']} onClick={confirmActions?.cancelAction} type='secondary'>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}