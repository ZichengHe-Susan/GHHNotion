import React, { useState,useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProfileModal = ({ showProfile, handleClose }) => {
  const [open, setOpen] = useState(showProfile);
  const { currentUser, userData } = useAuth();


  useEffect(() => {
    setOpen(showProfile);
  }, [showProfile]);

  if(!currentUser && !userData) {
    return;
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <Typography id="profile-modal-title" variant="h6" component="h2">
          Hoo-rah-ray, ray, ray! {userData?.displayName}
        </Typography>
        <Typography id="profile-modal-description" sx={{ mt: 2 }}>
            Email: {userData?.email}
        </Typography>
        <Button onClick={handleClose}>Close</Button> {/* Close button */}
      </Box>
    </Modal>
  );
};

export default ProfileModal;
