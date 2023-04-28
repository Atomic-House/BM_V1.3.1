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
import { databases } from '../../appwrite/appConfig';
import { useMetadataFetcher } from 'hooks/hooks';

const ModalCustom = ({ isOpen, onClose, lid, nData, user }) => {
  const handleClose = () => {
    onClose();
  };

  const [data, setData] = useState({
    title: nData.title || '',
    url: nData.url || '',
    icon: nData.icon || '',
    note: nData.note || '',
    tags: nData.tags || '',
  });

  const queryClient = useQueryClient();

  const addDocument = useMutation(
    (documentData) =>
      databases.createDocument(
        '64415eb6ac34bc0a9996',
        '64415ed2d54470c01f7f',
        ID.unique(),
        {
          ...documentData,
          lid: lid,
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
        queryClient.invalidateQueries('cards');
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
        queryClient.invalidateQueries('cards');
      },
      onError: (error) => {
        console.log(error); // Failure
      },
    }
  );

  const [url, setUrl] = useState('');
  const { metadata, favicon, error, fetchMetadata, fetching } = useMetadataFetcher();


  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchMetadata(url);
  };

  const handlerAdd = () => {
    if (data.title || metadata.title === '') return alert('Title cannot be empty');
    if (nData?.lid) {
      updateDocument.mutate({
        title: data.title || metadata.title,
        url: data.url,
        icon: favicon || data.icon,
        note: data.note,
        tags: data.tags,
      });
    } else {
      addDocument.mutate({
        title: metadata.title || data.title,
        url: data.url,
        icon: favicon || data.icon,
        note: data.note,
        tags: data.tags,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add bookmark</ModalHeader>
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
                        value={data.title || metadata.title || ''}
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) => {
                            setData({ ...data, title: metadata.title })
                            
                            setData({ ...data, title: e.target.value })
                          
                        }}
                      />
                    </div>
                    <div className="relative w-full justify-center">
                    {error && <p className='text-red-400'>{error}</p>}
                      <input
                        id="url"
                        type="text"
                        placeholder="URL"
                        value={data.url || url || ''}
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) =>{
                          
                          setUrl(e.target.value)
                          setData({ ...data, url: e.target.value })
                        }
                        }
                      />
                      <button
                        className="absolute right-0 bottom-0 w-20 rounded bg-teal-800 p-2 text-sm text-white"
                        onClick={handleSubmit}
                      >
                        {!fetching ? "Auto fill" : "Loading..."}
                      </button>
                    </div>
                    <div className="w-full flex gap-2">
                    {data.icon && <img className='w-10 rounded border-blue-400 bg-gray-200 p-2' src={data.icon} alt="Website favicon" />}
                    {favicon && <img className='w-10 rounded border-blue-400 bg-gray-200 p-2' src={favicon} alt="Website favicon" />}
                      <input
                        id="icon"
                        type="text"
                        value={data.icon || favicon || ''}
                        placeholder="Icon URL"
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) =>
                          setData({ ...data, icon: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <input
                        id="note"
                        type="text"
                        placeholder="Notes"
                        value={data.note || ''}
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) =>
                          setData({ ...data, note: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <input
                        id="tags"
                        type="text"
                        value={data.tags || ''}
                        placeholder="Tags add comma's"
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) =>
                          setData({ ...data, tags: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <input
                        id="datetime"
                        type="datetime-local"
                        value={data.duedate || ''}
                        placeholder="Due Date"
                        className="w-full rounded border-blue-400 bg-gray-200 p-2"
                        onChange={(e) =>
                          setData({ ...data, duedate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div>
            

{/*               
              <h1>{metadata.title}</h1>
              <p>{metadata.description}</p>
              <img src={metadata.image} alt={metadata.title} />
              {favicon && <img src={favicon} alt="Website favicon" />} */}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlerAdd}>
              {nData?.lid ? "Edit" : "Add"}
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

export default ModalCustom;
