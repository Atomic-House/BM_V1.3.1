import { ID, Permission, Query, Role } from 'appwrite';
import { account, databases, id } from '../appwrite/appConfig';
import axios from 'axios';
import { useState } from 'react';

const PROJECT_ID = '64415eb6ac34bc0a9996';
const LISTS_ID = '64415ece7bb6d4c4f985';
const CARD_ID = '64415ed2d54470c01f7f';
const BOARD_ID = '64415ec99997abcbc0c1';
const WORKSPACE_ID = '64415ec33e2564329aec';

export async function getWorkspace() {
  const result = await databases.listDocuments(PROJECT_ID, WORKSPACE_ID);
  return result.documents;
}
export async function getBoard(boardID) {
  const result = await databases.listDocuments(PROJECT_ID, BOARD_ID, [Query.equal('$id', boardID)]);
  return result.documents;
}

export async function getLists() {
  const result = await databases.listDocuments(PROJECT_ID, LISTS_ID);
  return result.documents;
}
export async function getBoards() {
  const result = await databases.listDocuments(PROJECT_ID, BOARD_ID);
  return result.documents;
}

export async function getFilterLists(boardId) {
  const result = await databases.listDocuments(PROJECT_ID, LISTS_ID, [Query.equal('bid', boardId)]);
  return result.documents;
}

export async function getFilterCards(listID) {
  const result = await databases.listDocuments(PROJECT_ID, CARD_ID, [Query.equal('lid', listID)]);
  return result.documents;
}

export async function getCards() {
  const result = await databases.listDocuments(PROJECT_ID, CARD_ID);
  return result.documents;
}

export async function delCards(id) {
  const result = await databases.deleteDocument(PROJECT_ID, CARD_ID, id);
  return result.documents;
}

export async function delList(id) {
  const result = await databases.deleteDocument(PROJECT_ID, LISTS_ID, id);
  return result.documents;
}

export async function getUser() {
  const result = await account.get();
  return result;
}



export function useMetadataFetcher() {
  const your_api_key = "15b0e2f3fb727cf97044f566b763f141";
  const [metadata, setMetadata] = useState({ title: '', description: '', image: '' });
  const [favicon, setFavicon] = useState('');
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);

  const fetchMetadata = async (url) => {
    setFetching(true);
    try {
      const isValidUrl = url;
      if (!isValidUrl) {
        setError('Please enter a valid URL');
        return;
      }

      const { data } = await axios.get('https://api.linkpreview.net', {
        params: {
          q: url,
          key: your_api_key,
        }
      });

      const domain = new URL(data.url).hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

      setMetadata({
        title: data.title,
        description: data.description,
        image: data.image
      });

      setFavicon(faviconUrl);
      setError('');
      setFetching(false);
    } catch (err) {
      setError('An error occurred while fetching the metadata');
      setMetadata({ title: '', description: '', image: '' });
      setFavicon('');
      setFetching(false);
    }
  };

  return { metadata, favicon, error, fetchMetadata, fetching };
}


/**
 * import { useState } from 'react';
import axios from 'axios';

function useMetadataFetcher() {
  const your_api_key = "15b0e2f3fb727cf97044f566b763f141";
  const [metadata, setMetadata] = useState({ title: '', description: '', image: '' });
  const [favicon, setFavicon] = useState('');
  const [error, setError] = useState('');

  const fetchMetadata = async (url) => {
    try {
      const isValidUrl = url;
      if (!isValidUrl) {
        setError('Please enter a valid URL');
        return;
      }

      const { data } = await axios.get('https://api.linkpreview.net', {
        params: {
          q: url,
          key: your_api_key,
        }
      });

      const domain = new URL(data.url).hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

      setMetadata({
        title: data.title,
        description: data.description,
        image: data.image
      });

      setFavicon(faviconUrl);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching the metadata');
      setMetadata({ title: '', description: '', image: '' });
      setFavicon('');
    }
  };

  return { metadata, favicon, error, fetchMetadata };
}

function App() {
  const [url, setUrl] = useState('');
  const { metadata, favicon, error, fetchMetadata } = useMetadataFetcher();

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchMetadata(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleUrlChange} />
        <button type="submit">Fetch data</button>
      </form>

      {error && <p>{error}</p>}
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      <img src={metadata.image} alt={metadata.title} />
      {favicon && <img src={favicon} alt="Website favicon" />}
    </div>
  );
}

export default App;

 */