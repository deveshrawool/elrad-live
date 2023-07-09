import { Button, Modal } from '@mantine/core'
import React from 'react'
import {ReactComponent as Delete} from "../assets/svgs/delete.svg"
import styled from '@emotion/styled';

const StyleBodyText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #6e6e6e;
  padding: 10px;
`;

function DeleteModal(props) {
    const {message,callFunction} = props
  return (
    <Modal
        centered
        {...props}
        overlayOpacity={0.55}
        overlayBlur={5}
        size={'sm'}
        styles={{
            root:{
                zIndex:`500 !important`
            },
          modal: {
            borderRadius: "20px",
            height: "auto",
            width: "300px",
            // maxWidth: "300px",
            // minWidth: "300px",
            zIndex: 500,
          },
          close: { display: "none" },
          title: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
        title={<Delete width='50px' height='50px' />}>
        <StyleBodyText>{message ? message : "Are you sure you want to delete your resume?"}</StyleBodyText>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Button
        color='red'
          style={{
            wordWrap: "break-word",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() => {
            callFunction !== undefined ? callFunction() : props.onClose();
          }}
          variant='filled'
          height='50px'
          fontSize='18px'>
          Okay
        </Button>
        <Button
          style={{
            wordWrap: "break-word",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() =>  props.onClose()}
          variant='outline'
          height='50px'
          fontSize='18px'>
          Cancel
        </Button>
        </div>
      </Modal>
  )
}

export default DeleteModal