import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { ID, Permission, Role } from 'appwrite';
import { databases } from '../../../../../appwrite/appConfig';

const ModalList = ({ isOpen, onClose, nData, user, boardId }) => {
  const handleClose = () => {
    onClose();
  };

  const [data, setData] = useState({
    title: nData.title || '',
  });

  const queryClient = useQueryClient();

  const addDocument = useMutation(
    (documentData) =>
      databases.createDocument(
        '64415eb6ac34bc0a9996',
        '64415ece7bb6d4c4f985',
        ID.unique(),
        {
          ...documentData,
          bS: boardId,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      ),
    {
      onSuccess: () => {
        setData({});
        handleClose();
        queryClient.invalidateQueries('board');
      },
      onError: (error) => {
        console.log(error); // Failure
      },
    }
  );

  const updateDocument = useMutation(
    (documentData) =>
      databases.updateDocument(
        nData.$databaseId,
        nData.$collectionId,
        nData.$id,
        documentData
      ),
    {
      onSuccess: () => {
        setData({});
        handleClose();
        queryClient.invalidateQueries('board');
      },
      onError: (error) => {
        console.log(error); // Failure
      },
    }
  );

  const handlerAdd = () => {
    // if (!data.title) return alert('Title cannot be empty');
    if (nData.$id) {
      updateDocument.mutate({
        title: data.title,
      });
    } else {
      addDocument.mutate({
        title: data.title,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full">
              <form
                noValidate=""
                action=""
                className="ng-untouched ng-pristine ng-valid container mx-auto flex w-full flex-col space-y-12"
              >
                <fieldset className="w-full rounded-md p-3 shadow-sm">
                  <div className=" flex w-full flex-col items-center justify-start gap-2">
                    <div className="w-full">
                      <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        required
                        value={data.title || ''}
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) => {
                          setData({ ...data, title: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div></div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlerAdd}>
              {nData?.title ? 'Edit' : 'Add'}
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalList;
